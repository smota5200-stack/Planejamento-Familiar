import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function MuralDosSonhosModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [sonhos, setSonhos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'Geral',
    prioridade: 'Média',
    realizado: false
  })

  useEffect(() => {
    const stored = localStorage.getItem(`sonhos_${selectedPerson}`)
    if (stored) {
      setSonhos(JSON.parse(stored))
    } else {
      setSonhos([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`sonhos_${selectedPerson}`, JSON.stringify(sonhos))
  }, [sonhos, selectedPerson])

  const handleAdd = () => {
    if (formData.titulo) {
      const newItem = {
        id: Date.now(),
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        prioridade: formData.prioridade,
        realizado: false,
        data_criacao: new Date().toISOString()
      }
      setSonhos([...sonhos, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = sonhos.find(s => s.id === id)
    if (item) {
      setFormData({
        titulo: item.titulo,
        descricao: item.descricao,
        categoria: item.categoria,
        prioridade: item.prioridade,
        realizado: item.realizado
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.titulo && editingId) {
      setSonhos(sonhos.map(s => s.id === editingId ? {
        ...s,
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        prioridade: formData.prioridade,
        realizado: formData.realizado
      } : s))
      resetForm()
    }
  }

  const handleToggleRealizado = (id) => {
    setSonhos(sonhos.map(s => s.id === id ? {...s, realizado: !s.realizado} : s))
  }

  const handleDelete = (id) => {
    setSonhos(sonhos.filter(s => s.id !== id))
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'Geral',
      prioridade: 'Média',
      realizado: false
    })
    setShowForm(false)
    setEditingId(null)
  }

  const categorias = ['Geral', 'Viagem', 'Compra', 'Experiência', 'Aprendizado', 'Saúde']
  const prioridades = ['Baixa', 'Média', 'Alta']
  
  const getPrioridadeColor = (prio) => {
    if (prio === 'Alta') return 'border-red-500 bg-red-900'
    if (prio === 'Média') return 'border-yellow-500 bg-yellow-900'
    return 'border-green-500 bg-green-900'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✨</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Mural dos Sonhos</h2>
            <p className="text-sm text-gray-400">Realize seus objetivos e sonhos</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Sonho
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

      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Sonho' : 'Novo Sonho'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="ex: Aprender Espanhol"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="Descreva seu sonho em detalhes..."
                rows="3"
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
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade</label>
              <select
                value={formData.prioridade}
                onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {prioridades.map(prio => (
                  <option key={prio} value={prio}>{prio}</option>
                ))}
              </select>
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
        {sonhos.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum sonho cadastrado ainda. Comece a sonhar!
          </div>
        ) : (
          sonhos.map(sonho => (
            <div
              key={sonho.id}
              className={`bg-gray-900 border-l-4 rounded-lg p-4 transition ${
                sonho.realizado
                  ? 'border-l-green-500 opacity-60'
                  : getPrioridadeColor(sonho.prioridade)
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={sonho.realizado}
                      onChange={() => handleToggleRealizado(sonho.id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${sonho.realizado ? 'line-through text-gray-500' : 'text-white'}`}>
                        {sonho.titulo}
                      </h3>
                      {sonho.descricao && (
                        <p className="text-sm text-gray-400 mt-1">{sonho.descricao}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {sonho.categoria}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          sonho.prioridade === 'Alta' ? 'bg-red-900 text-red-300' :
                          sonho.prioridade === 'Média' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {sonho.prioridade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(sonho.id)}
                    className="text-lg hover:scale-110 transition"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(sonho.id)}
                    className="text-lg hover:scale-110 transition"
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
