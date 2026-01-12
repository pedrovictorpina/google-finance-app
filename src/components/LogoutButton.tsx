import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function LogoutButton() {
    const supabase = await createClient()

    async function signOut() {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/login')
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    return (
        <form action={signOut} style={{ display: 'inline' }}>
            <button
                type="submit"
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'hsl(var(--muted-foreground))',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    padding: '0.5rem',
                    textDecoration: 'underline'
                }}
            >
                Sair
            </button>
        </form>
    )
}
