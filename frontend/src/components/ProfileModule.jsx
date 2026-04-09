import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function ProfileModule({ user, profile, onProfileUpdate }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    currency: profile?.currency || 'BRL',
    monthly_income: profile?.monthly_income || 0
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          monthly_income: parseFloat(formData.monthly_income)
        })
        .eq('id', user.id)

      if (error) throw error

      setEditing(false)
      onProfileUpdate()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Card */}
      <div className="bg-surface border border-white border-opacity-10 rounded-xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-syne mb-2">Meu Perfil</h2>
            <p className="text-muted">{user.email}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold transition"
          >
            {editing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        {!editing ? (
          <div className="space-y-4">
            <div className="pb-4 border-b border-white border-opacity-10">
              <p className="text-muted text-sm mb-1">Nome Completo</p>
              <p className="text-lg font-semibold text-text">{profile?.full_name || 'Não definido'}</p>
            </div>
            <div className="pb-4 border-b border-white border-opacity-10">
              <p className="text-muted text-sm mb-1">Moeda</p>
              <p className="text-lg font-semibold text-text">{profile?.currency || 'BRL'}</p>
            </div>
            <div>
              <p className="text-muted text-sm mb-1">Renda Mensal</p>
              <p className="text-lg font-semibold text-text">
                {profile?.currency === 'BRL' ? 'R$' : profile?.currency} {formatarMoeda(parseFloat(profile?.monthly_income || 0))}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="w-full bg-surface2 border border-white border-opacity-10 rounded-lg px-4 py-2.5 text-text placeholder-muted focus:outline-none focus:border-accent focus:border-opacity-30"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Moeda</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full bg-surface2 border border-white border-opacity-10 rounded-lg px-4 py-2.5 text-text focus:outline-none focus:border-accent focus:border-opacity-30"
              >
                <option value="BRL">Real (BRL)</option>
                <option value="USD">Dólar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">Renda Mensal</label>
              <input
                type="number"
                step="0.01"
                value={formData.monthly_income}
                onChange={(e) => setFormData({...formData, monthly_income: e.target.value})}
                className="w-full bg-surface2 border border-white border-opacity-10 rounded-lg px-4 py-2.5 text-text placeholder-muted focus:outline-none focus:border-accent focus:border-opacity-30"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent2 hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-semibold transition"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full px-6 py-3 bg-coral hover:opacity-90 text-white rounded-lg font-semibold transition"
      >
        Fazer Logout
      </button>

      {/* Account Info */}
      <div className="bg-surface border border-white border-opacity-10 rounded-xl p-6">
        <h3 className="text-lg font-bold font-syne mb-4">Informações da Conta</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Email:</span>
            <span className="text-text font-semibold">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Criado em:</span>
            <span className="text-text font-semibold">
              {new Date(user.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Último acesso:</span>
            <span className="text-text font-semibold">
              {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('pt-BR') : 'Nunca'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
