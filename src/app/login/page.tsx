'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { LogIn, UserPlus, Loader2 } from 'lucide-react'

export default function LoginPage() {
   const [mode, setMode] = useState<'login' | 'signup'>('login')
   const [isLoading, setIsLoading] = useState(false)
   const [rememberMe, setRememberMe] = useState(false)

   const handleSubmit = async (formData: FormData) => {
      setIsLoading(true)
      formData.append('rememberMe', rememberMe.toString())

      try {
         if (mode === 'login') {
            await login(formData)
         } else {
            await signup(formData)
         }
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="login-container">
         <form action={handleSubmit} className="card login-form">
            <h1 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>
               {mode === 'login' ? 'Entrar' : 'Criar Conta'}
            </h1>

            <div className="type-selector" style={{ marginBottom: '1.5rem' }}>
               <button
                  type="button"
                  className={`type-btn ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => setMode('login')}
                  style={{ color: mode === 'login' ? 'hsl(var(--primary))' : '' }}
               >
                  <LogIn size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Entrar
               </button>
               <button
                  type="button"
                  className={`type-btn ${mode === 'signup' ? 'active' : ''}`}
                  onClick={() => setMode('signup')}
                  style={{ color: mode === 'signup' ? 'hsl(var(--primary))' : '' }}
               >
                  <UserPlus size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Cadastrar
               </button>
            </div>

            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input"
                  placeholder="seu@email.com"
                  disabled={isLoading}
               />
            </div>

            <div className="form-group">
               <label htmlFor="password">Senha</label>
               <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="••••••••"
                  minLength={6}
                  disabled={isLoading}
               />
               {mode === 'signup' && (
                  <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                     Mínimo 6 caracteres
                  </p>
               )}
            </div>

            {mode === 'login' && (
               <div className="checkbox-group" style={{ marginBottom: '1rem' }}>
                  <label className="checkbox-label">
                     <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                     />
                     Lembrar-me neste dispositivo
                  </label>
               </div>
            )}

            <button
               type="submit"
               className="btn btn-primary full-width"
               disabled={isLoading}
               style={{ marginTop: '1rem', height: '48px' }}
            >
               {isLoading ? (
                  <>
                     <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                     {mode === 'login' ? 'Entrando...' : 'Criando conta...'}
                  </>
               ) : (
                  <>
                     {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                     {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                  </>
               )}
            </button>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
               {mode === 'login' ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
               <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  style={{
                     color: 'hsl(var(--primary))',
                     background: 'none',
                     border: 'none',
                     cursor: 'pointer',
                     textDecoration: 'underline',
                     fontWeight: 600
                  }}
                  disabled={isLoading}
               >
                  {mode === 'login' ? 'Criar conta' : 'Fazer login'}
               </button>
            </p>
         </form>

         <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
      </div>
   )
}
