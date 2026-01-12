'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthFilterProps {
    selectedMonth: number
    selectedYear: number
    onMonthChange: (month: number, year: number) => void
}

export default function MonthFilter({ selectedMonth, selectedYear, onMonthChange }: MonthFilterProps) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const handlePrevious = () => {
        if (selectedMonth === 1) {
            onMonthChange(12, selectedYear - 1)
        } else {
            onMonthChange(selectedMonth - 1, selectedYear)
        }
    }

    const handleNext = () => {
        if (selectedMonth === 12) {
            onMonthChange(1, selectedYear + 1)
        } else {
            onMonthChange(selectedMonth + 1, selectedYear)
        }
    }

    return (
        <div className="month-filter">
            <button onClick={handlePrevious} className="month-nav-btn" aria-label="Mês anterior">
                <ChevronLeft size={20} />
            </button>
            <div className="month-display">
                <span className="month-name">{monthNames[selectedMonth - 1]}</span>
                <span className="year-name">{selectedYear}</span>
            </div>
            <button onClick={handleNext} className="month-nav-btn" aria-label="Próximo mês">
                <ChevronRight size={20} />
            </button>
        </div>
    )
}
