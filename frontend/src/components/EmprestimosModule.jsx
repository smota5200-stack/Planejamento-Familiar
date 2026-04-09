import { useState, useEffect } from 'react'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Taxa CELIC mensal (exemplo: 10.5% ao ano = ~0.84% ao mês)
const TAXA_CELIC_MENSAL = 0.0084

export default function EmprestimosModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [emprestimos, setEmprestimos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    descricao: '',
    valor_original: '',
    quantidade_parcelas: '48',
    taxa_adicional: '0.48',
    data_inicio: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    const stored = localStorage.getItem(`emprestimos_${selectedPerson}`)
    if (stored) {
      setEmprestimos(JSON.parse(stored))
    } else {
      setEmprestimos([])
    }
  }, [selectedPerson])

  useEffect(() => {
    localStorage.setItem(`emprestimos_${selectedPerson}`, JSON.stringify(emprestimos))
  }, [emprestimos, selectedPerson])

  // Calcular valor da parcela com CELIC + taxa adicional
  const calcularParcela = (valorOriginal, parcelas, taxaAdicional) => {
    const taxaMensalTotal = (TAXA_CELIC_MENSAL + taxaAdicional / 100)
    
    // Fórmula de PMT: P = V * [i(1+i)^n] / [(1+i)^n - 1]
    const numerador = valorOriginal * taxaMensalTotal * Math.pow(1 + taxaMensalTotal, parcelas)
    const denominador = Math.pow(1 + taxaMensalTotal, parcelas) - 1
    
    return numerador / denominador
  }

  // Calcular saldo devedor após n parcelas
  const calcularSaldoDevedor = (valorOriginal, parcelas, taxaAdicional, parcelasQuitadas) => {
    const valorParcela = calcularParcela(valorOriginal, parcelas, taxaAdicional)
    const taxaMensalTotal = (TAXA_CELIC_MENSAL + taxaAdicional / 100)
    
    let saldo = valorOriginal
    for (let i = 0; i < parcelasQuitadas; i++) {
      const juros = saldo * taxaMensalTotal
      saldo = saldo + juros - valorParcela
    }
    
    return Math.max(0, saldo)
  }

  const handleAdd = () => {
    if (formData.descricao && formData.valor_original && formData.quantidade_parcelas) {
      const newItem = {
        id: Date.now(),
        descricao: formData.descricao,
        valor_original: parseFloat(formData.valor_original),
        quantidade_parcelas: parseInt(formData.quantidade_parcelas),
        taxa_adicional: parseFloat(formData.taxa_adicional),
        data_inicio: formData.data_inicio,
        parcelas_pagas: 0
      }
      setEmprestimos([...emprestimos, newItem])
      resetForm()
    }
  }

  const handleEdit = (id) => {
    const item = emprestimos.find(e => e.id === id)
    if (item) {
      setFormData({
        descricao: item.descricao,
        valor_original: item.valor_original.toString(),
        quantidade_parcelas: item.quantidade_parcelas.toString(),
        taxa_adicional: item.taxa_adicional.toString(),
        data_inicio: item.data_inicio
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdate = () => {
    if (formData.descricao && formData.valor_original && editingId) {
      setEmprestimos(emprestimos.map(e => e.id === editingId ? {
        ...e,
        descricao: formData.descricao,
        valor_original: parseFloat(formData.valor_original),
        quantidade_parcelas: parseInt(formData.quantidade_parcelas),
        taxa_adicional: parseFloat(formData.taxa_adicional),
        data_inicio: formData.data_inicio
      } : e))
      resetForm()
    }
  }

  const handleDelete = (id) => {
    setEmprestimos(emprestimos.filter(e => e.id !== id))
  }

  const handleIncrementParcela = (id) => {
    setEmprestimos(emprestimos.map(e => 
      e.id === id && e.parcelas_pagas < e.quantidade_parcelas
        ? { ...e, parcelas_pagas: e.parcelas_pagas + 1 }
        : e
    ))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor_original: '',
      quantidade_parcelas: '48',
      taxa_adicional: '0.48',
      data_inicio: new Date().toISOString().split('T')[0]
    })
    setShowForm(false)
    setEditingId(null)
  }

  const totalEmprestimos = emprestimos.reduce((sum, e) => sum + e.valor_original, 0)
  const totalSaldoDevedor = emprestimos.reduce((sum, e) => {
    return sum + calcularSaldoDevedor(e.valor_original, e.quantidade_parcelas, e.taxa_adicional, e.parcelas_pagas)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Empréstimos</h2>
            <p className="text-sm text-gray-400">Gerencie seus empréstimos e financiamentos</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
        >
          + Novo Empréstimo
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
          <p className="text-sm text-purple-300 mb-2">Total Emprestado</p>
          <p className="text-3xl font-bold text-purple-400">R$ {formatarMoeda(totalEmprestimos)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <p className="text-sm text-red-300 mb-2">Saldo Devedor</p>
          <p className="text-3xl font-bold text-red-400">R$ {formatarMoeda(totalSaldoDevedor)}</p>
        </div>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Empréstimo' : 'Novo Empréstimo'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Descrição (ex: Empréstimo Pessoal)"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Valor Original"
              value={formData.valor_original}
              onChange={(e) => setFormData({...formData, valor_original: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Quantidade de Parcelas"
              value={formData.quantidade_parcelas}
              onChange={(e) => setFormData({...formData, quantidade_parcelas: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              type="number"
              placeholder="Taxa Adicional (%)"
              step="0.01"
              value={formData.taxa_adicional}
              onChange={(e) => setFormData({...formData, taxa_adicional: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <input
              type="date"
              value={formData.data_inicio}
              onChange={(e) => setFormData({...formData, data_inicio: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Atualizar
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Adicionar
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Lista de Empréstimos */}
      {emprestimos.length === 0 ? (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-12 text-center">
          <p className="text-gray-400">Nenhum empréstimo registrado para {selectedPerson}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {emprestimos.map((emp) => {
            const valorParcela = calcularParcela(emp.valor_original, emp.quantidade_parcelas, emp.taxa_adicional)
            const saldoDevedor = calcularSaldoDevedor(emp.valor_original, emp.quantidade_parcelas, emp.taxa_adicional, emp.parcelas_pagas)
            const percentualQuitado = (emp.parcelas_pagas / emp.quantidade_parcelas) * 100

            return (
              <div
                key={emp.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{emp.descricao}</h3>
                    <p className="text-sm text-gray-400">
                      Iniciado em {new Date(emp.data_inicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition text-xl"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="p-2 hover:bg-red-700 rounded-lg transition text-xl"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Valor Original</p>
                    <p className="font-bold text-white">R$ {formatarMoeda(emp.valor_original)}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Valor Parcela</p>
                    <p className="font-bold text-white">R$ {formatarMoeda(valorParcela)}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Saldo Devedor</p>
                    <p className="font-bold text-red-400">R$ {formatarMoeda(saldoDevedor)}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Taxa Total</p>
                    <p className="font-bold text-blue-400">
                      {(TAXA_CELIC_MENSAL * 100 + emp.taxa_adicional).toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Progresso de Parcelas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">
                      Parcelas: {emp.parcelas_pagas}/{emp.quantidade_parcelas}
                    </p>
                    <p className="text-sm text-gray-400">{percentualQuitado.toFixed(1)}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{ width: `${percentualQuitado}%` }}
                    />
                  </div>
                </div>

                {/* Botão Pagar Parcela */}
                {emp.parcelas_pagas < emp.quantidade_parcelas && (
                  <button
                    onClick={() => handleIncrementParcela(emp.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 rounded-lg transition"
                  >
                    ✓ Registrar Parcela Paga ({emp.parcelas_pagas + 1}/{emp.quantidade_parcelas})
                  </button>
                )}

                {emp.parcelas_pagas === emp.quantidade_parcelas && (
                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-center">
                    <p className="text-green-400 font-bold">✓ Empréstimo Quitado!</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
