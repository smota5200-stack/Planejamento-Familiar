import { useState } from 'react'
import { accountsData, meses } from '../data/accountsData'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function YearControlModule() {
  const [selectedYear, setSelectedYear] = useState(2024)
  
  const years = Object.keys(accountsData).map(Number).sort((a, b) => b - a)
  const yearData = accountsData[selectedYear] || {}
  
  const calculateMonthTotals = (monthData) => {
    const ganhos = monthData.filter(t => t.tipo === 'entrada').reduce((sum, t) => sum + t.valor, 0)
    const gastoFixos = monthData.filter(t => t.tipo === 'saída' && ['Moradia', 'Utilidades', 'Educação'].includes(t.categoria)).reduce((sum, t) => sum + t.valor, 0)
    const gastoVariavel = monthData.filter(t => t.tipo === 'saída' && !['Moradia', 'Utilidades', 'Educação'].includes(t.categoria)).reduce((sum, t) => sum + t.valor, 0)
    const dividas = 0
    const balanco = ganhos - gastoFixos - gastoVariavel - dividas
    
    return { ganhos, gastoFixos, gastoVariavel, dividas, balanco }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Controle do Ano - Mês por mês</h2>
            <p className="text-sm text-gray-400">Visualize resumo mensal de ganhos, gastos e saldo</p>
          </div>
        </div>
        
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Tabela de Meses */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 whitespace-nowrap">Mês</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-green-400 whitespace-nowrap">Total de Ganhos</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-orange-400 whitespace-nowrap">Total Gastos Fixos</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-red-400 whitespace-nowrap">Total Gastos Variáveis</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-pink-400 whitespace-nowrap">Total Dívidas</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-blue-400 whitespace-nowrap">Balanço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {Object.entries(yearData).length > 0 ? (
                Object.entries(yearData).map(([monthKey, monthData]) => {
                  const totals = calculateMonthTotals(monthData)
                  return (
                    <tr key={monthKey} className="hover:bg-gray-800 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-white whitespace-nowrap">
                        {meses[monthKey]} {selectedYear}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-green-400">
                        R$ {formatarMoeda(totals.ganhos)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-orange-400">
                        R$ {formatarMoeda(totals.gastoFixos)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-red-400">
                        R$ {formatarMoeda(totals.gastoVariavel)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-pink-400">
                        R$ {formatarMoeda(totals.dividas)}
                      </td>
                      <td className={`px-6 py-4 text-right text-sm font-bold whitespace-nowrap ${
                        totals.balanco >= 0 ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        R$ {formatarMoeda(totals.balanco)}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Nenhum dado disponível para este ano
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo Anual */}
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(yearData).length > 0 ? (
          <>
            {(() => {
              const allTotals = Object.values(yearData).map(m => calculateMonthTotals(m)).reduce((acc, curr) => ({
                ganhos: acc.ganhos + curr.ganhos,
                gastoFixos: acc.gastoFixos + curr.gastoFixos,
                gastoVariavel: acc.gastoVariavel + curr.gastoVariavel,
                dividas: acc.dividas + curr.dividas,
                balanco: acc.balanco + curr.balanco
              }), { ganhos: 0, gastoFixos: 0, gastoVariavel: 0, dividas: 0, balanco: 0 })
              
              return (
                <>
                  <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
                    <p className="text-xs text-green-300 mb-2">Total Ganhos</p>
                    <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(allTotals.ganhos)}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-4 border border-orange-700">
                    <p className="text-xs text-orange-300 mb-2">Gastos Fixos</p>
                    <p className="text-2xl font-bold text-orange-400">R$ {formatarMoeda(allTotals.gastoFixos)}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 border border-red-700">
                    <p className="text-xs text-red-300 mb-2">Gastos Variáveis</p>
                    <p className="text-2xl font-bold text-red-400">R$ {formatarMoeda(allTotals.gastoVariavel)}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-lg p-4 border border-pink-700">
                    <p className="text-xs text-pink-300 mb-2">Total Dívidas</p>
                    <p className="text-2xl font-bold text-pink-400">R$ {formatarMoeda(allTotals.dividas)}</p>
                  </div>
                  
                  <div className={`bg-gradient-to-br rounded-lg p-4 border ${allTotals.balanco >= 0 ? 'from-blue-900 to-blue-800 border-blue-700' : 'from-red-900 to-red-800 border-red-700'}`}>
                    <p className={`text-xs mb-2 ${allTotals.balanco >= 0 ? 'text-blue-300' : 'text-red-300'}`}>Balanço Total</p>
                    <p className={`text-2xl font-bold ${allTotals.balanco >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                      R$ {formatarMoeda(allTotals.balanco)}
                    </p>
                  </div>
                </>
              )
            })()}
          </>
        ) : null}
      </div>
    </div>
  )
}
