'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export interface Category {
    id: string
    user_id: string
    name: string
    type: 'income' | 'expense' | 'both'
    color?: string
    icon?: string
    created_at: string
}

export async function getCategories(type?: 'income' | 'expense' | 'both') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    let query = supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name')

    if (type) {
        query = query.or(`type.eq.${type},type.eq.both`)
    }

    const { data, error } = await query

    if (error) {
        throw new Error(`Erro ao buscar categorias: ${error.message}`)
    }

    return data as Category[]
}

export async function createCategory(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const name = formData.get('name') as string
    const type = formData.get('type') as 'income' | 'expense' | 'both'
    const color = formData.get('color') as string
    const icon = formData.get('icon') as string

    if (!name || !type) {
        throw new Error('Nome e tipo são obrigatórios')
    }

    const { data, error } = await supabase
        .from('categories')
        .insert({
            user_id: user.id,
            name,
            type,
            color: color || '#4F46E5',
            icon: icon || 'Tag'
        })
        .select()
        .single()

    if (error) {
        throw new Error(`Erro ao criar categoria: ${error.message}`)
    }

    revalidatePath('/categories')
    revalidatePath('/')
    return data as Category
}

export async function updateCategory(id: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const name = formData.get('name') as string
    const type = formData.get('type') as 'income' | 'expense' | 'both'
    const color = formData.get('color') as string
    const icon = formData.get('icon') as string

    const updates: Partial<Category> = {}
    if (name) updates.name = name
    if (type) updates.type = type
    if (color) updates.color = color
    if (icon) updates.icon = icon

    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

    if (error) {
        throw new Error(`Erro ao atualizar categoria: ${error.message}`)
    }

    revalidatePath('/categories')
    revalidatePath('/')
    return data as Category
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Usuário não autenticado')
    }

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        throw new Error(`Erro ao deletar categoria: ${error.message}`)
    }

    revalidatePath('/categories')
    revalidatePath('/')
}
