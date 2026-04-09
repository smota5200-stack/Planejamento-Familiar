import { useState, useEffect } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function WishlistModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [desejos, setDesejos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    item: '',
    prioridade: 'media',
    valor_estimado: '',
    data_criacao: ''
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`wishlist_${selectedPerson}`)
    if (stored) {
      setDesejos(JSON.parse(stored))
    } else {
      setDesejos([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`wishlist_${selectedPerson}`, JSON.stringify(desejos))
  }, [desejos, selectedPerson])

  const handleAdd = () => {
    if (formData.item && formData.valor_estimado && formData.data_criacao) {
      const newItem = {
        id: Date.now(),
        item: formData.item,
        prioridade: formData.prioridade,
        valor_estimado: parseFloat(formData.valor_estimado),
        data_criacao: formData.data_criacao,
        conseguido: false
      }
      setDesejos([...desejos, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = desejos.find(d => d.id === id)
    if (item) {
      setFormData({
        item: item.item,
        prioridade: item.prioridade,
        valor_estimado: item.valor_estimado.toString(),
        data_criacao: item.data_criacao
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.item && formData.valor_estimado && formData.data_criacao && editingId) {
      setDesejos(desejos.map(d => d.id === editingId ? {
        ...d,
        item: formData.item,
        prioridade: formData.prioridade,
        valor_estimado: parseFloat(formData.valor_estimado),
        data_criacao: formData.data_criacao
      } : d))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setDesejos(desejos.filter(d => d.id !== id))
  }

  const toggleConseguido = (id) => {
    setDesejos(desejos.map(d => d.id === id ? {...d, conseguido: !d.conseguido} : d))
  }

  const resetForm = () => {
    setFormData({
      item: '',
      prioridade: 'media',
      valor_estimado: '',
      data_criacao: ''
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalItens = desejos.length
  const conseguidos = desejos.filter(d => d.conseguido).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✨</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Lista de Desejos</h2>
            <p className="text-sm text-gray-400">Guarde seus desejos</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Desejo
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
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {pessoa}
          </button>
        ))}
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
          <p className="text-sm text-purple-300 mb-2">Total de Desejos</p>
          <p className="text-3xl font-bold text-purple-400">{totalItens}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg p-6 border border-pink-700">
          <p className="text-sm text-pink-300 mb-2">Conseguidos</p>
          <p className="text-3xl font-bold text-pink-400">{conseguidos}</p>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Desejo' : 'Novo Desejo'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">O que você deseja?</label>
              <input
                type="text"
                value={formData.item}
                onChange={(e) => setFormData({...formData, item: e.target.value})}
                placeholder="ex: Novo smartphone"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade</label>
                <select
                  value={formData.prioridade}
                  onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Valor Estimado (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor_estimado}
                  onChange={(e) => setFormData({...formData, valor_estimado: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
                <input
                  type="date"
                  value={formData.data_criacao}
                  onChange={(e) => setFormData({...formData, data_criacao: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
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
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {desejos.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum desejo cadastrado para {selectedPerson}
          </div>
        ) : (
          desejos.map((item) => (
            <div key={item.id} className={`rounded-lg p-4 flex items-center justify-between border ${
              item.conseguido 
                ? 'bg-green-900 border-green-700' 
                : 'bg-gray-800 border-gray-700'
            }`}>
              <div className="flex-1">
                <h3 className={`font-semibold ${item.conseguido ? 'line-through text-gray-400' : 'text-white'}`}>
                  {item.item}
                </h3>
                <p className="text-sm text-gray-400">
                  R$ {formatarMoeda(item.valor_estimado)} • {new Date(item.data_criacao).toLocaleDateString('pt-BR')}
                </p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.prioridade === 'alta' ? 'bg-red-900 text-red-200' :
                  item.prioridade === 'media' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-blue-900 text-blue-200'
                }`}>
                  {item.prioridade === 'alta' ? '🔴 Alta' : item.prioridade === 'media' ? '🟡 Média' : '🔵 Baixa'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleConseguido(item.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition text-xl"
                  title={item.conseguido ? "Desmarcar" : "Marcar como conseguido"}
                >
                  {item.conseguido ? '✅' : '☐'}
                </button>
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
