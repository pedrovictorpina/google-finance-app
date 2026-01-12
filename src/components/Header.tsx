import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { LogIn, TrendingUp, TrendingDown, Tags, Users } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          FinanceControl
        </Link>
        {user && (
          <nav className="main-nav">
            <Link href="/income" className="nav-link">
              <TrendingUp size={18} />
              Receitas
            </Link>
            <Link href="/expenses" className="nav-link">
              <TrendingDown size={18} />
              Despesas
            </Link>
            <Link href="/categories" className="nav-link">
              <Tags size={18} />
              Categorias
            </Link>
            <Link href="/debts" className="nav-link">
              <Users size={18} />
              Dívidas
            </Link>
          </nav>
        )}
        <nav>
          {user ? (
            <div className="user-menu">
              <Link href="/profile" title={user.email || 'Perfil'}>
                <div className="avatar">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login" className="btn" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
              <LogIn size={16} />
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
