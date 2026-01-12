'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

// Sample data - will be replaced with real data from props
const data = [
    { name: 'Jan', despesas: 2400, receitas: 4000 },
    { name: 'Fev', despesas: 1398, receitas: 3000 },
    { name: 'Mar', despesas: 3800, receitas: 2000 },
    { name: 'Abr', despesas: 3908, receitas: 2780 },
    { name: 'Mai', despesas: 4800, receitas: 1890 },
    { name: 'Jun', despesas: 3800, receitas: 2390 },
]

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        value: number
        name: string
        color: string
    }>
    label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: 'hsl(var(--card))',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-md)'
            }}>
                <p style={{ fontWeight: 600, marginBottom: '8px', color: 'hsl(var(--foreground))' }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{
                        color: entry.color,
                        fontSize: '14px',
                        margin: '4px 0'
                    }}>
                        {entry.name === 'despesas' ? 'Despesas' : 'Receitas'}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export default function ExpensesChart() {
    return (
        <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--danger))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--danger))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$${value}`}
                        width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="receitas"
                        stroke="hsl(var(--success))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorReceitas)"
                    />
                    <Area
                        type="monotone"
                        dataKey="despesas"
                        stroke="hsl(var(--danger))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDespesas)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
