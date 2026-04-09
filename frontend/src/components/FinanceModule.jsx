import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FinanceModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [finances, setFinances] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    tipo: 'entrada',
    valor: '',
    categoria: 'geral',
    data: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    const stored = localStorage.getItem(`financeiro_${selectedPerson}`)
    if (stored) {
      setFinances(JSON.parse(stored))
    } else {
      setFinances([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`financeiro_${selectedPerson}`, JSON.stringify(finances))
  }, [finances, selectedPerson])

  const handleAdd = () => {
    if (formData.descricao && formData.valor) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        data: formData.data
      }
      setFinances([...finances, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = finances.find(f => f.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        tipo: item.tipo,
        valor: item.valor.toString(),
        categoria: item.categoria,
        data: item.data
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.valor && editingId) {
      setFinances(finances.map(f => f.id === editingId ? {
        ...f,
        descricao: formData.descricao,
        tipo: formData.tipo,
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        data: formData.data
      } : f))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setFinances(finances.filter(f => f.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      tipo: 'entrada',
      valor: '',
      categoria: 'geral',
      data: new Date().toISOString().split('T')[0]
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalEntradas = finances.filter(f => f.tipo === 'entrada').reduce((sum, f) => sum + f.valor, 0)
  const totalSaidas = finances.filter(f => f.tipo === 'saída').reduce((sum, f) => sum + f.valor, 0)
  const saldo = totalEntradas - totalSaidas

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Financeiro</h2>
            <p className="text-sm text-gray-400">Controle suas finanças</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Novo
        </button>
      </div>

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

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <p className="text-sm text-gray-400 mb-1">Entradas</p>
          <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(totalEntradas)}</p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <p className="text-sm text-gray-400 mb-1">Saídas</p>
          <p className="text-2xl font-bold text-red-400">R$ {formatarMoeda(totalSaidas)}</p>
        </div>
        <div className={`rounded-lg border p-4 ${
          saldo >= 0 ? 'bg-green-900 border-green-700' : 'bg-red-900 border-red-700'
        }`}>
          <p className="text-sm text-gray-300 mb-1">Saldo</p>
          <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            R$ {formatarMoeda(saldo)}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Transação' : 'Nova Transação'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="ex: Salário"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="entrada">Entrada</option>
                <option value="saída">Saída</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
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
              onClick={editingId ? handleUpdate : handleAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {finances.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma transação para {selectedPerson}
          </div>
        ) : (
          finances.map(item => (
            <div key={item.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
              <div className="flex-1">
                <p className="font-semibold text-white">{item.descricao}</p>
                <p className="text-xs text-gray-400">{item.data}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-bold text-lg ${item.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.tipo === 'entrada' ? '+' : '-'} R$ {formatarMoeda(item.valor)}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item.id)} className="text-lg hover:scale-110 transition">✏️</button>
                  <button onClick={() => handleDelete(item.id)} className="text-lg hover:scale-110 transition">🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
