import ExpensesChart from '@/components/ExpensesChart'
import CategoryPieChart from '@/components/CategoryPieChart'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import Link from 'next/link'
import { getMonthlyStats, getCategoryStats } from './transactions/actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get current month
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  // Fetch real-time data
  const stats = await getMonthlyStats(currentYear, currentMonth)
  const categoryData = await getCategoryStats(currentYear, currentMonth)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <main className="min-h-screen">
      <div className="container" style={{ marginTop: '2rem' }}>
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Visão Geral</h1>
          <p className="text-muted-foreground">
            {now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </header>

        {/* Resumo Financeiro - DYNAMIC DATA */}
        <section className="summary-grid">
          <Link href="/income" className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Receitas</h3>
              <TrendingUp size={20} style={{ color: 'hsl(var(--success))' }} />
            </div>
            <p className="amount positive">{formatCurrency(stats.totalIncome)}</p>
          </Link>
          <Link href="/expenses" className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Despesas</h3>
              <TrendingDown size={20} style={{ color: 'hsl(var(--danger))' }} />
            </div>
            <p className="amount negative">{formatCurrency(stats.totalExpenses)}</p>
          </Link>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Saldo Atual</h3>
              <Wallet size={20} style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <p className={`amount ${stats.balance >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(stats.balance)}
            </p>
          </div>
        </section>

        {/* Gráficos */}
        <section className="charts-grid mt-4">
          <div className="card chart-card">
            <h3>Receitas & Despesas</h3>
            <ExpensesChart />
          </div>
          <div className="card chart-card">
            <h3>Despesas por Categoria</h3>
            <CategoryPieChart data={categoryData} />
          </div>
        </section>
      </div>

    </main>
  )
}
