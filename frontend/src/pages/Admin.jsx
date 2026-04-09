import React, { useState } from 'react'

export default function AdminPanel() {
  const [users, setUsers] = useState([
    { email: 'smota5200@gmail.com', password: '123456', status: null },
    { email: 'elainex2018@gmail.com', password: '123456', status: null }
  ])

  const updateUser = (index, field, value) => {
    const newUsers = [...users]
    newUsers[index][field] = value
    setUsers(newUsers)
  }

  const createUser = async (index) => {
    const user = users[index]
    const newUsers = [...users]
    newUsers[index].status = 'loading'
    setUsers(newUsers)

    try {
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      })

      const responseText = await response.text()
      let data

      try {
        data = JSON.parse(responseText)
      } catch (e) {
        newUsers[index].status = 'error'
        newUsers[index].message = `Erro na resposta: ${responseText.substring(0, 100)}`
        setUsers(newUsers)
        return
      }

      if (!response.ok) {
        if (response.status === 409) {
          newUsers[index].status = 'exists'
        } else {
          newUsers[index].status = 'error'
          newUsers[index].message = data.error || `Erro ${response.status}`
        }
      } else {
        newUsers[index].status = 'success'
      }
    } catch (error) {
      newUsers[index].status = 'error'
      newUsers[index].message = error.message || 'Erro de conexão'
    }

    setUsers(newUsers)
  }

  return (
    <div style={styles.container}>
      <h1>🔐 Admin - Criar Usuários</h1>
      
      <div style={styles.infoBox}>
        ℹ️ Edite os emails e senhas abaixo e clique para criar os usuários
      </div>

      {users.map((user, idx) => (
        <div key={idx} style={styles.userCard}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => updateUser(idx, 'email', e.target.value)}
              style={styles.input}
              placeholder="seu@email.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha:</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => updateUser(idx, 'password', e.target.value)}
              style={styles.input}
              placeholder="senha"
            />
          </div>

          <button
            onClick={() => createUser(idx)}
            disabled={user.status === 'loading'}
            style={{
              ...styles.button,
              opacity: user.status === 'loading' ? 0.6 : 1
            }}
          >
            {user.status === 'loading' ? '⏳ Criando...' : `Criar Usuário ${idx + 1}`}
          </button>

          {user.status === 'success' && (
            <div style={styles.success}>
              ✅ Usuário criado com sucesso!
            </div>
          )}

          {user.status === 'exists' && (
            <div style={styles.warning}>
              ⚠️ Este email já está registrado. Faça login com essas credenciais.
            </div>
          )}

          {user.status === 'error' && (
            <div style={styles.error}>
              ❌ Erro: {user.message}
            </div>
          )}
        </div>
      ))}

      <div style={styles.footer}>
        <p>
          Após criar os usuários, faça login e comece a usar o app! 🚀
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
  },
  infoBox: {
    background: '#f0f4ff',
    borderLeft: '4px solid #667eea',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '25px',
    fontSize: '14px',
    color: '#555'
  },
  userCard: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #e0e0e0'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
    fontWeight: '600',
    fontSize: '13px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  success: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    fontSize: '13px'
  },
  warning: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderRadius: '4px',
    fontSize: '13px'
  },
  error: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    fontSize: '13px'
  },
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f0f4ff',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#555',
    fontSize: '14px'
  }
}
