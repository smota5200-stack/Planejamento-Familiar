import { useState } from 'react'
import { accountsData, meses } from '../data/accountsData'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function BalanceModule() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState('janeiro')
  
  const years = Object.keys(accountsData).map(Number).sort((a, b) => b - a)
  const monthsKeys = Object.keys(accountsData[selectedYear] || {})
  const currentMonthData = accountsData[selectedYear]?.[selectedMonth] || []
  
  const totalEntradas = currentMonthData.filter(item => item.tipo === 'entrada').reduce((sum, item) => sum + item.valor, 0)
  const totalSaidas = currentMonthData.filter(item => item.tipo === 'saída').reduce((sum, item) => sum + item.valor, 0)
  const totalDividas = 0
  const saldo = totalEntradas - totalSaidas - totalDividas

  // Dados por categoria
  const despesasPorCategoria = currentMonthData
    .filter(item => item.tipo === 'saída')
    .reduce((acc, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + item.valor
      return acc
    }, {})

  // Cálculo de percentual
  const percentualGastos = totalSaidas > 0 ? ((totalSaidas / totalEntradas) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📈</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Balanço</h2>
            <p className="text-sm text-gray-400">Relatórios e gráficos financeiros</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-300">
          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">Nova</button>
        </div>
      </div>

      {/* Seletores */}
      <div className="grid grid-cols-2 gap-4">
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
            {monthsKeys.map(month => (
              <option key={month} value={month}>{meses[month]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resumo Principal */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <p className="text-sm text-green-300 font-semibold mb-2">Total de Ganhos</p>
          <p className="text-3xl font-bold text-green-400">R$ {formatarMoeda(totalEntradas)}</p>
          <p className="text-xs text-green-300 mt-2">100% do orçamento</p>
        </div>

        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <p className="text-sm text-red-300 font-semibold mb-2">Total de Gastos</p>
          <p className="text-3xl font-bold text-red-400">R$ {formatarMoeda(totalSaidas)}</p>
          <p className="text-xs text-red-300 mt-2">{percentualGastos}% dos ganhos</p>
        </div>

        <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg p-6 border border-pink-700">
          <p className="text-sm text-pink-300 font-semibold mb-2">Total Dívidas</p>
          <p className="text-3xl font-bold text-pink-400">R$ {formatarMoeda(totalDividas)}</p>
          <p className="text-xs text-pink-300 mt-2">0% dos ganhos</p>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-6 border ${saldo >= 0 ? 'from-blue-900 to-blue-800 border-blue-700' : 'from-orange-900 to-orange-800 border-orange-700'}`}>
          <p className={`text-sm font-semibold mb-2 ${saldo >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>Saldo</p>
          <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>R$ {formatarMoeda(saldo)}</p>
          <p className={`text-xs mt-2 ${saldo >= 0 ? 'text-blue-300' : 'text-orange-300'}`}>{saldo >= 0 ? 'Superávit' : 'Déficit'}</p>
        </div>
      </div>

      {/* Gráfico de Pizza - Despesas por Categoria */}
      <div className="grid grid-cols-2 gap-4">
        {/* Gráfico Visual */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Distribuição de Gastos</h3>
          
          <div className="space-y-3">
            {Object.entries(despesasPorCategoria).map(([categoria, valor]) => {
              const percentual = ((valor / totalSaidas) * 100).toFixed(1)
              return (
                <div key={categoria}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-300 font-medium">{categoria}</span>
                    <span className="text-sm text-gray-400">R$ {formatarMoeda(valor)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{percentual}%</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Relatório Textual */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Relatório do Período</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Período Analisado</p>
              <p className="text-lg font-semibold text-white">{meses[selectedMonth]} de {selectedYear}</p>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Receitas</p>
              <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(totalEntradas)}</p>
            </div>

            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Despesas</p>
              <p className="text-2xl font-bold text-red-400">R$ {formatarMoeda(totalSaidas)}</p>
            </div>

            <div className={`rounded p-4 ${saldo >= 0 ? 'bg-green-950' : 'bg-red-950'}`}>
              <p className={`text-sm mb-1 ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>Resultado</p>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {saldo >= 0 ? '+' : ''} R$ {formatarMoeda(saldo)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Análise Detalhada */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Análise de Categorias</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(despesasPorCategoria)
            .sort((a, b) => b[1] - a[1])
            .map(([categoria, valor]) => (
              <div key={categoria} className="bg-gray-800 rounded p-4 hover:border-blue-500 border border-gray-700 transition">
                <p className="text-sm text-gray-400 mb-2">{categoria}</p>
                <p className="text-xl font-bold text-white">R$ {formatarMoeda(valor)}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {((valor / totalSaidas) * 100).toFixed(1)}% do total
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
