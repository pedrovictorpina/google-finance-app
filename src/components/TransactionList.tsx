'use client'

import { Trash2, Edit, Calendar, Tag } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

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

interface TransactionListProps {
    transactions: Transaction[]
    onEdit: (transaction: Transaction) => void
    onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir est a transação?')) return

        setDeletingId(id)
        try {
            await onDelete(id)
            toast.success('Transação excluída com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Error deleting:', error)
            toast.error('Erro ao excluir transação')
        } finally {
            setDeletingId(null)
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short'
        })
    }

    if (transactions.length === 0) {
        return (
            <div className="empty-state">
                <p>Nenhuma transação encontrada para este mês.</p>
            </div>
        )
    }

    return (
        <div className="transaction-list">
            {transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                        <div className="transaction-header">
                            <h4 className="transaction-description">
                                {transaction.description || 'Sem descrição'}
                            </h4>
                            <span className={`transaction-amount ${transaction.type}`}>
                                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                            </span>
                        </div>
                        <div className="transaction-meta">
                            <span className="meta-item">
                                <Calendar size={14} />
                                {formatDate(transaction.date)}
                            </span>
                            {transaction.category && (
                                <span className="meta-item">
                                    <Tag size={14} />
                                    {transaction.category}
                                </span>
                            )}
                            {transaction.installments_total && (
                                <span className="meta-item">
                                    {transaction.installments_current}/{transaction.installments_total}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="transaction-actions">
                        <button
                            onClick={() => onEdit(transaction)}
                            className="action-btn edit-btn"
                            aria-label="Editar transação"
                            title="Editar"
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => handleDelete(transaction.id)}
                            className="action-btn delete-btn"
                            aria-label="Excluir transação"
                            title="Excluir"
                            disabled={deletingId === transaction.id}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
