'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Sparkles } from 'lucide-react'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'eva'>('dark')
    const [mounted, setMounted] = useState(false)

    const applyTheme = (newTheme: 'light' | 'dark' | 'eva') => {
        const root = document.documentElement
        root.setAttribute('data-theme', newTheme)
    }

    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'eva' | null
        if (savedTheme) {
            setTheme(savedTheme)
            applyTheme(savedTheme)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const initialTheme = prefersDark ? 'dark' : 'light'
            setTheme(initialTheme)
            applyTheme(initialTheme)
        }
    }, [])

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'eva') => {
        setTheme(newTheme)
        applyTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    if (!mounted) {
        return (
            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Tema
                </h2>
                <div style={{ padding: '2rem', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>
                    Carregando...
                </div>
            </div>
        )
    }

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Aparência
            </h2>

            <div className="theme-options">
                <button
                    onClick={() => handleThemeChange('light')}
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    aria-label="Tema Claro"
                >
                    <div className="theme-icon">
                        <Sun size={24} />
                    </div>
                    <div className="theme-info">
                        <h3>Claro</h3>
                        <p>Tema clássico light</p>
                    </div>
                    {theme === 'light' && <div className="theme-check">✓</div>}
                </button>

                <button
                    onClick={() => handleThemeChange('dark')}
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    aria-label="Tema Escuro"
                >
                    <div className="theme-icon">
                        <Moon size={24} />
                    </div>
                    <div className="theme-info">
                        <h3>Escuro</h3>
                        <p>Tema dark mode</p>
                    </div>
                    {theme === 'dark' && <div className="theme-check">✓</div>}
                </button>

                <button
                    onClick={() => handleThemeChange('eva')}
                    className={`theme-option ${theme === 'eva' ? 'active' : ''}`}
                    aria-label="Tema EVA-01"
                >
                    <div className="theme-icon eva-icon">
                        <Sparkles size={24} />
                    </div>
                    <div className="theme-info">
                        <h3>EVA-01</h3>
                        <p>Inspirado em Evangelion</p>
                    </div>
                    {theme === 'eva' && <div className="theme-check">✓</div>}
                </button>
            </div>

            {theme === 'eva' && (
                <div className="eva-preview">
                    <div className="eva-colors">
                        <div style={{ background: '#995CD0' }} className="eva-color" />
                        <div style={{ background: '#8EDF5F' }} className="eva-color" />
                        <div style={{ background: '#EC7744' }} className="eva-color" />
                        <div style={{ background: '#5549B7' }} className="eva-color" />
                        <div style={{ background: '#201D30' }} className="eva-color" />
                    </div>
                </div>
            )}
        </div>
    )
}
