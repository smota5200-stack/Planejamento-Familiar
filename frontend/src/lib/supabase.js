import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Create frontend/.env.local with:')
  console.error('VITE_SUPABASE_URL=your_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ==========================================
// AUTH FUNCTIONS
// ==========================================

export const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      }
    })
    if (error) {
      console.error('Signup error details:', error)
      throw new Error(error.message || 'Erro ao criar conta')
    }
    return { data, error: null }
  } catch (error) {
    console.error('Sign up catch error:', error)
    const errorMsg = error?.message || error?.toString() || 'Erro de conexão. Verifique sua internet.'
    return { data: null, error: errorMsg }
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error('Login error details:', error)
      throw new Error(error.message || 'Erro ao fazer login')
    }
    return { data, error: null }
  } catch (error) {
    console.error('Sign in catch error:', error)
    const errorMsg = error?.message || error?.toString() || 'Erro de conexão. Verifique sua internet.'
    return { data: null, error: errorMsg }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error.message }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// ==========================================
// FAMILY FUNCTIONS
// ==========================================

export const getOrCreateFamily = async (userId) => {
  try {
    // Tenta buscar família do usuário
    const { data: member, error: memberError } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', userId)
      .single()

    if (member) {
      // Usuário já está em uma família
      const { data: family } = await supabase
        .from('families')
        .select('*')
        .eq('id', member.family_id)
        .single()
      return family
    }

    // Criar nova família se não existir
    if (memberError?.code === 'PGRST116') {
      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert([{ name: 'Minha Família' }])
        .select()
        .single()

      if (familyError) throw familyError

      // Adicionar usuário como admin
      const { error: memberInsertError } = await supabase
        .from('family_members')
        .insert([{
          family_id: family.id,
          user_id: userId,
          name: 'Admin',
          email: (await getCurrentUser())?.email,
          role: 'admin'
        }])

      if (memberInsertError) throw memberInsertError
      return family
    }

    throw memberError
  } catch (error) {
    console.error('Error in getOrCreateFamily:', error)
    return null
  }
}

export const getFamilyMembers = async (familyId) => {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('family_id', familyId)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching family members:', error)
    return []
  }
}

export const addFamilyMember = async (familyId, email, name) => {
  try {
    // Primeiro, criar usuário no Auth (admin ou via function)
    // Por enquanto, apenas adicionar como membro
    const { data, error } = await supabase
      .from('family_members')
      .insert([{
        family_id: familyId,
        email,
        name,
        role: 'member'
      }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error adding family member:', error)
    return null
  }
}

// ==========================================
// ACCOUNTS (Contas) FUNCTIONS
// ==========================================

export const getAccounts = async (familyId, year, month) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('family_id', familyId)
      .eq('year', year)
      .eq('month', month)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return []
  }
}

export const createAccount = async (familyId, accountData) => {
  try {
    const user = await getCurrentUser()
    const { data, error } = await supabase
      .from('accounts')
      .insert([{
        family_id: familyId,
        ...accountData,
        created_by: user.id
      }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating account:', error)
    return null
  }
}

export const updateAccount = async (accountId, updates) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .update(updates)
      .eq('id', accountId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating account:', error)
    return null
  }
}

export const deleteAccount = async (accountId) => {
  try {
    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', accountId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting account:', error)
    return false
  }
}

// ==========================================
// GOVERNMENT ACCOUNTS FUNCTIONS
// ==========================================

export const getGovernmentAccounts = async (familyId) => {
  try {
    const { data, error } = await supabase
      .from('government_accounts')
      .select('*')
      .eq('family_id', familyId)
      .order('due_date', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching government accounts:', error)
    return []
  }
}

export const createGovernmentAccount = async (familyId, accountData) => {
  try {
    const { data, error } = await supabase
      .from('government_accounts')
      .insert([{
        family_id: familyId,
        ...accountData
      }])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating government account:', error)
    return null
  }
}

export const updateGovernmentAccount = async (accountId, updates) => {
  try {
    const { data, error } = await supabase
      .from('government_accounts')
      .update(updates)
      .eq('id', accountId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating government account:', error)
    return null
  }
}

export const deleteGovernmentAccount = async (accountId) => {
  try {
    const { error } = await supabase
      .from('government_accounts')
      .delete()
      .eq('id', accountId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting government account:', error)
    return false
  }
}

// ==========================================
// REAL-TIME SUBSCRIPTIONS
// ==========================================

export const subscribeToAccounts = (familyId, year, month, callback) => {
  return supabase
    .channel(`accounts:${familyId}:${year}:${month}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'accounts',
        filter: `family_id=eq.${familyId}`
      },
      callback
    )
    .subscribe()
}

export const unsubscribeFromAccounts = (subscription) => {
  if (subscription) {
    supabase.removeChannel(subscription)
  }
}
