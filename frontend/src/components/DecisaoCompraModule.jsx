import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DecisaoCompraModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [compras, setCompras] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    produto: '',
    preco: '',
    data_desejada: '',
    motivo: '',
    decisao: 'analisando'
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`decisao_compra_${selectedPerson}`)
    if (stored) {
      setCompras(JSON.parse(stored))
    } else {
      setCompras([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`decisao_compra_${selectedPerson}`, JSON.stringify(compras))
  }, [compras, selectedPerson])

  const handleAdd = () => {
    if (formData.produto && formData.preco && formData.data_desejada) {
      const newItem = {
        id: Date.now(),
        produto: formData.produto,
        preco: parseFloat(formData.preco),
        data_desejada: formData.data_desejada,
        motivo: formData.motivo,
        decisao: formData.decisao,
        data_criacao: new Date().toISOString()
      }
      setCompras([...compras, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = compras.find(c => c.id === id)
    if (item) {
      setFormData({
        produto: item.produto,
        preco: item.preco.toString(),
        data_desejada: item.data_desejada,
        motivo: item.motivo,
        decisao: item.decisao
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.produto && formData.preco && formData.data_desejada && editingId) {
      setCompras(compras.map(c => c.id === editingId ? {
        ...c,
        produto: formData.produto,
        preco: parseFloat(formData.preco),
        data_desejada: formData.data_desejada,
        motivo: formData.motivo,
        decisao: formData.decisao
      } : c))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setCompras(compras.filter(c => c.id !== id))
  }

  const resetForm = () => {
    setFormData({
      produto: '',
      preco: '',
      data_desejada: '',
      motivo: '',
      decisao: 'analisando'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const compradas = compras.filter(c => c.decisao === 'comprado')
  const rejeitadas = compras.filter(c => c.decisao === 'rejeitado')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛍️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Decisão de Compra</h2>
            <p className="text-sm text-gray-400">Analise seus desejos de compra</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          + Analisar Compra
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
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {pessoa}
          </button>
        ))}
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-lg p-6 border border-indigo-700">
          <p className="text-sm text-indigo-300 mb-2">Em Análise</p>
          <p className="text-3xl font-bold text-indigo-400">{compras.filter(c => c.decisao === 'analisando').length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <p className="text-sm text-green-300 mb-2">Compradas</p>
          <p className="text-3xl font-bold text-green-400">{compradas.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <p className="text-sm text-red-300 mb-2">Rejeitadas</p>
          <p className="text-3xl font-bold text-red-400">{rejeitadas.length}</p>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Análise' : 'Analisar Nova Compra'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Produto</label>
              <input
                type="text"
                value={formData.produto}
                onChange={(e) => setFormData({...formData, produto: e.target.value})}
                placeholder="ex: Monitor 27 polegadas"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => setFormData({...formData, preco: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data Desejada</label>
                <input
                  type="date"
                  value={formData.data_desejada}
                  onChange={(e) => setFormData({...formData, data_desejada: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Motivo</label>
              <textarea
                value={formData.motivo}
                onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                placeholder="Por que quer fazer essa compra?"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Decisão</label>
              <select
                value={formData.decisao}
                onChange={(e) => setFormData({...formData, decisao: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="analisando">📊 Analisando</option>
                <option value="comprado">✅ Comprado</option>
                <option value="rejeitado">❌ Rejeitado</option>
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
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {compras.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhuma análise de compra para {selectedPerson}
          </div>
        ) : (
          compras.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.produto}</h3>
                  <p className="text-sm text-gray-400">R$ {formatarMoeda(item.preco)}</p>
                  {item.motivo && (
                    <p className="text-sm text-gray-500 mt-2">💭 {item.motivo}</p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.decisao === 'analisando' ? 'bg-indigo-900 text-indigo-200' :
                      item.decisao === 'comprado' ? 'bg-green-900 text-green-200' :
                      'bg-red-900 text-red-200'
                    }`}>
                      {item.decisao === 'analisando' ? '📊 Analisando' : item.decisao === 'comprado' ? '✅ Comprado' : '❌ Rejeitado'}
                    </span>
                  </div>
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
            </div>
          ))
        )}
      </div>
    </div>
  )
}
