import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function GanhosModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [ganhos, setGanhos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    tipo: 'salário'
  })

  useEffect(() => {
    const stored = localStorage.getItem(`ganhos_${selectedPerson}`)
    if (stored) {
      setGanhos(JSON.parse(stored))
    } else {
      setGanhos([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`ganhos_${selectedPerson}`, JSON.stringify(ganhos))
  }, [ganhos, selectedPerson])

  const handleAdd = () => {
    if (formData.descricao && formData.valor) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        tipo: formData.tipo,
        data: new Date().toISOString().split('T')[0]
      }
      setGanhos([...ganhos, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = ganhos.find(g => g.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        valor: item.valor.toString(),
        tipo: item.tipo
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.valor && editingId) {
      setGanhos(ganhos.map(g => g.id === editingId ? {
        ...g,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        tipo: formData.tipo
      } : g))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setGanhos(ganhos.filter(g => g.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor: '',
      tipo: 'salário'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalGanhos = ganhos.reduce((sum, g) => sum + g.valor, 0)
  const tipos = ['salário', 'freelance', 'investimento', 'bônus', 'outros']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💰</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Meus Ganhos</h2>
            <p className="text-sm text-gray-400">Acompanhe todas as suas fontes de renda</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Ganho
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

      <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
        <p className="text-sm text-green-300 mb-2">Total de Ganhos - {selectedPerson}</p>
        <p className="text-3xl font-bold text-green-400">R$ {formatarMoeda(totalGanhos)}</p>
      </div>

      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Ganho' : 'Novo Ganho'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="ex: Salário Mensal"
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
                {tipos.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
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

      <div className="space-y-3">
        {ganhos.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum ganho cadastrado para {selectedPerson}
          </div>
        ) : (
          ganhos.map(g => (
            <div key={g.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-800 transition">
              <div>
                <h3 className="font-semibold text-white">{g.descricao}</h3>
                <p className="text-xs text-gray-400">📌 {g.tipo}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-green-400 text-lg">R$ {formatarMoeda(g.valor)}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(g.id)} className="text-lg hover:scale-110 transition">✏️</button>
                  <button onClick={() => handleDelete(g.id)} className="text-lg hover:scale-110 transition">🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
