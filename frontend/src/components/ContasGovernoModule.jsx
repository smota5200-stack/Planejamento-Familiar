import { useState } from 'react'

const formatarMoeda = (valor) => {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export default function ContasGovernoModule() {
  const [selectedPerson, setSelectedPerson] = useState('Sergio')
  const [activeTab, setActiveTab] = useState('impostos') // impostos, beneficios, documentos

  // Dados de exemplo (seriam salvos em localStorage)
  const [contasGoverno, setContasGoverno] = useState({
    Sergio: {
      cpf: '12345678900',
      rg: '123456789-00',
      titulo: '987654321',
      impostos: [
        { id: 1, tipo: 'IRPF', ano: 2024, valor: 3500, status: 'Pago', vencimento: '2024-30-04' },
        { id: 2, tipo: 'IPVA', ano: 2024, valor: 850, status: 'Pago', vencimento: '2024-31-01' },
        { id: 3, tipo: 'IPTU', ano: 2024, valor: 2100, status: 'Pendente', vencimento: '2024-15-12' },
      ],
      contribuicoes: [
        { id: 1, tipo: 'INSS', descricao: 'Contribuição para aposentadoria', valor: 850, status: 'Em dia' },
        { id: 2, tipo: 'Sindicato', descricao: 'Contribuição sindical', valor: 150, status: 'Em dia' },
      ],
      beneficios: [
        { id: 1, tipo: 'Auxílio Alimentação', valor: 600, status: 'Ativo', empresa: 'Atual Empresa' },
      ]
    },
    Elaine: {
      cpf: '98765432100',
      rg: '987654321-00',
      titulo: '123456789',
      impostos: [
        { id: 1, tipo: 'IRPF', ano: 2024, valor: 2800, status: 'Pago', vencimento: '2024-30-04' },
      ],
      contribuicoes: [
        { id: 1, tipo: 'INSS', descricao: 'Contribuição para aposentadoria', valor: 720, status: 'Em dia' },
      ],
      beneficios: []
    },
    Enzo: {
      cpf: '11122233344',
      rg: '112223334-00',
      titulo: '',
      impostos: [],
      contribuicoes: [],
      beneficios: []
    }
  })

  const dados = contasGoverno[selectedPerson]
  const pessoas = ['Sergio', 'Elaine', 'Enzo']

  // Cálculos
  const totalImpostos = dados.impostos.reduce((sum, item) => sum + item.valor, 0)
  const totalContribuicoes = dados.contribuicoes.reduce((sum, item) => sum + item.valor, 0)
  const totalBeneficios = dados.beneficios.reduce((sum, item) => sum + item.valor, 0)
  const impostosPagos = dados.impostos.filter(i => i.status === 'Pago').reduce((sum, item) => sum + item.valor, 0)
  const impostosPendentes = dados.impostos.filter(i => i.status === 'Pendente').reduce((sum, item) => sum + item.valor, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Contas do Governo</h2>
            <p className="text-sm text-gray-400">Impostos, contribuições e benefícios</p>
          </div>
        </div>
      </div>

      {/* Seleção de Pessoa */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Pessoa</label>
        <div className="flex gap-2">
          {pessoas.map(pessoa => (
            <button
              key={pessoa}
              onClick={() => setSelectedPerson(pessoa)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedPerson === pessoa
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {pessoa}
            </button>
          ))}
        </div>
      </div>

      {/* Dados Pessoais */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📋 Dados Pessoais</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded p-4">
            <p className="text-sm text-gray-400 mb-1">CPF</p>
            <p className="text-lg font-mono font-bold text-white">{formatarCPF(dados.cpf)}</p>
          </div>
          <div className="bg-gray-800 rounded p-4">
            <p className="text-sm text-gray-400 mb-1">RG</p>
            <p className="text-lg font-mono font-bold text-white">{dados.rg}</p>
          </div>
          {dados.titulo && (
            <div className="bg-gray-800 rounded p-4">
              <p className="text-sm text-gray-400 mb-1">Título Eleitoral</p>
              <p className="text-lg font-mono font-bold text-white">{dados.titulo}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <p className="text-sm text-red-300 font-semibold mb-2">Total Impostos</p>
          <p className="text-2xl font-bold text-red-400">R$ {formatarMoeda(totalImpostos)}</p>
          <p className="text-xs text-red-300 mt-2">{dados.impostos.length} impostos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
          <p className="text-sm text-blue-300 font-semibold mb-2">Contribuições</p>
          <p className="text-2xl font-bold text-blue-400">R$ {formatarMoeda(totalContribuicoes)}</p>
          <p className="text-xs text-blue-300 mt-2">{dados.contribuicoes.length} contribuições</p>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <p className="text-sm text-green-300 font-semibold mb-2">Benefícios</p>
          <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(totalBeneficios)}</p>
          <p className="text-xs text-green-300 mt-2">{dados.beneficios.length} benefícios</p>
        </div>

        <div className={`bg-gradient-to-br rounded-lg p-6 border ${
          impostosPendentes === 0 ? 'from-green-900 to-green-800 border-green-700' : 'from-yellow-900 to-yellow-800 border-yellow-700'
        }`}>
          <p className={`text-sm font-semibold mb-2 ${impostosPendentes === 0 ? 'text-green-300' : 'text-yellow-300'}`}>Status</p>
          <p className={`text-lg font-bold ${impostosPendentes === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
            {impostosPendentes === 0 ? '✓ Em dia' : 'Pendente'}
          </p>
          <p className={`text-xs mt-2 ${impostosPendentes === 0 ? 'text-green-300' : 'text-yellow-300'}`}>
            {impostosPendentes > 0 ? `R$ ${formatarMoeda(impostosPendentes)}` : 'Sem débitos'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('impostos')}
          className={`px-4 py-2 border-b-2 transition ${
            activeTab === 'impostos'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          💰 Impostos ({dados.impostos.length})
        </button>
        <button
          onClick={() => setActiveTab('contribuicoes')}
          className={`px-4 py-2 border-b-2 transition ${
            activeTab === 'contribuicoes'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          📊 Contribuições ({dados.contribuicoes.length})
        </button>
        <button
          onClick={() => setActiveTab('beneficios')}
          className={`px-4 py-2 border-b-2 transition ${
            activeTab === 'beneficios'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🎁 Benefícios ({dados.beneficios.length})
        </button>
      </div>

      {/* Conteúdo por Tab */}
      <div>
        {activeTab === 'impostos' && (
          <div className="space-y-3">
            {dados.impostos.length > 0 ? (
              dados.impostos.map(imposto => (
                <div key={imposto.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-blue-700 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-lg font-bold text-white">{imposto.tipo}</p>
                      <p className="text-sm text-gray-400">{imposto.ano}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      imposto.status === 'Pago'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {imposto.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-red-400">R$ {formatarMoeda(imposto.valor)}</p>
                    <p className="text-sm text-gray-400">Vencimento: {imposto.vencimento}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">Sem impostos registrados</p>
            )}
          </div>
        )}

        {activeTab === 'contribuicoes' && (
          <div className="space-y-3">
            {dados.contribuicoes.length > 0 ? (
              dados.contribuicoes.map(contrib => (
                <div key={contrib.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-blue-700 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-lg font-bold text-white">{contrib.tipo}</p>
                      <p className="text-sm text-gray-400">{contrib.descricao}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-900 text-green-300">
                      {contrib.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">R$ {formatarMoeda(contrib.valor)}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">Sem contribuições registradas</p>
            )}
          </div>
        )}

        {activeTab === 'beneficios' && (
          <div className="space-y-3">
            {dados.beneficios.length > 0 ? (
              dados.beneficios.map(beneficio => (
                <div key={beneficio.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4 hover:border-blue-700 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-lg font-bold text-white">{beneficio.tipo}</p>
                      <p className="text-sm text-gray-400">{beneficio.empresa}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-900 text-green-300">
                      {beneficio.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(beneficio.valor)}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">Sem benefícios registrados</p>
            )}
          </div>
        )}
      </div>

      {/* Resumo Final */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📌 Resumo Financeiro</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded p-4">
            <p className="text-sm text-gray-400 mb-2">Impostos Pagos</p>
            <p className="text-2xl font-bold text-green-400">R$ {formatarMoeda(impostosPagos)}</p>
          </div>
          <div className="bg-gray-800 rounded p-4">
            <p className="text-sm text-gray-400 mb-2">Impostos Pendentes</p>
            <p className="text-2xl font-bold text-yellow-400">R$ {formatarMoeda(impostosPendentes)}</p>
          </div>
          <div className="bg-gray-800 rounded p-4">
            <p className="text-sm text-gray-400 mb-2">Benefício Líquido</p>
            <p className="text-2xl font-bold text-blue-400">R$ {formatarMoeda(totalBeneficios - totalContribuicoes)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
