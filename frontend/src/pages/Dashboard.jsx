import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import YearControlModule from '../components/YearControlModule'
import BalanceModule from '../components/BalanceModule'
import GanhosModule from '../components/GanhosModule'
import DespesasFixasModule from '../components/DespesasFixasModule'
import DespesasVariaveisModule from '../components/DespesasVariaveisModule'
import AccountsModule from '../components/AccountsModule'
import FinanceModule from '../components/FinanceModule'
import BudgetCategoriesModule from '../components/BudgetCategoriesModule'
import GoalsModule from '../components/GoalsModule'
import HabitsModule from '../components/HabitsModule'
import ProfileModule from '../components/ProfileModule'
import DebtsModule from '../components/DebtsModule'
import CreditCardsModule from '../components/CreditCardsModule'
import CalendarioVencimentosModule from '../components/CalendarioVencimentosModule'
import MeuCofrinhoModule from '../components/MeuCofrinhoModule'
import WishlistModule from '../components/WishlistModule'
import DecisaoCompraModule from '../components/DecisaoCompraModule'
import MinhasMetasFinanceirasModule from '../components/MinhasMetasFinanceirasModule'
import MuralDosSonhosModule from '../components/MuralDosSonhosModule'
import EmprestimosModule from '../components/EmprestimosModule'
import ProjecaoContasModule from '../components/ProjecaoContasModule'
import ContasGovernoModule from '../components/ContasGovernoModule'

export default function Dashboard({ user, family }) {
  const [activeModule, setActiveModule] = useState('yearControl')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carrega perfil do usuário
    const profile = {
      id: user?.id,
      user_id: user?.id,
      full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário',
      email: user?.email,
      family_id: family?.id,
      currency: 'BRL',
      monthly_income: 5000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setProfile(profile)
    setLoading(false)
  }, [user, family])

  const modules = {
    yearControl: { label: '📊 Controle do Ano', component: YearControlModule },
    balance: { label: '📈 Balanço', component: BalanceModule },
    ganhos: { label: '💰 Ganhos', component: GanhosModule },
    despesasFixas: { label: '📋 Despesas Fixas', component: DespesasFixasModule },
    despesasVariaveis: { label: '🛒 Despesas Variáveis', component: DespesasVariaveisModule },
    accounts: { label: '📋 Contas Familiares', component: AccountsModule },
    budget: { label: '💰 Orçamento Categorias', component: BudgetCategoriesModule },
    finance: { label: '💳 Financeiro', component: FinanceModule },
    emprestimos: { label: '💳 Empréstimos', component: EmprestimosModule },
    projecao: { label: '📊 Projeção de Contas', component: ProjecaoContasModule },
    governo: { label: '🏛️ Contas do Governo', component: ContasGovernoModule },
    debts: { label: '📊 Dívidas', component: DebtsModule },
    cards: { label: '💳 Cartões', component: CreditCardsModule },
    goals: { label: '🎯 Metas', component: GoalsModule },
    habits: { label: '✅ Hábitos', component: HabitsModule },
    vencimentos: { label: '📋 Calendário de Vencimentos', component: CalendarioVencimentosModule },
    cofrinho: { label: '🏦 Meu Cofrinho', component: MeuCofrinhoModule },
    wishlist: { label: '💝 Lista de Desejos', component: WishlistModule },
    decisaoCompra: { label: '🛍️ Decisão de Compra', component: DecisaoCompraModule },
    minhasMetas: { label: '🎯 Minhas Metas Financeiras', component: MinhasMetasFinanceirasModule },
    muralSonhos: { label: '✨ Mural dos Sonhos', component: MuralDosSonhosModule },
    profile: { label: '👤 Perfil', component: ProfileModule }
  }

  const ActiveComponent = modules[activeModule]?.component

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-text">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        modules={modules}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header user={user} profile={profile} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {ActiveComponent ? (
              <ActiveComponent user={user} profile={profile} />
            ) : (
              <p className="text-muted">Módulo não encontrado</p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}


