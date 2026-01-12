import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { populateUserData } from '@/utils/populate-data'

export default async function PopulatePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    let result = null
    let error = null

    try {
        result = await populateUserData(user.id)
    } catch (e: unknown) {
        error = e instanceof Error ? e.message : 'Erro desconhecido'
    }

    return (
        <main className="min-h-screen" style={{ padding: '2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card">
                    <h1 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>
                        Popular Banco de Dados
                    </h1>

                    {error ? (
                        <div style={{
                            padding: '1rem',
                            background: 'hsl(var(--danger-bg))',
                            border: '1px solid hsl(var(--danger))',
                            borderRadius: 'var(--radius)',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{ color: 'hsl(var(--danger))', fontWeight: 600, marginBottom: '0.5rem' }}>
                                ❌ Erro ao popular dados
                            </h3>
                            <p style={{ color: 'hsl(var(--foreground))' }}>{error}</p>
                        </div>
                    ) : result ? (
                        <div style={{
                            padding: '1.5rem',
                            background: 'hsl(var(--success-bg))',
                            border: '1px solid hsl(var(--success))',
                            borderRadius: 'var(--radius)',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{ color: 'hsl(var(--success))', fontWeight: 700, marginBottom: '1rem' }}>
                                ✅ Dados populados com sucesso!
                            </h3>

                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '0.75rem',
                                    background: 'hsl(var(--card))',
                                    borderRadius: 'calc(var(--radius) - 4px)'
                                }}>
                                    <span style={{ fontWeight: 600 }}>Categorias criadas:</span>
                                    <span style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>{result.categories}</span>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '0.75rem',
                                    background: 'hsl(var(--card))',
                                    borderRadius: 'calc(var(--radius) - 4px)'
                                }}>
                                    <span style={{ fontWeight: 600 }}>Transações criadas:</span>
                                    <span style={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>{result.transactions}</span>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div style={{ marginTop: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
                            Categorias que serão criadas:
                        </h2>

                        <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--danger))' }}>
                                Despesas:
                            </h3>
                            <ul style={{ paddingLeft: '1.5rem', color: 'hsl(var(--muted-foreground))' }}>
                                <li>Empréstimo Will</li>
                                <li>Itau Juli</li>
                                <li>Will Pedro</li>
                                <li>Facu Juli</li>
                                <li>Will Juli</li>
                                <li>Nubank</li>
                                <li>Itaucard 6823</li>
                                <li>Casa</li>
                                <li>Água</li>
                                <li>Energia</li>
                                <li>Dízimo</li>
                                <li>M1 dia 10</li>
                            </ul>

                            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--success))', marginTop: '1rem' }}>
                                Receitas:
                            </h3>
                            <ul style={{ paddingLeft: '1.5rem', color: 'hsl(var(--muted-foreground))' }}>
                                <li>Dia 15 Pedro (R$ 1.600,00)</li>
                                <li>Dia 30 Pedro (R$ 1.600,00)</li>
                                <li>Outros</li>
                            </ul>
                        </div>

                        <div style={{
                            padding: '1rem',
                            background: 'hsl(var(--muted))',
                            borderRadius: 'var(--radius)',
                            marginBottom: '1.5rem'
                        }}>
                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                                <strong>Nota:</strong> Este script criará transações dos últimos 6 meses com base
                                nos valores da planilha. Recarregue esta página para executar novamente.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="/" className="btn">
                                ← Voltar ao Dashboard
                            </a>
                            <a href="/categories" className="btn-secondary" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.75rem 1.5rem',
                                textDecoration: 'none'
                            }}>
                                Ver Categorias
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
