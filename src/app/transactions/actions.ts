'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createTransaction(formData: FormData) {
    const supabase = await createClient()

    // Build transaction object from formData
    const type = formData.get('type') as string
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const isRecurring = formData.get('isRecurring') === 'on'
    const recurrenceType = formData.get('recurrenceType') as string // 'recurring' | 'installments'
    const installmentsTotal = formData.get('installmentsTotal')
        ? parseInt(formData.get('installmentsTotal') as string)
        : null

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // In a real app, handle error or redirect to login
        // For now we might insert without user_id if RLS allows, but usually we need user.
        // Let's assume user is logged in or we redirect.
        // redirect('/login')
    }

    const transactionData = {
        user_id: user?.id, // Might be undefined if no auth yet, Supabase will reject if RLS is on
        type,
        amount,
        description,
        category,
        is_recurring: isRecurring,
        installments_total: installmentsTotal,
        installments_current: installmentsTotal ? 1 : null,
        date: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('transactions')
        .insert(transactionData)

    if (error) {
        console.error('Error inserting transaction:', error)
        throw new Error('Failed to create transaction')
    }

    redirect('/')
}

export async function updateTransaction(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const type = formData.get('type') as string
    const amount = parseFloat(formData.get('amount') as string)
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const date = formData.get('date') as string

    const { error } = await supabase
        .from('transactions')
        .update({
            type,
            amount,
            description,
            category,
            date: date || new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error updating transaction:', error)
        throw new Error('Falha ao atualizar transação')
    }
}

export async function deleteTransaction(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error deleting transaction:', error)
        throw new Error('Falha ao deletar transação')
    }

    revalidatePath('/income')
    revalidatePath('/expenses')
    revalidatePath('/')
}

export async function getTransactionsByMonth(year: number, month: number, type?: 'income' | 'expense') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return []
    }

    // Create date range for the month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())
        .order('date', { ascending: false })

    if (type) {
        query = query.eq('type', type)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching transactions:', error)
        return []
    }

    return data || []
}

export async function getMonthlyStats(year: number, month: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { totalIncome: 0, totalExpenses: 0, balance: 0 }
    }

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const { data, error } = await supabase
        .from('transactions')
        .select('type, amount')
        .eq('user_id', user.id)
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())

    if (error || !data) {
        return { totalIncome: 0, totalExpenses: 0, balance: 0 }
    }

    const totalIncome = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpenses = data
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0)

    return {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses
    }
}

export async function getCategoryStats(year: number, month: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return []
    }

    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    // Get all expense transactions for the month
    const { data: transactions, error } = await supabase
        .from('transactions')
        .select('category, amount')
        .eq('user_id', user.id)
        .eq('type', 'expense')
        .gte('date', startDate.toISOString())
        .lte('date', endDate.toISOString())

    if (error || !transactions) {
        return []
    }

    // Get categories with colors
    const { data: categories } = await supabase
        .from('categories')
        .select('name, color')
        .eq('user_id', user.id)

    const categoryMap = new Map(categories?.map(c => [c.name, c.color]) || [])

    // Group by category and sum amounts
    const grouped = transactions.reduce((acc: Record<string, number>, t) => {
        const category = t.category || 'Sem categoria'
        acc[category] = (acc[category] || 0) + Number(t.amount)
        return acc
    }, {})

    // Convert to array format for pie chart
    return Object.entries(grouped).map(([name, value]) => ({
        name,
        value,
        color: categoryMap.get(name) || '#6B7280'
    }))
}
