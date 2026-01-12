import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createDebt } from '../actions'
import Link from 'next/link'

export default async function NewDebtPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <div className="card">
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h1 className="text-2xl font-bold">Nova Dívida</h1>
                        <p className="text-muted-foreground">Cadastre uma dívida que alguém tem com você</p>
                    </div>

                    <form action={createDebt}>
                        <div className="form-group">
                            <label htmlFor="debtor_name">Nome do Devedor *</label>
                            <input
                                type="text"
                                id="debtor_name"
                                name="debtor_name"
                                placeholder="Ex: João Silva"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição *</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                placeholder="Ex: Compra de peça de computador"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    background: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: 'calc(var(--radius) - 2px)',
                                    color: 'hsl(var(--foreground))',
                                    fontSize: '0.9375rem',
                                    resize: 'vertical',
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="total_amount">Valor Total *</label>
                            <input
                                type="number"
                                id="total_amount"
                                name="total_amount"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="installments_total">Número de Parcelas *</label>
                            <input
                                type="number"
                                id="installments_total"
                                name="installments_total"
                                min="1"
                                max="120"
                                defaultValue="6"
                                required
                            />
                            <p style={{
                                fontSize: '0.75rem',
                                color: 'hsl(var(--muted-foreground))',
                                marginTop: '0.25rem'
                            }}>
                                O valor será dividido automaticamente
                            </p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="start_date">Data de Início</label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button type="submit" className="btn" style={{ flex: 1 }}>
                                Cadastrar Dívida
                            </button>
                            <Link href="/debts" className="btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
