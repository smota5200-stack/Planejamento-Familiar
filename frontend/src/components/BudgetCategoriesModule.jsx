import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const CATEGORIAS_ORCAMENTO = {
  'Casa': { icon: '🏠', limite: 5000 },
  'Profissional': { icon: '💼', limite: 500 },
  'Mercado': { icon: '🛒', limite: 1000 },
  'Farmácia e Saúde': { icon: '💊', limite: 1000 },
  'Lazer': { icon: '🎨', limite: 300 },
  'Festa': { icon: '🎉', limite: 200 },
  'Shopping': { icon: '🛍️', limite: 500 },
  'Assinatura': { icon: '📱', limite: 150 },
  'Transporte': { icon: '🚌', limite: 50 },
  'Viagem': { icon: '✈️', limite: 0 },
  'Estudos': { icon: '📚', limite: 300 },
  'Restaurante': { icon: '🍽️', limite: 1000 },
  'Uber': { icon: '🚗', limite: 100 },
  'Ifood': { icon: '🍕', limite: 150 }
}

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function BudgetCategoriesModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [orcamentos, setOrcamentos] = useState({})
  const [editingCategory, setEditingCategory] = useState(null)
  const [editValue, setEditValue] = useState('')

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`orcamentos_${selectedPerson}`)
    if (stored) {
      setOrcamentos(JSON.parse(stored))
    } else {
      // Inicializar com valores padrão
      const defaultOrcamentos = {}
      Object.keys(CATEGORIAS_ORCAMENTO).forEach(cat => {
        defaultOrcamentos[cat] = CATEGORIAS_ORCAMENTO[cat].limite
      })
      setOrcamentos(defaultOrcamentos)
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`orcamentos_${selectedPerson}`, JSON.stringify(orcamentos))
  }, [orcamentos, selectedPerson])

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setEditValue(orcamentos[category]?.toString() || CATEGORIAS_ORCAMENTO[category].limite.toString())
  }

  const handleSaveEdit = () => {
    if (editValue && editingCategory) {
      setOrcamentos({
        ...orcamentos,
        [editingCategory]: parseFloat(editValue)
      })
      setEditingCategory(null)
      setEditValue('')
    }
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setEditValue('')
  }

  const totalOrcado = Object.values(orcamentos).reduce((sum, val) => sum + (val || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💰</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Orçamento Categorias</h2>
            <p className="text-sm text-gray-400">Gerencie seus limites de gastos</p>
          </div>
        </div>
      </div>

      {/* Seletor de Pessoa */}
      <div className="flex gap-3">
        {PESSOAS.map(pessoa => (
          <button
            key={pessoa}
            onClick={() => setSelectedPerson(pessoa)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedPerson === pessoa
                ? 'bg-teal-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {pessoa}
          </button>
        ))}
      </div>

      {/* Total Orçado */}
      <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-lg p-6 border border-teal-700">
        <p className="text-sm text-teal-300 mb-2">Total Orçado - {selectedPerson}</p>
        <p className="text-4xl font-bold text-teal-400">R$ <span className="text-teal-300">{formatarMoeda(totalOrcado)}</span></p>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(CATEGORIAS_ORCAMENTO).map(([categoria, { icon }]) => (
          <div
            key={categoria}
            onClick={() => handleEditCategory(categoria)}
            className="group bg-gradient-to-br from-teal-900 to-teal-800 rounded-lg p-6 border border-teal-700 hover:border-teal-600 hover:from-teal-800 hover:to-teal-700 transition cursor-pointer shadow-lg hover:shadow-xl"
          >
            <div className="space-y-4">
              {/* Ícone */}
              <div className="text-5xl">{icon}</div>

              {/* Nome da Categoria */}
              <h3 className="text-white font-semibold text-lg group-hover:text-teal-300 transition">
                {categoria}
              </h3>

              {/* Valor */}
              {editingCategory === categoria ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    step="0.01"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                    className="w-full px-3 py-2 bg-white text-black border-2 border-teal-400 rounded-lg placeholder-gray-500 focus:border-teal-500 focus:outline-none text-center font-bold text-lg"
                    placeholder="Valor"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSaveEdit()
                      }}
                      className="flex-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded text-sm font-bold transition"
                    >
                      ✓ Salvar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCancelEdit()
                      }}
                      className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-bold transition"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-teal-300 uppercase tracking-wider font-medium">Limite</p>
                  <p className="text-3xl font-black text-white">
                    R$ <span className="text-teal-100">{formatarMoeda(orcamentos[categoria] || CATEGORIAS_ORCAMENTO[categoria].limite)}</span>
                  </p>
                </div>
              )}

              {/* Dica de Edição */}
              {editingCategory !== categoria && (
                <p className="text-xs text-teal-400 opacity-0 group-hover:opacity-100 transition">
                  Clique para editar
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <p className="text-sm text-gray-400">
          💡 <span className="text-gray-300">Clique em qualquer categoria para editar seu limite de orçamento. Os valores são salvos automaticamente.</span>
        </p>
      </div>
    </div>
  )
}
