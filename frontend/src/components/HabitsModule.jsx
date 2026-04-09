import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function HabitsModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [habits, setHabits] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'saúde',
    frequencia: 'diário',
    meta_dias: '30'
  })

  useEffect(() => {
    const stored = localStorage.getItem(`habitos_${selectedPerson}`)
    if (stored) {
      setHabits(JSON.parse(stored))
    } else {
      setHabits([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`habitos_${selectedPerson}`, JSON.stringify(habits))
  }, [habits, selectedPerson])

  const handleAdd = () => {
    if (formData.titulo) {
      const newHabit = {
        id: Date.now(),
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        frequencia: formData.frequencia,
        meta_dias: parseInt(formData.meta_dias),
        dias_consecutivos: 0,
        data_inicio: new Date().toISOString().split('T')[0],
        concluido: false
      }
      setHabits([...habits, newHabit])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const habit = habits.find(h => h.id === id)
    if (habit) {
      setFormData({
        titulo: habit.titulo,
        descricao: habit.descricao,
        categoria: habit.categoria,
        frequencia: habit.frequencia,
        meta_dias: habit.meta_dias.toString()
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.titulo && editingId) {
      setHabits(habits.map(h => h.id === editingId ? {
        ...h,
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        frequencia: formData.frequencia,
        meta_dias: parseInt(formData.meta_dias)
      } : h))
      resetForm()
    }
  }

  const handleToggle = (id) => {
    setHabits(habits.map(h => h.id === id ? {...h, concluido: !h.concluido} : h))
  }

  const handleDelete = (id) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'saúde',
      frequencia: 'diário',
      meta_dias: '30'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const categorias = { saúde: '❤️', aprendizado: '📚', fitness: '💪', financeiro: '💰', produtividade: '⚡' }
  const frequencias = ['diário', 'semanal', 'mensal']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Meus Hábitos</h2>
            <p className="text-sm text-gray-400">Construa hábitos positivos</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Hábito
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
            {editingId ? 'Editar Hábito' : 'Novo Hábito'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="ex: Exercícios"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Frequência</label>
              <select
                value={formData.frequencia}
                onChange={(e) => setFormData({...formData, frequencia: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {frequencias.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Meta (dias)</label>
              <input
                type="number"
                value={formData.meta_dias}
                onChange={(e) => setFormData({...formData, meta_dias: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <textarea
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="Mais detalhes sobre o hábito"
                rows="2"
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
        {habits.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum hábito cadastrado para {selectedPerson}
          </div>
        ) : (
          habits.map(habit => (
            <div
              key={habit.id}
              className={`bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-start justify-between transition ${
                habit.concluido ? 'opacity-60' : ''
              }`}
            >
              <div className="flex gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={habit.concluido}
                  onChange={() => handleToggle(habit.id)}
                  className="w-5 h-5 mt-1 cursor-pointer"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm ${habit.concluido ? 'line-through text-gray-500' : 'text-white'}`}>
                    {categorias[habit.categoria]} {habit.titulo}
                  </h3>
                  {habit.descricao && <p className="text-xs text-gray-400 mt-1">{habit.descricao}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">{habit.frequencia}</span>
                    <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">Meta: {habit.meta_dias} dias</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(habit.id)}
                  className="text-lg hover:scale-110 transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(habit.id)}
                  className="text-lg hover:scale-110 transition"
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
