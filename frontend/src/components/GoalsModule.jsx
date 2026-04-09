import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function GoalsModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [goals, setGoals] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    area: 'financeiro',
    target_value: '',
    target_date: '',
    priority: '3'
  })

  useEffect(() => {
    const stored = localStorage.getItem(`goals_${selectedPerson}`)
    if (stored) {
      setGoals(JSON.parse(stored))
    } else {
      setGoals([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`goals_${selectedPerson}`, JSON.stringify(goals))
  }, [goals, selectedPerson])

  const handleAdd = () => {
    if (formData.title && formData.target_value) {
      const newGoal = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        area: formData.area,
        target_value: parseFloat(formData.target_value),
        target_date: formData.target_date,
        priority: parseInt(formData.priority),
        created_at: new Date().toISOString()
      }
      setGoals([...goals, newGoal])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const goal = goals.find(g => g.id === id)
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        area: goal.area,
        target_value: goal.target_value.toString(),
        target_date: goal.target_date,
        priority: goal.priority.toString()
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.title && formData.target_value && editingId) {
      setGoals(goals.map(g => g.id === editingId ? {
        ...g,
        title: formData.title,
        description: formData.description,
        area: formData.area,
        target_value: parseFloat(formData.target_value),
        target_date: formData.target_date,
        priority: parseInt(formData.priority)
      } : g))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      area: 'financeiro',
      target_value: '',
      target_date: '',
      priority: '3'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const areas = ['financeiro', 'pessoal', 'profissional', 'saúde', 'educação']
  const areaEmojis = { financeiro: '💰', pessoal: '👤', profissional: '💼', saúde: '❤️', educação: '📚' }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Minhas Metas</h2>
            <p className="text-sm text-gray-400">Defina e acompanhe seus objetivos</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Nova Meta
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
            {editingId ? 'Editar Meta' : 'Nova Meta'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="ex: Comprar casa"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Área</label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{areaEmojis[area]} {area}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.target_value}
                onChange={(e) => setFormData({...formData, target_value: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data Alvo</label>
              <input
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData({...formData, target_date: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Prioridade (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detalhes sobre a meta"
                rows="3"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma meta cadastrada para {selectedPerson}
          </div>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span>{areaEmojis[goal.area]}</span>
                    <h3 className="text-white font-semibold">{goal.title}</h3>
                  </div>
                  {goal.description && <p className="text-xs text-gray-400 mt-1">{goal.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(goal.id)}
                    className="text-lg hover:scale-110 transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="text-lg hover:scale-110 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-sm">
                <span className="text-gray-400">R$ {formatarMoeda(goal.target_value)}</span>
                <span className="text-gray-400">⭐ {goal.priority}/5</span>
                {goal.target_date && <span className="text-gray-400">{goal.target_date}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
