'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Tag, X } from 'lucide-react'
import { getCategories, createCategory, updateCategory, deleteCategory, type Category } from './actions'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const categoryColors = [
    '#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F59E0B',
    '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', '#F97316'
]

const categoryIcons = [
    'Tag', 'Home', 'Car', 'ShoppingCart', 'Coffee', 'Utensils',
    'Heart', 'Gift', 'Briefcase', 'Wallet', 'CreditCard', 'Smartphone'
]

export default function CategoriesPage() {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        type: 'expense' as 'income' | 'expense' | 'both',
        color: categoryColors[0],
        icon: categoryIcons[0]
    })

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        setLoading(true)
        try {
            const data = await getCategories()
            setCategories(data)
        } catch (error) {
            console.error('Error loading categories:', error)
            toast.error('Erro ao carregar categorias')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formDataObj = new FormData()
        formDataObj.append('name', formData.name)
        formDataObj.append('type', formData.type)
        formDataObj.append('color', formData.color)
        formDataObj.append('icon', formData.icon)

        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formDataObj)
                toast.success('Categoria atualizada com sucesso!')
            } else {
                await createCategory(formDataObj)
                toast.success('Categoria criada com sucesso!')
            }

            setFormData({
                name: '',
                type: 'expense',
                color: categoryColors[0],
                icon: categoryIcons[0]
            })
            setShowForm(false)
            setEditingCategory(null)
            await loadCategories()
            router.refresh()
        } catch (error) {
            console.error('Error saving category:', error)
            toast.error('Erro ao salvar categoria')
        }
    }

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            type: category.type,
            color: category.color || categoryColors[0],
            icon: category.icon || categoryIcons[0]
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

        try {
            await deleteCategory(id)
            toast.success('Categoria excluída com sucesso!')
            await loadCategories()
            router.refresh()
        } catch (error) {
            console.error('Error deleting category:', error)
            toast.error('Erro ao deletar categoria')
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingCategory(null)
        setFormData({
            name: '',
            type: 'expense',
            color: categoryColors[0],
            icon: categoryIcons[0]
        })
    }

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'income': return 'Receita'
            case 'expense': return 'Despesa'
            case 'both': return 'Ambos'
            default: return type
        }
    }

    return (
        <main className="min-h-screen">
            <div className="container" style={{ marginTop: '2rem' }}>
                <header className="mb-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 className="text-2xl font-bold">Categorias</h1>
                            <p className="text-muted-foreground">Gerencie suas categorias de transações</p>
                        </div>
                        {!showForm && (
                            <button onClick={() => setShowForm(true)} className="btn">
                                <Plus size={20} />
                                Nova Categoria
                            </button>
                        )}
                    </div>
                </header>

                {showForm && (
                    <section className="card" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
                                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                            </h3>
                            <button onClick={handleCancel} className="modal-close">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Nome da Categoria</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input"
                                    placeholder="Ex: Alimentação, Transporte..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Tipo</label>
                                <div className="type-selector">
                                    <button
                                        type="button"
                                        className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
                                        onClick={() => setFormData({ ...formData, type: 'income' })}
                                    >
                                        Receita
                                    </button>
                                    <button
                                        type="button"
                                        className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
                                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                                    >
                                        Despesa
                                    </button>
                                    <button
                                        type="button"
                                        className={`type-btn ${formData.type === 'both' ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, type: 'both' })}
                                    >
                                        Ambos
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Cor</label>
                                <div className="color-picker">
                                    {categoryColors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`color-option ${formData.color === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setFormData({ ...formData, color })}
                                            aria-label={`Selecionar cor ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="actions">
                                <button type="button" onClick={handleCancel} className="btn-secondary full-width">
                                    Cancelar
                                </button>
                                <button type="submit" className="btn full-width">
                                    {editingCategory ? 'Salvar' : 'Criar Categoria'}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section>
                    {loading ? (
                        <div className="loading-state card">Carregando...</div>
                    ) : categories.length === 0 ? (
                        <div className="empty-state card">
                            <p>Nenhuma categoria cadastrada. Crie sua primeira categoria!</p>
                        </div>
                    ) : (
                        <div className="categories-grid">
                            {categories.map((category) => (
                                <div key={category.id} className="category-card card">
                                    <div className="category-header">
                                        <div className="category-icon" style={{ backgroundColor: category.color }}>
                                            <Tag size={20} />
                                        </div>
                                        <div className="category-info">
                                            <h4>{category.name}</h4>
                                            <span className="category-type">{getTypeLabel(category.type)}</span>
                                        </div>
                                    </div>
                                    <div className="category-actions">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="action-btn edit-btn"
                                            aria-label="Editar categoria"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="action-btn delete-btn"
                                            aria-label="Excluir categoria"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
