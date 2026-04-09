import { useState, useEffect } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function MinhasMetasFinanceirasModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [metas, setMetas] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valor_meta: '',
    valor_economizado: '',
    prazo_mes: '',
    prazo_ano: new Date().getFullYear().toString()
  })

  useEffect(() => {
    const stored = localStorage.getItem(`metas_${selectedPerson}`)
    if (stored) {
      setMetas(JSON.parse(stored))
    } else {
      setMetas([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`metas_${selectedPerson}`, JSON.stringify(metas))
  }, [metas, selectedPerson])

  const handleAdd = () => {
    if (formData.titulo && formData.valor_meta) {
      const newItem = {
        id: Date.now(),
        titulo: formData.titulo,
        descricao: formData.descricao,
        valor_meta: parseFloat(formData.valor_meta),
        valor_economizado: formData.valor_economizado ? parseFloat(formData.valor_economizado) : 0,
        prazo_mes: formData.prazo_mes ? parseInt(formData.prazo_mes) : null,
        prazo_ano: parseInt(formData.prazo_ano)
      }
      setMetas([...metas, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = metas.find(m => m.id === id)
    if (item) {
      setFormData({
        titulo: item.titulo,
        descricao: item.descricao,
        valor_meta: item.valor_meta.toString(),
        valor_economizado: item.valor_economizado.toString(),
        prazo_mes: item.prazo_mes?.toString() || '',
        prazo_ano: item.prazo_ano.toString()
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.titulo && formData.valor_meta && editingId) {
      setMetas(metas.map(m => m.id === editingId ? {
        ...m,
        titulo: formData.titulo,
        descricao: formData.descricao,
        valor_meta: parseFloat(formData.valor_meta),
        valor_economizado: formData.valor_economizado ? parseFloat(formData.valor_economizado) : 0,
        prazo_mes: formData.prazo_mes ? parseInt(formData.prazo_mes) : null,
        prazo_ano: parseInt(formData.prazo_ano)
      } : m))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setMetas(metas.filter(m => m.id !== id))
  }

  const resetForm = () => {
    setFormData({
      titulo: '',
      descricao: '',
      valor_meta: '',
      valor_economizado: '',
      prazo_mes: '',
      prazo_ano: new Date().getFullYear().toString()
    })
    setShowForm(false)
    setEditingId(null)
  }

  const calcularProgresso = (economizado, meta) => {
    return meta > 0 ? Math.min((economizado / meta) * 100, 100) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Minhas Metas Financeiras</h2>
            <p className="text-sm text-gray-400">Acompanhe suas metas de economia</p>
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
            {editingId ? 'Editar Meta' : 'Nova Meta Financeira'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Título da Meta</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                placeholder="ex: Viagem para Paris"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="Detalhes da meta"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor da Meta (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valor_meta}
                onChange={(e) => setFormData({...formData, valor_meta: e.target.value})}
                placeholder="5000.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Já Economizado (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.valor_economizado}
                onChange={(e) => setFormData({...formData, valor_economizado: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mês Alvo</label>
              <select
                value={formData.prazo_mes}
                onChange={(e) => setFormData({...formData, prazo_mes: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="">Sem prazo</option>
                {Array.from({length: 12}, (_, i) => (
                  <option key={i+1} value={i+1}>{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][i]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ano Alvo</label>
              <input
                type="number"
                value={formData.prazo_ano}
                onChange={(e) => setFormData({...formData, prazo_ano: e.target.value})}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metas.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma meta cadastrada
          </div>
        ) : (
          metas.map(meta => {
            const progresso = calcularProgresso(meta.valor_economizado, meta.valor_meta)
            return (
              <div key={meta.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{meta.titulo}</h3>
                    {meta.descricao && <p className="text-xs text-gray-400 mt-1">{meta.descricao}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(meta.id)}
                      className="text-lg hover:scale-110 transition"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(meta.id)}
                      className="text-lg hover:scale-110 transition"
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progresso</span>
                    <span className="text-blue-400 font-medium">{progresso.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{width: `${progresso}%`}}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>R$ {formatarMoeda(meta.valor_economizado)}</span>
                    <span>R$ {formatarMoeda(meta.valor_meta)}</span>
                  </div>
                  {meta.prazo_mes && (
                    <p className="text-xs text-gray-500 mt-2">
                      Prazo: {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][meta.prazo_mes - 1]} de {meta.prazo_ano}
                    </p>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
