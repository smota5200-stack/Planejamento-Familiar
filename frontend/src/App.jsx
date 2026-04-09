import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [family, setFamily] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Verificar se está logado no localStorage
        const savedUser = localStorage.getItem('sb-user')
        
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setUser(user)
          
          // Criar família fake para demo
          setFamily({
            id: 'family-demo',
            name: 'Minha Família'
          })
        }

        // Verificar se já viu boas-vindas
        const welcomed = localStorage.getItem('welcomed')
        if (welcomed) {
          setShowWelcome(false)
        }
      } catch (error) {
        console.error('[App] Init error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
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

  return (
    <Routes>
      <Route 
        path="*" 
        element={
          <div className="min-h-screen bg-bg text-text">
            {showWelcome && user === null ? (
              <Welcome onEnter={handleWelcomeEnd} />
            ) : user ? (
              <Dashboard user={user} family={family} />
            ) : (
              <Login />
            )}
          </div>
        } 
      />
    </Routes>
  )
}

export default App

