'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createTransaction } from '../actions'

export default function NewTransactionPage() {
    const [type, setType] = useState('expense')
    const [isRecurring, setIsRecurring] = useState(false)

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <header className="mb-4">
                    <Link href="/" className="back-link">
                        <ArrowLeft size={16} />
                        Voltar
                    </Link>
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


        </main>
    )
}
