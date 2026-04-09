import { useState, useEffect } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
import { meses } from '../data/accountsData'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']
const PESSOA_CORES = {
  'Sergio': 'bg-blue-600',
  'Elaine': 'bg-pink-600',
  'Enzo': 'bg-green-600'
}

export default function AccountsModule() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState('janeiro')
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [contas, setContas] = useState({})
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '',
    tipo: 'saída',
    categoria: 'Outros'
  })

  const years = [2023, 2024, 2025, 2026, 2027, 2028]
  const mesesList = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`contas_familiares_${selectedYear}_${selectedMonth}`)
    if (stored) {
      setContas(JSON.parse(stored))
    } else {
      setContas({})
    }
  }, [selectedYear, selectedMonth])

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem(`contas_familiares_${selectedYear}_${selectedMonth}`, JSON.stringify(contas))
  }, [contas, selectedYear, selectedMonth])

  const personData = contas[selectedPerson] || []
  const totalEntradas = personData
    .filter(item => item.tipo === 'entrada')
    .reduce((sum, item) => sum + Number(item.valor), 0)
  
  const totalSaidas = personData
    .filter(item => item.tipo === 'saída')
    .reduce((sum, item) => sum + Number(item.valor), 0)
  
  const saldo = totalEntradas - totalSaidas

  const handleAddConta = () => {
    if (formData.descricao && formData.valor && formData.data) {
      const newConta = {
        id: Date.now(),
        descricao: formData.descricao,
        valor: Number(formData.valor),
        data: formData.data,
        tipo: formData.tipo,
        categoria: formData.categoria
      }
      setContas({
        ...contas,
        [selectedPerson]: [...(contas[selectedPerson] || []), newConta]
      })
      resetForm()
    }
  }

  const handleEditConta = (id) => {
    const conta = personData.find(c => c.id === id)
    if (conta) {
      setFormData({
        descricao: conta.descricao,
        valor: conta.valor.toString(),
        data: conta.data,
        tipo: conta.tipo,
        categoria: conta.categoria
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdateConta = () => {
    if (formData.descricao && formData.valor && formData.data && editingId) {
      setContas({
        ...contas,
        [selectedPerson]: personData.map(c => c.id === editingId ? {
          ...c,
          descricao: formData.descricao,
          valor: Number(formData.valor),
          data: formData.data,
          tipo: formData.tipo,
          categoria: formData.categoria
        } : c)
      })
      resetForm()
    }
  }

  const handleDeleteConta = (id) => {
    setContas({
      ...contas,
      [selectedPerson]: personData.filter(c => c.id !== id)
    })
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor: '',
      data: '',
      tipo: 'saída',
      categoria: 'Outros'
    })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👨‍👩‍👧‍👦</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Contas Familiares</h2>
            <p className="text-sm text-gray-400">Gerencie as contas de cada membro da família</p>
          </div>
        </div>
        
        <button
          onClick={() => resetForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
        >
          + Nova Transação
        </button>
      </div>

      {/* Seletores de Período */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Ano</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Mês</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {mesesList.map(month => (
              <option key={month} value={month}>{meses[month]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Pessoa</label>
          <select
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {PESSOAS.map(pessoa => (
              <option key={pessoa} value={pessoa}>{pessoa}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards das Pessoas */}
      <div className="grid grid-cols-3 gap-4">
        {PESSOAS.map(pessoa => {
          const pessoaData = contas[pessoa] || []
          const entradas = pessoaData.filter(i => i.tipo === 'entrada').reduce((sum, i) => sum + Number(i.valor), 0)
          const saidas = pessoaData.filter(i => i.tipo === 'saída').reduce((sum, i) => sum + Number(i.valor), 0)
          const saldoPessoa = entradas - saidas
          
          return (
            <div 
              key={pessoa}
              onClick={() => setSelectedPerson(pessoa)}
              className={`rounded-lg p-6 border-2 cursor-pointer transition ${
                selectedPerson === pessoa
                  ? 'bg-gray-700 border-blue-500'
                  : 'bg-gray-800 border-gray-700 hover:border-blue-500'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${PESSOA_CORES[pessoa]} w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white`}>
                  {pessoa.charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{pessoa}</p>
                  <p className={`text-sm ${saldoPessoa >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    Saldo: R$ {formatarMoeda(saldoPessoa)}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>📥 Entradas: R$ {formatarMoeda(entradas)}</p>
                <p>📤 Saídas: R$ {formatarMoeda(saidas)}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? `Editar - ${selectedPerson}` : `Nova Transação - ${selectedPerson}`}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Ex: Mercado, Restaurante..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="entrada">Entrada</option>
                <option value="saída">Saída</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Valor (R$)</label>
              <input
                type="number"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Saúde</option>
                <option>Transporte</option>
                <option>Educação</option>
                <option>Outros</option>
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
              onClick={editingId ? handleUpdateConta : handleAddConta}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Tabela de Transações da Pessoa */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Transações - {selectedPerson} - {meses[selectedMonth]} de {selectedYear}
            </h3>
            <div className="text-sm text-gray-400">
              Total de transações: {personData.length}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300">Valor</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {personData.length > 0 ? (
                personData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {item.descricao}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                        {item.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`${
                        item.tipo === 'entrada' 
                          ? 'text-green-400 font-semibold' 
                          : 'text-red-400 font-semibold'
                      }`}>
                        {item.tipo === 'entrada' ? '+ Entrada' : '- Saída'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      <span className={item.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'}>
                        {item.tipo === 'entrada' ? '+' : '-'} R$ {formatarMoeda(item.valor)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditConta(item.id)}
                          className="text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteConta(item.id)}
                          className="text-red-400 hover:text-red-300 transition text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Nenhuma transação registrada para {selectedPerson} neste período
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-800 border-t border-gray-700">
              <tr>
                <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  SALDO
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold">
                  <span className={saldo >= 0 ? 'text-green-400' : 'text-red-400'}>
                    R$ {formatarMoeda(saldo)}
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
