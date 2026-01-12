import ExpensesChart from '@/components/ExpensesChart'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container" style={{ marginTop: '2rem' }}>
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Visão Geral</h1>
          <p className="text-muted-foreground">Bem-vindo de volta, Pedro.</p>
        </header>

        {/* Resumo Financeiro */}
        <section className="summary-grid">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Receitas</h3>
              <TrendingUp size={20} style={{ color: 'hsl(var(--success))' }} />
            </div>
            <p className="amount positive">R$ 5.240,00</p>
          </div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Despesas</h3>
              <TrendingDown size={20} style={{ color: 'hsl(var(--danger))' }} />
            </div>
            <p className="amount negative">R$ 3.150,00</p>
          </div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>Saldo Atual</h3>
              <Wallet size={20} style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <p className="amount neutral">R$ 2.090,00</p>
          </div>
        </section>

        {/* Placeholder Gráficos */}
        <section className="charts-grid mt-4">
          <div className="card chart-card">
            <h3>Despesas Mensais</h3>
            <ExpensesChart />
          </div>
          <div className="card chart-card">
            <h3>Categorias</h3>
            <div className="chart-placeholder">Gráfico Aqui</div>
          </div>
        </section>
      </div>

    </main>
  )
}

