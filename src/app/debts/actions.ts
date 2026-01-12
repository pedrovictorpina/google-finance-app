'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export interface Debt {
    id: string
    user_id: string
    debtor_name: string
    description: string
    total_amount: number
    installments_total: number
    installment_amount: number
    start_date: string
    created_at: string
}

export interface DebtInstallment {
    id: string
    debt_id: string
    installment_number: number
    amount: number
    due_date?: string
    paid: boolean
    paid_date?: string
    created_at: string
}

export async function getDebts() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return []
    }

    const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching debts:', error)
        return []
    }

    return data as Debt[]
}

export async function getDebtWithInstallments(debtId: string) {
    const supabase = await createClient()

    const { data: debt, error: debtError } = await supabase
        .from('debts')
        .select('*')
        .eq('id', debtId)
        .single()

    if (debtError || !debt) {
        return null
    }

    const { data: installments, error: installmentsError } = await supabase
        .from('debt_installments')
        .select('*')
        .eq('debt_id', debtId)
        .order('installment_number')

    if (installmentsError) {
        console.error('Error fetching installments:', installmentsError)
        return { debt, installments: [] }
    }

    return { debt: debt as Debt, installments: installments as DebtInstallment[] }
}

export async function createDebt(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const debtor_name = formData.get('debtor_name') as string
    const description = formData.get('description') as string
    const total_amount = parseFloat(formData.get('total_amount') as string)
    const installments_total = parseInt(formData.get('installments_total') as string)
    const start_date = formData.get('start_date') as string

    if (!debtor_name || !description || !total_amount || !installments_total) {
        throw new Error('Todos os campos são obrigatórios')
    }

    const installment_amount = total_amount / installments_total

    // Create debt
    const { data: debt, error: debtError } = await supabase
        .from('debts')
        .insert({
            user_id: user.id,
            debtor_name,
            description,
            total_amount,
            installments_total,
            installment_amount,
            start_date: start_date || new Date().toISOString(),
        })
        .select()
        .single()

    if (debtError) {
        console.error('Error creating debt:', debtError)
        throw new Error('Falha ao criar dívida')
    }

    // Create installments
    const installments = []
    const startDate = new Date(start_date || new Date())

    for (let i = 1; i <= installments_total; i++) {
        const dueDate = new Date(startDate)
        dueDate.setMonth(dueDate.getMonth() + i - 1)

        installments.push({
            debt_id: debt.id,
            installment_number: i,
            amount: installment_amount,
            due_date: dueDate.toISOString(),
            paid: false,
        })
    }

    const { error: installmentsError } = await supabase
        .from('debt_installments')
        .insert(installments)

    if (installmentsError) {
        console.error('Error creating installments:', installmentsError)
        // Rollback: delete the debt
        await supabase.from('debts').delete().eq('id', debt.id)
        throw new Error('Falha ao criar parcelas')
    }

    revalidatePath('/debts')
    redirect('/debts')
}

export async function toggleInstallmentPaid(installmentId: string, paid: boolean) {
    const supabase = await createClient()

    const updateData: Partial<DebtInstallment> = {
        paid,
        paid_date: paid ? new Date().toISOString() : undefined,
    }

    const { error } = await supabase
        .from('debt_installments')
        .update(updateData)
        .eq('id', installmentId)

    if (error) {
        console.error('Error updating installment:', error)
        throw new Error('Falha ao atualizar parcela')
    }

    revalidatePath('/debts')
}

export async function deleteDebt(debtId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', debtId)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error deleting debt:', error)
        throw new Error('Falha ao deletar dívida')
    }

    revalidatePath('/debts')
}
