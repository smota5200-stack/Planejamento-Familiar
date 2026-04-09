import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CreditCardsModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [cards, setCards] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    credit_limit: '',
    closing_day: '30',
    due_day: '10',
    color: '#6366F1'
  })

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`cartoes_${selectedPerson}`)
    if (stored) {
      setCards(JSON.parse(stored))
    } else {
      setCards([])
    }
  }, [selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`cartoes_${selectedPerson}`, JSON.stringify(cards))
  }, [cards, selectedPerson])

  const handleAddCard = () => {
    if (formData.name && formData.bank && formData.credit_limit) {
      const newCard = {
        id: Date.now(),
        name: formData.name,
        bank: formData.bank,
        credit_limit: parseFloat(formData.credit_limit),
        closing_day: parseInt(formData.closing_day),
        due_day: parseInt(formData.due_day),
        color: formData.color,
        is_active: true
      }
      setCards([...cards, newCard])
      resetForm()
    }
  }

  const handleEditCard = (id) => {
    const card = cards.find(c => c.id === id)
    if (card) {
      setFormData({
        name: card.name,
        bank: card.bank,
        credit_limit: card.credit_limit.toString(),
        closing_day: card.closing_day.toString(),
        due_day: card.due_day.toString(),
        color: card.color
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdateCard = () => {
    if (formData.name && formData.bank && formData.credit_limit && editingId) {
      setCards(cards.map(c => c.id === editingId ? {
        ...c,
        name: formData.name,
        bank: formData.bank,
        credit_limit: parseFloat(formData.credit_limit),
        closing_day: parseInt(formData.closing_day),
        due_day: parseInt(formData.due_day),
        color: formData.color
      } : c))
      resetForm()
    }
  }

  const handleDeleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      bank: '',
      credit_limit: '',
      closing_day: '30',
      due_day: '10',
      color: '#6366F1'
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalLimit = cards.reduce((sum, card) => sum + (card.credit_limit || 0), 0)
  const colors = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#EC4899']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Meus Cartões de Crédito</h2>
            <p className="text-sm text-gray-400">Gerencie seus cartões de crédito</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
        >
          + Novo Cartão
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

      {/* Resumo de Limite Total */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
        <p className="text-sm text-blue-300 mb-2">Limite Total Disponível - {selectedPerson}</p>
        <p className="text-3xl font-bold text-blue-400">R$ {formatarMoeda(totalLimit)}</p>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Cartão' : 'Adicionar Novo Cartão'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Cartão</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="ex: Meu Cartão"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Banco</label>
              <input
                type="text"
                value={formData.bank}
                onChange={(e) => setFormData({...formData, bank: e.target.value})}
                placeholder="ex: Nubank"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Limite (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.credit_limit}
                onChange={(e) => setFormData({...formData, credit_limit: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dia de Fechamento</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.closing_day}
                onChange={(e) => setFormData({...formData, closing_day: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dia de Vencimento</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.due_day}
                onChange={(e) => setFormData({...formData, due_day: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cor</label>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({...formData, color})}
                    className={`w-8 h-8 rounded-full transition ${formData.color === color ? 'ring-2 ring-white' : ''}`}
                    style={{backgroundColor: color}}
                  />
                ))}
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
              onClick={editingId ? handleUpdateCard : handleAddCard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Grid de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8 bg-gray-900 rounded-lg border border-gray-800">
            Nenhum cartão cadastrado para {selectedPerson}
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className="relative h-40 rounded-lg p-6 text-white overflow-hidden"
              style={{backgroundColor: card.color}}
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs opacity-80">Cartão de Crédito</p>
                  <h3 className="text-lg font-bold">{card.name}</h3>
                </div>

                <div className="space-y-2">
                  {card.bank && (
                    <p className="text-sm opacity-80">{card.bank}</p>
                  )}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75">Limite</p>
                      <p className="font-bold">R$ {formatarMoeda(card.credit_limit)}</p>
                    </div>
                    <div className="text-right text-xs opacity-75">
                      <p>Fecha: {card.closing_day}</p>
                      <p>Vence: {card.due_day}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                  onClick={() => handleEditCard(card.id)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition"
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
