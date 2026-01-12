'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import MonthFilter from '@/components/MonthFilter'
import TransactionList from '@/components/TransactionList'
import EditTransactionModal from '@/components/EditTransactionModal'
import { getTransactionsByMonth, getMonthlyStats, deleteTransaction } from '@/app/transactions/actions'
import { useRouter } from 'next/navigation'

interface Transaction {
    id: string
    amount: number
    type: 'income' | 'expense'
    category?: string
    description?: string
    date: string
    is_recurring?: boolean
    installments_current?: number
    installments_total?: number
}

export default function IncomePage() {
    const router = useRouter()
    const now = new Date()
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1)
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [stats, setStats] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 })
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth, selectedYear])

    const loadData = async () => {
        setLoading(true)
        try {
            const [transactionsData, statsData] = await Promise.all([
                getTransactionsByMonth(selectedYear, selectedMonth, 'income'),
                getMonthlyStats(selectedYear, selectedMonth)
            ])
            setTransactions(transactionsData as Transaction[])
            setStats(statsData)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleMonthChange = (month: number, year: number) => {
        setSelectedMonth(month)
        setSelectedYear(year)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction(id)
            await loadData()
            router.refresh()
        } catch (error) {
            console.error('Error deleting transaction:', error)
            alert('Erro ao deletar transação')
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem' }}>
                <header className="mb-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 className="text-2xl font-bold">Receitas</h1>
                            <p className="text-muted-foreground">Gerencie suas receitas mensais</p>
                        </div>
                        <Link href="/transactions/new?type=income" className="btn">
                            <Plus size={20} />
                            Nova Receita
                        </Link>
                    </div>
                </header>

                <MonthFilter
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    onMonthChange={handleMonthChange}
                />

                <section className="summary-grid" style={{ marginTop: '1.5rem' }}>
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3>Total de Receitas</h3>
                            <TrendingUp size={20} style={{ color: 'hsl(var(--success))' }} />
                        </div>
                        <p className="amount positive">{formatCurrency(stats.totalIncome)}</p>
                    </div>
                </section>

                <section className="card" style={{ marginTop: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                        Transações do Mês
                    </h3>
                    {loading ? (
                        <div className="loading-state">Carregando...</div>
                    ) : (
                        <TransactionList
                            transactions={transactions}
                            onEdit={setEditingTransaction}
                            onDelete={handleDelete}
                        />
                    )}
                </section>
            </div>

            {editingTransaction && (
                <EditTransactionModal
                    transaction={editingTransaction}
                    onClose={() => {
                        setEditingTransaction(null)
                        loadData()
                    }}
                />
            )}
        </main>
    )
}
