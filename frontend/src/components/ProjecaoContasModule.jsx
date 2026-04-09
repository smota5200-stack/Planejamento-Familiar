import { useState, useEffect } from 'react'
import { meses } from '../data/accountsData'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ProjecaoContasModule() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState('janeiro')
  const [pessoas, setPessoas] = useState(['Sergio', 'Elaine', 'Enzo'])
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [contas, setContas] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    descricao: '',
    categoria: '',
    data: '',
    valor: '',
    status: 'A pagar',
    formaPagamento: 'Dinheiro',
    tipo: 'saída'
  })

  // Categorias disponíveis
  const categorias = ['Casa', 'Alimentação', 'Transporte', 'Saúde', 'Lazer', 'Assinatura', 'Mercado', 'Utilitários', 'Outro']
  const formasPagamento = ['Dinheiro', 'Cartão Débito', 'Cartão Crédito', 'Boleto', 'Transferência']
  const anos = [2023, 2024, 2025, 2026, 2027, 2028]

  // Carrega contas do localStorage
  useEffect(() => {
    const chave = `contas_${selectedPerson}_${selectedYear}_${selectedMonth}`
    const dados = localStorage.getItem(chave)
    setContas(dados ? JSON.parse(dados) : [])
  }, [selectedPerson, selectedYear, selectedMonth])

  // Salva contas no localStorage
  const salvarContas = (novasContas) => {
    const chave = `contas_${selectedPerson}_${selectedYear}_${selectedMonth}`
    localStorage.setItem(chave, JSON.stringify(novasContas))
    setContas(novasContas)
  }

  // Adicionar/Editar conta
  const handleSalvar = () => {
    if (!formData.descricao || !formData.valor) {
      alert('Preencha descrição e valor')
      return
    }

    let novasContas
    if (editingId) {
      novasContas = contas.map(c => c.id === editingId ? { ...formData, id: editingId } : c)
    } else {
      novasContas = [...contas, { ...formData, id: Date.now() }]
    }

    salvarContas(novasContas)
    resetForm()
  }

  // Deletar conta
  const handleDeletar = (id) => {
    if (confirm('Tem certeza?')) {
      salvarContas(contas.filter(c => c.id !== id))
    }
  }

  // Editar conta
  const handleEditar = (conta) => {
    setFormData(conta)
    setEditingId(conta.id)
    setShowForm(true)
  }

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      descricao: '',
      categoria: '',
      data: '',
      valor: '',
      status: 'A pagar',
      formaPagamento: 'Dinheiro',
      tipo: 'saída'
    })
    setEditingId(null)
    setShowForm(false)
  }

  // Cálculos
  const totalGastos = contas.filter(c => c.tipo === 'saída').reduce((sum, c) => sum + (parseFloat(c.valor) || 0), 0)
  const totalEntradas = contas.filter(c => c.tipo === 'entrada').reduce((sum, c) => sum + (parseFloat(c.valor) || 0), 0)
  const saldo = totalEntradas - totalGastos

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Projeção de Contas</h2>
            <p className="text-sm text-gray-400">Gerenciador de contas mês a mês</p>
          </div>
        </div>
      </div>

      {/* Seleção de Pessoa, Ano e Ações */}
      <div className="flex items-center justify-between gap-4 bg-gray-900 rounded-lg border border-gray-800 p-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Pessoa</label>
            <select
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
            >
              {pessoas.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Ano</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
            >
              {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          + Nova
        </button>
      </div>

      {/* Abas dos Meses */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-800">
        {Object.entries(meses).map(([mesKey, mesNome]) => (
          <button
            key={mesKey}
            onClick={() => setSelectedMonth(mesKey)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedMonth === mesKey
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📅 {mesNome}
          </button>
        ))}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
          <p className="text-xs text-green-300 font-semibold mb-1">Entradas</p>
          <p className="text-xl font-bold text-green-400">R$ {formatarMoeda(totalEntradas)}</p>
        </div>

        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 border border-red-700">
          <p className="text-xs text-red-300 font-semibold mb-1">Gastos</p>
          <p className="text-xl font-bold text-red-400">R$ {formatarMoeda(totalGastos)}</p>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-4 border ${
          saldo >= 0 ? 'from-blue-900 to-blue-800 border-blue-700' : 'from-orange-900 to-orange-800 border-orange-700'
        }`}>
          <p className={`text-xs font-semibold mb-1 ${saldo >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>Saldo</p>
          <p className={`text-xl font-bold ${saldo >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>R$ {formatarMoeda(saldo)}</p>
        </div>
      </div>

      {/* Tabela de Contas */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        {contas.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>Nenhuma conta registrada</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Adicionar Primeira Conta
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800">
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Descrição</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Categoria</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Data</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-300">Valor</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-300">Forma</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contas.map((conta) => (
                  <tr key={conta.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                    <td className="px-4 py-3 text-white">{conta.descricao}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                        {conta.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{conta.data}</td>
                    <td className={`px-4 py-3 text-right font-semibold ${
                      conta.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {conta.tipo === 'entrada' ? '+' : '-'} R$ {formatarMoeda(conta.valor)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        conta.status === 'Pago'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {conta.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{conta.formaPagamento}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEditar(conta)}
                        className="text-blue-400 hover:text-blue-300 mr-2"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeletar(conta.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rodapé com Total */}
        {contas.length > 0 && (
          <div className="bg-gray-800 px-4 py-3 border-t border-gray-700 flex justify-between">
            <span className="text-gray-400">CONTAGEM: {contas.length}</span>
            <span className="font-semibold text-white">SOMA: R$ {formatarMoeda(totalGastos + totalEntradas)}</span>
          </div>
        )}
      </div>

      {/* Modal de Formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Editar Conta' : 'Nova Conta'}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Descrição *</label>
                <input
                  type="text"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Ex: Aluguel"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Categoria *</label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione</option>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Data</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Valor *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  placeholder="0,00"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="A pagar">A pagar</option>
                  <option value="Pago">Pago</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Forma de Pagamento</label>
                <select
                  value={formData.formaPagamento}
                  onChange={(e) => setFormData({...formData, formaPagamento: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                >
                  {formasPagamento.map(forma => <option key={forma} value={forma}>{forma}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Tipo</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="saída">Saída</option>
                  <option value="entrada">Entrada</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                {editingId ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
