import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function CleanupPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if there's a cleanup action
    async function deleteAllTransactions() {
        'use server'
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            throw new Error('Não autenticado')
        }

        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('user_id', user.id)

        if (error) {
            throw new Error(`Erro ao deletar: ${error.message}`)
        }

        redirect('/cleanup?success=true')
    }

    const { count } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <div className="card">
                    <h1 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>
                        Limpar Dados
                    </h1>

                    <div style={{
                        padding: '1rem',
                        background: 'hsl(var(--warning) / 0.1)',
                        border: '2px solid hsl(var(--warning))',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{ color: 'hsl(var(--warning))', fontWeight: 700, marginBottom: '0.5rem' }}>
                            ⚠️ Atenção
                        </h3>
                        <p style={{ color: 'hsl(var(--foreground))', fontSize: '0.875rem' }}>
                            Esta ação deletará <strong>TODAS as suas transações ({count || 0})</strong>. Esta ação não pode ser desfeita!
                        </p>
                    </div>

                    <form action={deleteAllTransactions}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="btn-secondary"
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    background: 'hsl(var(--danger))',
                                    color: 'white',
                                    borderColor: 'hsl(var(--danger))'
                                }}
                            >
                                🗑️ Deletar Todas as Transações
                            </button>

                            <Link href="/" className="btn" style={{ textAlign: 'center' }}>
                                ← Cancelar
                            </Link>
                        </div>
                    </form>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'hsl(var(--muted))',
                        borderRadius: 'var(--radius)'
                    }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Próximos passos:
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                            Após limpar os dados, acesse <Link href="/populate" style={{ color: 'hsl(var(--primary))' }}>/populate</Link> para adicionar novamente os dados das planilhas.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
