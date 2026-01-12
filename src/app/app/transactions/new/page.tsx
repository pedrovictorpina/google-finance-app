'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { createTransaction } from '../actions'

export default function NewTransactionPage() {
    const [type, setType] = useState('expense')
    const [isRecurring, setIsRecurring] = useState(false)

    return (
        <main className="min-h-screen">
            <Header />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <header className="mb-4">
                    <Link href="/" className="back-link">← Voltar</Link>
                    <h1 className="text-2xl font-bold mt-2">Nova Transação</h1>
                </header>

                <form action={createTransaction} className="card form-grid">

                    <div className="type-selector">
                        <input type="hidden" name="type" value={type} />
                        <button
                            type="button"
                            className={`type-btn ${type === 'income' ? 'active income' : ''}`}
                            onClick={() => setType('income')}
                        >
                            Receita
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
                            onClick={() => setType('expense')}
                        >
                            Despesa
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Valor (R$)</label>
                        <input name="amount" type="number" step="0.01" placeholder="0,00" className="input" required />
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>
                        <input name="description" type="text" placeholder="Ex: Compras Supermercado" className="input" required />
                    </div>

                    <div className="form-group">
                        <label>Categoria</label>
                        <select name="category" className="input">
                            <option>Tenda</option>
                            <option>Emprestimo Will</option>
                            <option>Itau Juli</option>
                            <option>Will Pedro</option>
                            <option>Facu Juli</option>
                            <option>Will Juli</option>
                            <option>Nubank</option>
                            <option>Itaucard</option>
                            <option>Casa</option>
                            <option>Agua</option>
                            <option>Energia</option>
                            <option>Dizimo</option>
                            <option>M1 dia 10</option>
                            <option>Emprestimo</option>
                            <option>Outros</option>
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                name="isRecurring"
                                type="checkbox"
                                checked={isRecurring}
                                onChange={(e) => setIsRecurring(e.target.checked)}
                            />
                            É recorrente ou parcelado?
                        </label>
                    </div>

                    {isRecurring && (
                        <div className="sub-options">
                            <div className="form-group">
                                <label>Tipo</label>
                                <select name="recurrenceType" className="input">
                                    <option value="recurring">Recorrente (Mensal)</option>
                                    <option value="installments">Parcelado</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Parcelas</label>
                                <input name="installmentsTotal" type="number" placeholder="Total de parcelas" className="input" />
                            </div>
                        </div>
                    )}

                    <div className="actions">
                        <button type="submit" className="btn btn-primary full-width">Salvar</button>
                    </div>

                </form>
            </div>

            <style jsx>{`
        .mb-4 { margin-bottom: 2rem; }
        .mt-2 { margin-top: 0.5rem; }
        .text-2xl { font-size: 1.5rem; }
        .font-bold { font-weight: 700; }
        .min-h-screen { min-height: 100vh; }
        .back-link { text-decoration: none; color: var(--muted-foreground); font-size: 0.875rem; }
        
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .type-selector {
          display: flex;
          background: var(--muted);
          padding: 4px;
          border-radius: var(--radius);
        }
        
        .type-btn {
          flex: 1;
          padding: 8px;
          border: none;
          background: transparent;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          color: var(--muted-foreground);
          transition: all 0.2s;
        }
        
        .type-btn.active {
          background: var(--card);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        .type-btn.active.income { color: var(--success); }
        .type-btn.active.expense { color: var(--danger); }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .input {
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: var(--background);
          color: var(--foreground);
          font-size: 1rem;
        }
        
        .checkbox-group {
           flex-direction: row;
           align-items: center;
        }
        
        .checkbox-label {
           display: flex;
           align-items: center;
           gap: 0.5rem;
           cursor: pointer;
        }
        
        .sub-options {
          padding: 1rem;
          background: var(--muted);
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .actions {
          margin-top: 1rem;
        }
        
        .btn-primary {
          background-color: var(--primary);
          color: var(--primary-foreground);
          font-size: 1rem;
          height: 48px;
          width: 100%;
        }
      `}</style>
        </main>
    )
}
