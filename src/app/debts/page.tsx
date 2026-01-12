import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDebts } from './actions'
import Link from 'next/link'
import { Plus, Users } from 'lucide-react'
import DebtCard from '@/components/DebtCard'

export default async function DebtsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const debts = await getDebts()

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem' }}>
                <header className="mb-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 className="text-2xl font-bold">Dívidas a Receber</h1>
                            <p className="text-muted-foreground">Gerencie valores que outras pessoas te devem</p>
                        </div>
                        <Link href="/debts/new" className="btn">
                            <Plus size={20} />
                            Nova Dívida
                        </Link>
                    </div>
                </header>

                {debts.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                        <Users size={48} style={{ color: 'hsl(var(--muted-foreground))', margin: '0 auto 1rem' }} />
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Nenhuma dívida cadastrada
                        </h3>
                        <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>
                            Comece cadastrando uma dívida que alguém tem com você.
                        </p>
                        <Link href="/debts/new" className="btn">
                            <Plus size={20} />
                            Cadastrar Primeira Dívida
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {debts.map((debt) => (
                            <DebtCard key={debt.id} debt={debt} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
