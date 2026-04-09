import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DespesasFixasModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [despesas, setDespesas] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria: 'habitação',
    dia_vencimento: '10'
  })

  useEffect(() => {
    const stored = localStorage.getItem(`despesasFixas_${selectedPerson}`)
    if (stored) {
      setDespesas(JSON.parse(stored))
    } else {
      setDespesas([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`despesasFixas_${selectedPerson}`, JSON.stringify(despesas))
  }, [despesas, selectedPerson])

  const handleAdd = () => {
    if (formData.descricao && formData.valor) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        dia_vencimento: parseInt(formData.dia_vencimento),
        ativa: true
      }
      setDespesas([...despesas, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = despesas.find(d => d.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        valor: item.valor.toString(),
        categoria: item.categoria,
        dia_vencimento: item.dia_vencimento.toString()
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.valor && editingId) {
      setDespesas(despesas.map(d => d.id === editingId ? {
        ...d,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        categoria: formData.categoria,
        dia_vencimento: parseInt(formData.dia_vencimento)
      } : d))
      resetForm()
    }
  }

  const handleToggle = (id) => {
    setDespesas(despesas.map(d => d.id === id ? {...d, ativa: !d.ativa} : d))
  }

  const handleDelete = (id) => {
    setDespesas(despesas.filter(d => d.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor: '',
      categoria: 'habitação',
      dia_vencimento: '10'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalDespesas = despesas.filter(d => d.ativa).reduce((sum, d) => sum + d.valor, 0)
  const categorias = {
    habitação: '🏠',
    alimentação: '🍔',
    transporte: '🚗',
    saúde: '❤️',
    educação: '📚',
    utilities: '💡',
    outros: '📌'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📋</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Despesas Fixas</h2>
            <p className="text-sm text-gray-400">Gerencie suas despesas mensais</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Nova Despesa
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

      <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
        <p className="text-sm text-orange-300 mb-2">Total Mensal - {selectedPerson}</p>
        <p className="text-3xl font-bold text-orange-400">R$ {formatarMoeda(totalDespesas)}</p>
      </div>

      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Despesa' : 'Nova Despesa Fixa'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="ex: Aluguel"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {Object.entries(categorias).map(([key, emoji]) => (
                  <option key={key} value={key}>{emoji} {key}</option>
                ))}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Dia de Vencimento</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.dia_vencimento}
                onChange={(e) => setFormData({...formData, dia_vencimento: e.target.value})}
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

      <div className="space-y-3">
        {despesas.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma despesa fixa cadastrada para {selectedPerson}
          </div>
        ) : (
          despesas.map(d => (
            <div
              key={d.id}
              className={`bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:bg-gray-800 transition ${
                !d.ativa ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={d.ativa}
                  onChange={() => handleToggle(d.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <div>
                  <p className={`font-semibold ${!d.ativa ? 'line-through text-gray-500' : 'text-white'}`}>
                    {categorias[d.categoria]} {d.descricao}
                  </p>
                  <p className="text-xs text-gray-400">Vence no dia {d.dia_vencimento}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-red-400 text-lg">R$ {formatarMoeda(d.valor)}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(d.id)} className="text-lg hover:scale-110 transition">✏️</button>
                  <button onClick={() => handleDelete(d.id)} className="text-lg hover:scale-110 transition">🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
