import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { User, Mail, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Buscar estatísticas básicas
    const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)

    const totalIncome = transactions?.filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const totalExpense = transactions?.filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0) || 0

    const transactionCount = transactions?.length || 0

    // Formatar data de criação
    const createdAt = new Date(user.created_at)
    const memberSince = createdAt.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long'
    })

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-2xl font-bold">Meu Perfil</h1>
                    <Link href="/" className="back-link">
                        ← Voltar
                    </Link>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {/* Card de Informações do Usuário */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            Informações da Conta
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    color: 'white',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    {user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.25rem' }}>
                                        Email
                                    </p>
                                    <p style={{ fontSize: '1.125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Mail size={18} style={{ color: 'hsl(var(--primary))' }} />
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} style={{ color: 'hsl(var(--primary))' }} />
                                    Membro desde
                                </label>
                                <p style={{
                                    padding: '0.875rem 1rem',
                                    background: 'hsl(var(--muted))',
                                    borderRadius: 'calc(var(--radius) - 2px)',
                                    color: 'hsl(var(--foreground))',
                                    fontWeight: 500
                                }}>
                                    {memberSince}
                                </p>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={16} style={{ color: 'hsl(var(--primary))' }} />
                                    ID do Usuário
                                </label>
                                <p style={{
                                    padding: '0.875rem 1rem',
                                    background: 'hsl(var(--muted))',
                                    borderRadius: 'calc(var(--radius) - 2px)',
                                    color: 'hsl(var(--muted-foreground))',
                                    fontSize: '0.875rem',
                                    fontFamily: 'monospace'
                                }}>
                                    {user.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card de Estatísticas */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            Estatísticas
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div style={{
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, hsl(var(--success-bg)) 0%, hsl(var(--background)) 100%)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid hsl(var(--border))'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>
                                        Total Receitas
                                    </p>
                                    <TrendingUp size={20} style={{ color: 'hsl(var(--success))' }} />
                                </div>
                                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--success))' }}>
                                    R$ {totalIncome.toFixed(2)}
                                </p>
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, hsl(var(--danger-bg)) 0%, hsl(var(--background)) 100%)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid hsl(var(--border))'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>
                                        Total Despesas
                                    </p>
                                    <TrendingDown size={20} style={{ color: 'hsl(var(--danger))' }} />
                                </div>
                                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--danger))' }}>
                                    R$ {totalExpense.toFixed(2)}
                                </p>
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)',
                                borderRadius: 'var(--radius)',
                                border: '1px solid hsl(var(--border))'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>
                                        Transações
                                    </p>
                                </div>
                                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--primary))' }}>
                                    {transactionCount}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card de Ações */}
                    <div className="card" style={{ background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                            Ações da Conta
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link
                                href="/transactions/new"
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Nova Transação
                            </Link>

                            <form action={async () => {
                                'use server'
                                const supabase = await createClient()
                                await supabase.auth.signOut()
                                redirect('/login')
                            }}>
                                <button
                                    type="submit"
                                    className="btn btn-secondary"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Sair da Conta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
