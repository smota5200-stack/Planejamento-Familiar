import { useState, useEffect } from 'react'
import { accountsData, meses, categorias } from '../data/accountsData'

const PESSOAS = ['Sergio', 'Elaine', 'Enzo']

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DespesasVariaveisModule() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState('janeiro')
  const [selectedPerson, setSelectedPerson] = useState('Familia')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [despesas, setDespesas] = useState([])
  const [formData, setFormData] = useState({
    descricao: '',
    categoria: 'Alimentação',
    valor: '',
    data: '',
    forma_pagamento: 'Dinheiro',
    numero_parcelas: '1',
    valor_total: '',
    pessoa: 'Familia'
  })

  // Carregar dados do localStorage ou usar dados padrão
  useEffect(() => {
    let key = `despesasVariaveis_${selectedYear}_${selectedMonth}`
    if (selectedPerson !== 'Familia') {
      key = `despesasVariaveis_${selectedPerson}_${selectedYear}_${selectedMonth}`
    }
    const stored = localStorage.getItem(key)
    if (stored) {
      setDespesas(JSON.parse(stored))
    } else {
      const defaultDespesas = accountsData[selectedYear]?.[selectedMonth]?.filter(t => 
        t.tipo === 'saída' && !['Moradia', 'Utilidades', 'Educação'].includes(t.categoria)
      ) || []
      setDespesas(defaultDespesas)
    }
  }, [selectedYear, selectedMonth, selectedPerson])

  // Salvar no localStorage
  useEffect(() => {
    let key = `despesasVariaveis_${selectedYear}_${selectedMonth}`
    if (selectedPerson !== 'Familia') {
      key = `despesasVariaveis_${selectedPerson}_${selectedYear}_${selectedMonth}`
    }
    localStorage.setItem(key, JSON.stringify(despesas))
  }, [despesas, selectedYear, selectedMonth, selectedPerson])

  const years = Object.keys(accountsData).map(Number).sort((a, b) => b - a)
  const monthsList = Object.keys(accountsData[selectedYear] || {})
  const totalDespesas = despesas.reduce((sum, item) => sum + Number(item.valor), 0)

  const handleAddDespesa = () => {
    if (formData.descricao && formData.valor && formData.data) {
      const newDespesa = {
        id: Date.now(),
        descricao: formData.descricao,
        categoria: formData.categoria,
        valor: Number(formData.valor),
        data: formData.data,
        forma_pagamento: formData.forma_pagamento,
        numero_parcelas: Number(formData.numero_parcelas),
        valor_total: Number(formData.valor_total || formData.valor),
        pessoa: formData.pessoa,
        tipo: 'saída'
      }
      setDespesas([...despesas, newDespesa])
      resetForm()
    }
  }

  const handleEditDespesa = (id) => {
    const despesa = despesas.find(d => d.id === id)
    if (despesa) {
      setFormData({
        descricao: despesa.descricao,
        categoria: despesa.categoria,
        valor: despesa.valor.toString(),
        data: despesa.data,
        forma_pagamento: despesa.forma_pagamento || 'Dinheiro',
        numero_parcelas: (despesa.numero_parcelas || 1).toString(),
        valor_total: (despesa.valor_total || despesa.valor).toString(),
        pessoa: despesa.pessoa || 'Familia'
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  const handleUpdateDespesa = () => {
    if (formData.descricao && formData.valor && formData.data && editingId) {
      setDespesas(despesas.map(d => d.id === editingId ? {
        ...d,
        descricao: formData.descricao,
        categoria: formData.categoria,
        valor: Number(formData.valor),
        data: formData.data,
        forma_pagamento: formData.forma_pagamento,
        numero_parcelas: Number(formData.numero_parcelas),
        valor_total: Number(formData.valor_total || formData.valor),
        pessoa: formData.pessoa
      } : d))
      resetForm()
    }
  }

  const handleDeleteDespesa = (id) => {
    setDespesas(despesas.filter(d => d.id !== id))
  }

  const resetForm = () => {
    setFormData({
      descricao: '',
      categoria: 'Alimentação',
      valor: '',
      data: '',
      forma_pagamento: 'Dinheiro',
      numero_parcelas: '1',
      valor_total: '',
      pessoa: 'Familia'
    })
    setShowForm(false)
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🛒</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Minhas Despesas - Gastos Variáveis</h2>
            <p className="text-sm text-gray-400">Acompanhe seus gastos ocasionais</p>
          </div>
        </div>
        
        <button
          onClick={() => resetForm()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
        >
          + Nova
        </button>
      </div>

      {/* Seletores */}
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
            {monthsList.map(month => (
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
            <option value="Familia">👨‍👩‍👧‍👦 Familia</option>
            {PESSOAS.map(pessoa => (
              <option key={pessoa} value={pessoa}>{pessoa}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Abas de Meses */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {monthsList.map(month => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedMonth === month
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {meses[month]}
          </button>
        ))}
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {editingId ? 'Editar Gasto Variável' : 'Adicionar Novo Gasto Variável'}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Ex: Restaurante, Compras..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pessoa</label>
              <select
                value={formData.pessoa}
                onChange={(e) => setFormData({ ...formData, pessoa: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Familia">👨‍👩‍👧‍👦 Familia</option>
                {PESSOAS.map(pessoa => (
                  <option key={pessoa} value={pessoa}>{pessoa}</option>
                ))}
              </select>
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
            
            <div>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Forma de Pagamento</label>
              <select
                value={formData.forma_pagamento}
                onChange={(e) => setFormData({ ...formData, forma_pagamento: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option>Dinheiro</option>
                <option>Cartão Débito</option>
                <option>Cartão Crédito</option>
                <option>Transferência</option>
                <option>Pix</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Número de Parcelas</label>
              <input
                type="number"
                value={formData.numero_parcelas}
                onChange={(e) => setFormData({ ...formData, numero_parcelas: e.target.value })}
                min="1"
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
              onClick={editingId ? handleUpdateDespesa : handleAddDespesa}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </div>
      )}

      {/* Tabela de Despesas Variáveis */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <h3 className="font-semibold text-white">
            Gastos Variáveis - {meses[selectedMonth]} de {selectedYear}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Pessoa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Data</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Forma de Pagamento</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Qual foi o Cartão</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Número Parcelas</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-300">Valor Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300">Saldo</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-300">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {despesas.length > 0 ? (
                despesas.map((despesa) => (
                  <tr key={despesa.id} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 text-white font-medium">
                      {despesa.descricao}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        despesa.pessoa === 'Sergio' ? 'bg-blue-600 text-white' :
                        despesa.pessoa === 'Elaine' ? 'bg-pink-600 text-white' :
                        despesa.pessoa === 'Enzo' ? 'bg-green-600 text-white' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {despesa.pessoa}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${categorias[despesa.categoria]?.cor} text-white px-3 py-1 rounded-full text-xs inline-block`}>
                        {despesa.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(despesa.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-red-400">
                      R$ {formatarMoeda(Number(despesa.valor))}
                    </td>
                    <td className="px-6 py-4 text-blue-400">
                      {despesa.forma_pagamento}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      -
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {despesa.numero_parcelas || 1}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-red-400">
                      R$ {formatarMoeda(Number(despesa.valor_total || despesa.valor))}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {meses[selectedMonth]}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditDespesa(despesa.id)}
                          className="text-blue-400 hover:text-blue-300 transition text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteDespesa(despesa.id)}
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
                  <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
                    Nenhum gasto variável registrado neste período
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-800 border-t border-gray-700">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right text-sm font-semibold text-gray-300">
                  SOMA
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-red-400">
                  R$ {formatarMoeda(totalDespesas)}
                </td>
                <td colSpan="6"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
