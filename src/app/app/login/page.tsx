import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <div className="login-container">
            <form className="card login-form">
                <h1 className="text-2xl font-bold mb-4">Entrar</h1>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required className="input" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input id="password" name="password" type="password" required className="input" />
                </div>

                <div className="actions">
                    <button formAction={login} className="btn btn-primary">Log in</button>
                    <button formAction={signup} className="btn btn-secondary">Sign up</button>
                </div>
            </form>

            <style jsx>{`
         .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
         }
         .login-form {
            width: 100%;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
         }
         .mb-4 { margin-bottom: 1rem; }
         .text-2xl { font-size: 1.5rem; }
         .font-bold { font-weight: 700; }
         
         .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
         }
         .input {
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: var(--background);
            color: var(--foreground);
         }
         .actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
         }
         .btn {
            flex: 1;
            padding: 0.75rem;
            border-radius: var(--radius);
            font-weight: 600;
            cursor: pointer;
            border: none;
         }
         .btn-primary {
            background-color: var(--primary);
            color: var(--primary-foreground);
         }
         .btn-secondary {
            background-color: var(--muted);
            color: var(--foreground);
         }
       `}</style>
        </div>
    )
}
