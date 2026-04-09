import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FamilyLogo from '../components/FamilyLogo'
import { signIn, signUp, getCurrentUser } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('smota5200@gmail.com')
  const [password, setPassword] = useState('123456')
  const [fullName, setFullName] = useState('Usuário')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  // Verificar se já está logado
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser()
      if (user) {
        navigate('/')
      }
      setChecking(false)
    }
    checkAuth()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios')
      }

      let result
      if (isLogin) {
        // Login
        result = await signIn(email, password)
      } else {
        // Signup
        if (!fullName) {
          throw new Error('Nome é obrigatório')
        }
        result = await signUp(email, password)
      }

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        // Sucesso!
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 500)
      }
    } catch (err) {
      setError(err.message || 'Erro ao fazer login')
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-gray-400">Verificando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo Section */}
      <div className="text-center mb-16 flex flex-col items-center">
        {/* Logo Box */}
        <div className="w-32 h-32 bg-white rounded-3xl p-6 shadow-lg mb-8 flex items-center justify-center">
          <FamilyLogo classname="w-full h-full" />
        </div>
        
        {/* Title */}
        <h1 
          className="text-7xl font-bold mb-3"
          style={{ fontFamily: "'Quicksand', sans-serif", color: '#a78bfa' }}
        >
          Motta
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-500 text-lg font-medium">Planejamento Familiar</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-slate-800/50 border border-slate-700/50 rounded-3xl p-10 shadow-2xl backdrop-blur-sm">
        {/* Card Title */}
        <h2 
          className="text-3xl font-bold text-white mb-10"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {isLogin ? 'Bem-vindo' : 'Criar Conta'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field - Signup only */}
          {!isLogin && (
            <div>
              <label className="block text-gray-400 text-sm mb-3 font-medium">Nome Completo</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-700/60 border border-slate-600/50 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
                placeholder="Ex: Sergio Motta"
                required
              />
            </div>
          )}

          {/* Email Field */}
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

          {/* Password Field */}
          <div>
            <label className="block text-gray-400 text-sm mb-3 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700/60 border border-slate-600/50 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition transform hover:scale-105 shadow-lg shadow-purple-500/30"
            style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '16px', fontWeight: 700 }}
          >
            {loading ? (isLogin ? 'Entrando...' : 'Criando Conta...') : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>

          {/* Toggle Login/Signup */}
          <div className="text-center pt-2">
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-purple-400 hover:text-purple-300 font-semibold transition"
              >
                {isLogin ? 'Criar Conta' : 'Fazer Login'}
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Footer */}
      <p className="text-gray-600 text-sm mt-12 text-center">
        Organize sua vida financeira em família
      </p>
    </div>
  )
}

