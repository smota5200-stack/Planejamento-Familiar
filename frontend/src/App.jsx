import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import { supabase, getCurrentUser, getOrCreateFamily } from './lib/supabase'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [family, setFamily] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verificar se há usuário logado no Supabase
        const user = await getCurrentUser()
        
        if (user) {
          setUser(user)
          
          // Obter ou criar família para este usuário
          const fam = await getOrCreateFamily(user.id)
          setFamily(fam)
        } else {
          // Tentar recuperar do localStorage (para compatibilidade)
          const saved = localStorage.getItem('sb-user')
          if (saved) {
            const parsedUser = JSON.parse(saved)
            setUser(parsedUser)
          }
        }

        // Verificar se já viu boas-vindas
        const welcomed = localStorage.getItem('welcomed')
        if (welcomed) {
          setShowWelcome(false)
        }
      } catch (error) {
        console.error('Erro ao inicializar:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Escutar mudanças de autenticação
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Atualizar família quando usuário muda
        getOrCreateFamily(session.user.id).then(fam => setFamily(fam))
      } else {
        setUser(null)
        setFamily(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleWelcomeEnd = () => {
    localStorage.setItem('welcomed', 'true')
    setShowWelcome(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-text">Carregando...</p>
        </div>
      </div>
    )
  }

  if (showWelcome) {
    return <Welcome onEnter={handleWelcomeEnd} />
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {user ? <Dashboard user={user} family={family} /> : <Login />}
    </div>
  )
}

export default App

