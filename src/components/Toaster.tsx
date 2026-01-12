'use client'

import { Toaster as HotToaster } from 'react-hot-toast'

export default function Toaster() {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'hsl(var(--card))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                },
                success: {
                    iconTheme: {
                        primary: 'hsl(var(--success))',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'hsl(var(--danger))',
                        secondary: 'white',
                    },
                },
            }}
        />
    )
}
