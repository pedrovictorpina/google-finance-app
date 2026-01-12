import Header from '@/components/Header'
import ExpensesChart from '@/components/ExpensesChart'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="container" style={{ marginTop: '2rem' }}>
                <header className="mb-4">
                    <h1 className="text-2xl font-bold">Visão Geral</h1>
                    <p className="text-muted-foreground">Bem-vindo de volta, Pedro.</p>
                </header>

                {/* Resumo Financeiro */}
                <section className="summary-grid">
                    <div className="card">
                        <h3>Receitas</h3>
                        <p className="amount positive">R$ 5.240,00</p>
                    </div>
                    <div className="card">
                        <h3>Despesas</h3>
                        <p className="amount negative">R$ 3.150,00</p>
                    </div>
                    <div className="card">
                        <h3>Saldo Atual</h3>
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

            <style jsx>{`
        .mb-4 { margin-bottom: 2rem; }
        .mt-4 { margin-top: 2rem; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .text-muted-foreground { color: var(--muted-foreground); }
        .min-h-screen { min-height: 100vh; }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .charts-grid { grid-template-columns: 2fr 1fr; }
        }

        .card h3 {
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .amount {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .positive { color: var(--success); }
        .negative { color: var(--danger); }
        
        .chart-placeholder {
          background: var(--muted);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius);
          color: var(--muted-foreground);
        }
      `}</style>
        </main>
    )
}
