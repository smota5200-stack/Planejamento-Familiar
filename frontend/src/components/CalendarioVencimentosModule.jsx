import { useState, useEffect } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

export default function CalendarioVencimentosModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [vencimentos, setVencimentos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    data_vencimento: '',
    valor: '',
    status: 'pendente'
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`vencimentos_${selectedPerson}`)
    if (stored) {
      setVencimentos(JSON.parse(stored))
    } else {
      setVencimentos([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`vencimentos_${selectedPerson}`, JSON.stringify(vencimentos))
  }, [vencimentos, selectedPerson])

  const handleAdd = () => {
    if (formData.descricao && formData.data_vencimento && formData.valor) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        data_vencimento: formData.data_vencimento,
        valor: parseFloat(formData.valor),
        status: formData.status,
        created_at: new Date().toISOString()
      }
      setVencimentos([...vencimentos, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = vencimentos.find(v => v.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        data_vencimento: item.data_vencimento,
        valor: item.valor.toString(),
        status: item.status
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.data_vencimento && formData.valor && editingId) {
      setVencimentos(vencimentos.map(v => v.id === editingId ? {
        ...v,
        descricao: formData.descricao,
        data_vencimento: formData.data_vencimento,
        valor: parseFloat(formData.valor),
        status: formData.status
      } : v))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setVencimentos(vencimentos.filter(v => v.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      data_vencimento: '',
      valor: '',
      status: 'pendente'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const pendentes = vencimentos.filter(v => v.status === 'pendente').length
  const totalValor = vencimentos.reduce((sum, v) => sum + v.valor, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📋</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Calendário de Vencimentos</h2>
            <p className="text-sm text-gray-400">Controle seus vencimentos</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Vencimento
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

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
          <p className="text-sm text-orange-300 mb-2">Pendentes</p>
          <p className="text-3xl font-bold text-orange-400">{pendentes}</p>
        </div>
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <p className="text-sm text-red-300 mb-2">Valor Total</p>
          <p className="text-3xl font-bold text-red-400">R$ {formatarMoeda(totalValor)}</p>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Vencimento' : 'Novo Vencimento'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                placeholder="ex: Conta de água"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data de Vencimento</label>
                <input
                  type="date"
                  value={formData.data_vencimento}
                  onChange={(e) => setFormData({...formData, data_vencimento: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="atrasado">Atrasado</option>
                </select>
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {vencimentos.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum vencimento cadastrado para {selectedPerson}
          </div>
        ) : (
          vencimentos.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{item.descricao}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(item.data_vencimento).toLocaleDateString('pt-BR')} - R$ {formatarMoeda(item.valor)}
                </p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'pendente' ? 'bg-yellow-900 text-yellow-200' :
                  item.status === 'pago' ? 'bg-green-900 text-green-200' :
                  'bg-red-900 text-red-200'
                }`}>
                  {item.status === 'pendente' ? '⏳ Pendente' : item.status === 'pago' ? '✅ Pago' : '⚠️ Atrasado'}
                </span>
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
