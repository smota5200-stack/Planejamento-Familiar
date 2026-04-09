import { useState, useEffect } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function MeuCofrinhoModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [economias, setEconomias] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: ''
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`cofrinho_${selectedPerson}`)
    if (stored) {
      setEconomias(JSON.parse(stored))
    } else {
      setEconomias([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`cofrinho_${selectedPerson}`, JSON.stringify(economias))
  }, [economias, selectedPerson])

  const handleAdd = () => {
    if (formData.descricao && formData.valor && formData.data) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data
      }
      setEconomias([...economias, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = economias.find(e => e.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        valor: item.valor.toString(),
        data: item.data
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.valor && formData.data && editingId) {
      setEconomias(economias.map(e => e.id === editingId ? {
        ...e,
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        data: formData.data
      } : e))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setEconomias(economias.filter(e => e.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor: '',
      data: ''
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalEconomias = economias.reduce((sum, e) => sum + e.valor, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏦</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Meu Cofrinho</h2>
            <p className="text-sm text-gray-400">Acompanhe suas economias</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
        >
          + Adicionar Economia
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
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {pessoa}
          </button>
        ))}
      </div>

      {/* Total Economizado */}
      <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
        <p className="text-sm text-green-300 mb-2">Total Economizado - {selectedPerson}</p>
        <p className="text-4xl font-bold text-green-400">R$ {formatarMoeda(totalEconomias)}</p>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Economia' : 'Nova Economia'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="ex: Dinheiro guardado"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                />
              </div>
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
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {economias.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma economia registrada para {selectedPerson}
          </div>
        ) : (
          economias.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{item.descricao}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(item.data).toLocaleDateString('pt-BR')} - R$ {formatarMoeda(item.valor)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition text-xl"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition text-xl"
                  title="Deletar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
