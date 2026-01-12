/**
 * Script para popular o banco de dados com categorias e transações reais do usuário
 * Baseado nas planilhas fornecidas
 */

import { createClient } from '@/utils/supabase/server'

// Categorias extraídas da planilha de despesas
const expenseCategories = [
    { name: 'Empréstimo Will', type: 'expense', color: '#EF4444', icon: 'CreditCard' },
    { name: 'Itau Juli', type: 'expense', color: '#F59E0B', icon: 'Building' },
    { name: 'Will Pedro', type: 'expense', color: '#8B5CF6', icon: 'Wallet' },
    { name: 'Facu Juli', type: 'expense', color: '#3B82F6', icon: 'GraduationCap' },
    { name: 'Will Juli', type: 'expense', color: '#06B6D4', icon: 'CreditCard' },
    { name: 'Nubank', type: 'expense', color: '#A855F7', icon: 'CreditCard' },
    { name: 'Itaucard 6823', type: 'expense', color: '#EC4899', icon: 'CreditCard' },
    { name: 'Casa', type: 'expense', color: '#10B981', icon: 'Home' },
    { name: 'Água', type: 'expense', color: '#0EA5E9', icon: 'Droplet' },
    { name: 'Energia', type: 'expense', color: '#F59E0B', icon: 'Zap' },
    { name: 'Dízimo', type: 'expense', color: '#8B5CF6', icon: 'Heart' },
    { name: 'M1 dia 10', type: 'expense', color: '#EC4899', icon: 'Calendar' },
]

// Categorias extraídas da planilha de receitas
const incomeCategories = [
    { name: 'Dia 15 Pedro', type: 'income', color: '#10B981', icon: 'Briefcase' },
    { name: 'Dia 30 Pedro', type: 'income', color: '#059669', icon: 'Briefcase' },
    { name: 'Outros', type: 'income', color: '#3B82F6', icon: 'DollarSign' },
]

// Despesas recorrentes mensais (baseado na planilha)
const monthlyExpenses = [
    { category: 'Empréstimo Will', amount: 184.84, description: 'Parcela mensal empréstimo' },
    { category: 'Itau Juli', amount: 791.88, description: 'Conta bancária' },
    { category: 'Will Pedro', amount: 2146.52, description: 'Cartão de crédito' },
    { category: 'Will Juli', amount: 145.38, description: 'Conta digital' },
    { category: 'Nubank', amount: 315.16, description: 'Cartão Nubank' },
    { category: 'Itaucard 6823', amount: 149.00, description: 'Cartão Itaucard' },
    { category: 'Empréstimo', amount: 394.25, description: 'Empréstimo pessoal' },
]

// Receitas recorrentes mensais
const monthlyIncome = [
    { category: 'Dia 15 Pedro', amount: 1600.00, description: 'Salário primeira quinzena', day: 15 },
    { category: 'Dia 30 Pedro', amount: 1600.00, description: 'Salário segunda quinzena', day: 30 },
]

export async function populateUserData(userId: string) {
    const supabase = await createClient()

    console.log('🚀 Iniciando população do banco de dados...')

    // 0. LIMPAR DADOS EXISTENTES PARA EVITAR DUPLICAÇÃO
    console.log('🧹 Limpando dados existentes...')

    const { error: deleteTransactionsError } = await supabase
        .from('transactions')
        .delete()
        .eq('user_id', userId)

    if (deleteTransactionsError && !deleteTransactionsError.message.includes('0 rows')) {
        console.error('Erro ao limpar transações:', deleteTransactionsError.message)
    } else {
        console.log('✓ Transações existentes removidas')
    }

    const { error: deleteCategoriesError } = await supabase
        .from('categories')
        .delete()
        .eq('user_id', userId)

    if (deleteCategoriesError && !deleteCategoriesError.message.includes('0 rows')) {
        console.error('Erro ao limpar categorias:', deleteCategoriesError.message)
    } else {
        console.log('✓ Categorias existentes removidas')
    }

    console.log('\n📁 Criando categorias...')
    const allCategories = [...expenseCategories, ...incomeCategories]

    for (const cat of allCategories) {
        const { error } = await supabase
            .from('categories')
            .insert({
                user_id: userId,
                name: cat.name,
                type: cat.type,
                color: cat.color,
                icon: cat.icon,
            })

        if (error && !error.message.includes('duplicate')) {
            console.error(`Erro ao criar categoria ${cat.name}:`, error.message)
        } else {
            console.log(`✓ Categoria criada: ${cat.name}`)
        }
    }

    // 2. Criar transações dos últimos 6 meses
    console.log('\n💰 Criando transações...')

    const today = new Date()
    const months = []

    // Gerar últimos 6 meses
    for (let i = 5; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
        months.push(date)
    }

    for (const month of months) {
        // Adicionar despesas mensais
        for (const expense of monthlyExpenses) {
            const expenseDate = new Date(month.getFullYear(), month.getMonth(), Math.floor(Math.random() * 28) + 1)

            const { error } = await supabase
                .from('transactions')
                .insert({
                    user_id: userId,
                    type: 'expense',
                    amount: expense.amount,
                    category: expense.category,
                    description: expense.description,
                    date: expenseDate.toISOString(),
                })

            if (error) {
                console.error(`Erro ao criar despesa ${expense.category}:`, error.message)
            } else {
                console.log(`✓ Despesa: ${expense.category} - R$ ${expense.amount}`)
            }
        }

        // Adicionar receitas mensais
        for (const income of monthlyIncome) {
            const incomeDate = new Date(month.getFullYear(), month.getMonth(), income.day)

            const { error } = await supabase
                .from('transactions')
                .insert({
                    user_id: userId,
                    type: 'income',
                    amount: income.amount,
                    category: income.category,
                    description: income.description,
                    date: incomeDate.toISOString(),
                })

            if (error) {
                console.error(`Erro ao criar receita ${income.category}:`, error.message)
            } else {
                console.log(`✓ Receita: ${income.category} - R$ ${income.amount}`)
            }
        }

        console.log(`\n✅ Mês ${month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} concluído!\n`)
    }

    console.log('🎉 População do banco de dados concluída com sucesso!')

    // Retornar estatísticas
    const { count: categoriesCount } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    const { count: transactionsCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    return {
        categories: categoriesCount || 0,
        transactions: transactionsCount || 0,
    }
}
