'use client'

import { useState, useEffect } from 'react'
import { Debt, DebtInstallment, getDebtWithInstallments, toggleInstallmentPaid, deleteDebt } from '@/app/debts/actions'
import { Check, X, Trash2, Calendar, DollarSign, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DebtCardProps {
    debt: Debt
}

export default function DebtCard({ debt }: DebtCardProps) {
    const [installments, setInstallments] = useState<DebtInstallment[]>([])
    const [expanded, setExpanded] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const paidCount = installments.filter(i => i.paid).length
    const progress = (paidCount / installments.length) * 100 || 0

    useEffect(() => {
        if (expanded && installments.length === 0) {
            loadInstallments()
        }
    }, [expanded])

    const loadInstallments = async () => {
        setLoading(true)
        try {
            const data = await getDebtWithInstallments(debt.id)
            if (data) {
                setInstallments(data.installments)
            }
        } catch (error) {
            console.error('Error loading installments:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleTogglePaid = async (installmentId: string, currentlyPaid: boolean) => {
        try {
            await toggleInstallmentPaid(installmentId, !currentlyPaid)
            // Reload installments
            await loadInstallments()
            router.refresh()
        } catch (error) {
            console.error('Error toggling installment:', error)
            alert('Erro ao atualizar parcela')
        }
    }

    const handleDelete = async () => {
        if (!confirm(`Tem certeza que deseja deletar a dívida de ${debt.debtor_name}?`)) {
            return
        }

        try {
            await deleteDebt(debt.id)
            router.refresh()
        } catch (error) {
            console.error('Error deleting debt:', error)
            alert('Erro ao deletar dívida')
        }
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <User size={18} style={{ color: 'hsl(var(--primary))' }} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{debt.debtor_name}</h3>
                    </div>
                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {debt.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <DollarSign size={14} />
                            R$ {debt.total_amount.toFixed(2)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} />
                            {debt.installments_total}x de R$ {debt.installment_amount.toFixed(2)}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    style={{
                        padding: '0.5rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'hsl(var(--danger))',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(var(--danger-bg))'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--foreground))' }}>
                        Progresso
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--primary))' }}>
                        {paidCount}/{debt.installments_total} parcelas pagas
                    </span>
                </div>
                <div style={{
                    height: '8px',
                    background: 'hsl(var(--muted))',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'var(--gradient-success)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <button
                onClick={() => setExpanded(!expanded)}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
            >
                {expanded ? 'Ocultar' : 'Ver'} Parcelas
            </button>

            {expanded && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid hsl(var(--border))', paddingTop: '1rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '1rem', color: 'hsl(var(--muted-foreground))' }}>
                            Carregando...
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {installments.map((inst) => (
                                <div
                                    key={inst.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        background: inst.paid ? 'hsl(var(--success-bg))' : 'hsl(var(--muted))',
                                        borderRadius: '8px',
                                        border: inst.paid ? '1px solid hsl(var(--success))' : '1px solid hsl(var(--border))'
                                    }}
                                >
                                    <div>
                                        <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>
                                            Parcela {inst.installment_number}
                                        </span>
                                        <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                                            R$ {inst.amount.toFixed(2)}
                                        </span>
                                        {inst.due_date && (
                                            <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                                                {new Date(inst.due_date).toLocaleDateString('pt-BR')}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleTogglePaid(inst.id, inst.paid)}
                                        style={{
                                            padding: '0.5rem',
                                            background: inst.paid ? 'hsl(var(--success))' : 'hsl(var(--border))',
                                            color: inst.paid ? 'white' : 'hsl(var(--foreground))',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {inst.paid ? <><Check size={14} /> Paga</> : <><X size={14} /> Pendente</>}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
