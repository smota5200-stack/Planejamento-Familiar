import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const IS_DEMO_MODE = true

export default function Header({ user, profile }) {
  const handleLogout = async () => {
    if (IS_DEMO_MODE) {
      // Limpa dados demo
      localStorage.removeItem('sb-access-token')
      localStorage.removeItem('sb-user')
      window.location.href = '/login'
    } else {
      await supabase.auth.signOut()
    }
  }

  return (
    <header className="bg-surface border-b border-white border-opacity-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-lg">👨‍👩‍👧‍👦</span>
          </div>
          <div>
            <h1 className="text-lg font-bold font-syne text-text">
              Planejamento <span className="text-purple-400">Família</span>
            </h1>
            <p className="text-xs text-muted">Organize suas finanças em família</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {profile && (
            <div className="text-right mr-4">
              <p className="text-sm font-semibold text-text">{profile.full_name || user.email}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-coral bg-opacity-10 hover:bg-opacity-20 text-coral rounded-lg text-sm font-semibold transition"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

