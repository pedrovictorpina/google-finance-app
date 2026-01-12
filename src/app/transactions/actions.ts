'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

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
