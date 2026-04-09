import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FamilyLogo from '../components/FamilyLogo'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('smota5200@gmail.com')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios')
      }

      // Credencial válida
      if (email === 'smota5200@gmail.com' && password === '123456') {
        // Salvar sessão local
        const userData = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('sb-user', JSON.stringify(userData))
        localStorage.setItem('user-logged-in', 'true')
        
        // Navegar para dashboard
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 300)
      } else {
        throw new Error('Email ou senha incorretos. Use: smota5200@gmail.com / 123456')
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="w-32 h-32 bg-white rounded-3xl p-6 shadow-lg mb-8 flex items-center justify-center">
          <FamilyLogo classname="w-full h-full" />
        </div>
        <h1 
          className="text-7xl font-bold mb-3"
          style={{ fontFamily: "'Quicksand', sans-serif", color: '#a78bfa' }}
        >
          Motta
        </h1>
        <p className="text-gray-500 text-lg font-medium">Planejamento Familiar</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-slate-800/50 border border-slate-700/50 rounded-3xl p-10 shadow-2xl backdrop-blur-sm">
        <h2 
          className="text-3xl font-bold text-white mb-10"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Bem-vindo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-3 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700/60 border border-slate-600/50 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-3 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700/60 border border-slate-600/50 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
              placeholder="sua senha"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105 shadow-lg shadow-purple-500/30"
            style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '16px", fontWeight: 700 }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg text-blue-300 text-sm text-center">
          📝 Demo: <strong>smota5200@gmail.com</strong> / <strong>123456</strong>
        </div>
      </div>

      <p className="text-gray-600 text-sm mt-12 text-center">
        Organize sua vida financeira em família
      </p>
    </div>
  )
}

