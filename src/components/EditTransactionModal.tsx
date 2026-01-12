'use client'

import { X } from 'lucide-react'
import { updateTransaction } from '@/app/transactions/actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Transaction {
    id: string
    amount: number
    type: 'income' | 'expense'
    category?: string
    description?: string
    date: string
}

interface EditTransactionModalProps {
    transaction: Transaction
    onClose: () => void
}

export default function EditTransactionModal({ transaction, onClose }: EditTransactionModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            await updateTransaction(transaction.id, formData)
            router.refresh()
            onClose()
        } catch (error) {
            console.error('Error updating transaction:', error)
            alert('Erro ao atualizar transação')
        } finally {
            setLoading(false)
        }
    }

    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Transação</h2>
                    <button onClick={onClose} className="modal-close" aria-label="Fechar">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label>Tipo</label>
                        <div className="type-selector">
                            <button
                                type="button"
                                className={`type-btn ${transaction.type === 'income' ? 'active income' : ''}`}
                                disabled
                            >
                                Receita
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${transaction.type === 'expense' ? 'active expense' : ''}`}
                                disabled
                            >
                                Despesa
                            </button>
                        </div>
                        <input type="hidden" name="type" value={transaction.type} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Valor (R$)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            step="0.01"
                            defaultValue={transaction.amount}
                            className="input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoria</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            defaultValue={transaction.category || ''}
                            className="input"
                            placeholder="Ex: Alimentação, Salário..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            defaultValue={transaction.description || ''}
                            className="input"
                            placeholder="Descreva a transação..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            defaultValue={formatDateForInput(transaction.date)}
                            className="input"
                            required
                        />
                    </div>

                    <div className="actions">
                        <button type="button" onClick={onClose} className="btn-secondary full-width">
                            Cancelar
                        </button>
                        <button type="submit" className="btn full-width" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
