'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface CategoryData {
    name: string
    value: number
    color: string
}

interface CategoryPieChartProps {
    data?: CategoryData[]
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

const defaultData: CategoryData[] = [
    { name: 'Alimentação', value: 1200, color: COLORS[0] },
    { name: 'Transporte', value: 800, color: COLORS[1] },
    { name: 'Lazer', value: 400, color: COLORS[2] },
    { name: 'Saúde', value: 300, color: COLORS[3] },
    { name: 'Outros', value: 200, color: COLORS[4] },
]

interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        name: string
        value: number
        payload: CategoryData
    }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0]
        return (
            <div style={{
                backgroundColor: 'hsl(var(--card))',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid hsl(var(--border))',
                boxShadow: 'var(--shadow-md)'
            }}>
                <p style={{ fontWeight: 600, marginBottom: '4px', color: 'hsl(var(--foreground))' }}>
                    {data.name}
                </p>
                <p style={{ color: data.payload.color, fontSize: '14px' }}>
                    R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
            </div>
        )
    }
    return null
}

export default function CategoryPieChart({ data = defaultData }: CategoryPieChartProps) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span style={{ color: 'hsl(var(--foreground))', fontSize: '0.875rem' }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
