import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DebtsModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [debts, setDebts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    creditor: '',
    original_amount: '',
    remaining_amount: '',
    monthly_payment: '',
    due_day: '10',
    interest_rate: '0'
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`dividas_${selectedPerson}`)
    if (stored) {
      setDebts(JSON.parse(stored))
    } else {
      setDebts([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`dividas_${selectedPerson}`, JSON.stringify(debts))
  }, [debts, selectedPerson])

  const handleAddDebt = () => {
    if (formData.creditor && formData.original_amount && formData.remaining_amount) {
      const newDebt = {
        id: Date.now(),
        creditor: formData.creditor,
        original_amount: parseFloat(formData.original_amount),
        remaining_amount: parseFloat(formData.remaining_amount),
        monthly_payment: parseFloat(formData.monthly_payment) || 0,
        interest_rate: parseFloat(formData.interest_rate) || 0,
        due_day: parseInt(formData.due_day),
        start_date: new Date().toISOString().split('T')[0],
        status: 'active'
      }
      setDebts([...debts, newDebt])
      resetForm()
    }
  }

  const handleEditDebt = (id) => {
    const debt = debts.find(d => d.id === id)
    if (debt) {
      setFormData({
        creditor: debt.creditor,
        original_amount: debt.original_amount.toString(),
        remaining_amount: debt.remaining_amount.toString(),
        monthly_payment: (debt.monthly_payment || 0).toString(),
        due_day: debt.due_day.toString(),
        interest_rate: (debt.interest_rate || 0).toString()
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdateDebt = () => {
    if (formData.creditor && formData.original_amount && formData.remaining_amount && editingId) {
      setDebts(debts.map(d => d.id === editingId ? {
        ...d,
        creditor: formData.creditor,
        original_amount: parseFloat(formData.original_amount),
        remaining_amount: parseFloat(formData.remaining_amount),
        monthly_payment: parseFloat(formData.monthly_payment) || 0,
        interest_rate: parseFloat(formData.interest_rate) || 0,
        due_day: parseInt(formData.due_day)
      } : d))
      resetForm()
    }
  }

  const handleDeleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id))
  }

  const resetForm = () => {
    setFormData({
      creditor: '',
      original_amount: '',
      remaining_amount: '',
      monthly_payment: '',
      due_day: '10',
      interest_rate: '0'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalDebt = debts.reduce((sum, debt) => sum + (debt.remaining_amount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Minhas Dívidas</h2>
            <p className="text-sm text-gray-400">Acompanhe todas as suas dívidas</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
        >
          + Nova Dívida
        </button>
      </div>

      {/* Seletor de Pessoa */}
      <div className="flex gap-3">
        {PESSOAS.map(pessoa => (
          <button
            key={pessoa}
            onClick={() => setSelectedPerson(pessoa)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedPerson === pessoa
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {pessoa}
          </button>
        ))}
      </div>

      {/* Resumo de Dívida Total */}
      <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
        <p className="text-sm text-red-300 mb-2">Dívida Total - {selectedPerson}</p>
        <p className="text-3xl font-bold text-red-400">R$ {formatarMoeda(totalDebt)}</p>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Dívida' : 'Adicionar Nova Dívida'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Credor</label>
              <input
                type="text"
                value={formData.creditor}
                onChange={(e) => setFormData({...formData, creditor: e.target.value})}
                placeholder="ex: Banco do Brasil"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor Original (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.original_amount}
                onChange={(e) => setFormData({...formData, original_amount: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor Restante (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.remaining_amount}
                onChange={(e) => setFormData({...formData, remaining_amount: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Parcela Mensal (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.monthly_payment}
                onChange={(e) => setFormData({...formData, monthly_payment: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Taxa de Juros (% ao mês)</label>
              <input
                type="number"
                step="0.01"
                value={formData.interest_rate}
                onChange={(e) => setFormData({...formData, interest_rate: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dia de Vencimento</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.due_day}
                onChange={(e) => setFormData({...formData, due_day: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => resetForm()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              onClick={editingId ? handleUpdateDebt : handleAddDebt}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Lista de Dívidas */}
      <div className="space-y-4">
        {debts.length === 0 ? (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center text-gray-500">
            Nenhuma dívida registrada para {selectedPerson}
          </div>
        ) : (
          debts.map((debt) => (
            <div key={debt.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{debt.creditor}</h3>
                  <p className="text-sm text-gray-400">Vencimento: dia {debt.due_day}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditDebt(debt.id)}
                    className="text-blue-400 hover:text-blue-300 transition text-sm"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteDebt(debt.id)}
                    className="text-red-400 hover:text-red-300 transition text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Valor Original</p>
                  <p className="font-semibold text-white">R$ {formatarMoeda(debt.original_amount || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Restante</p>
                  <p className="font-semibold text-red-400">R$ {formatarMoeda(debt.remaining_amount || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Parcela Mensal</p>
                  <p className="font-semibold text-white">R$ {formatarMoeda(debt.monthly_payment || 0)}</p>
                </div>
              </div>

              {debt.interest_rate > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-yellow-400">⚠️ Taxa de Juros: {debt.interest_rate}% ao mês</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
