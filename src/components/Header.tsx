import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          FinanceControl
        </Link>
        <nav>
          {user ? (
            <div className="user-menu">
              <div className="avatar">{user.email?.charAt(0).toUpperCase()}</div>
            </div>
          ) : (
            <Link href="/login" className="btn-sm">Entrar</Link>
          )}
        </nav>
      </div>
      <style jsx>{`
        .header {
          border-bottom: 1px solid var(--border);
          background: var(--card);
        }
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }
        .btn-sm {
           padding: 0.5rem 1rem;
           background: var(--primary);
           color: var(--primary-foreground);
           border-radius: var(--radius);
           text-decoration: none;
           font-size: 0.875rem;
           font-weight: 500;
        }
        .logo {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--foreground);
          text-decoration: none;
        }
        .avatar {
          width: 32px;
          height: 32px;
          background: var(--primary);
          color: var(--primary-foreground);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
        }
      `}</style>
    </header>
  )
}
