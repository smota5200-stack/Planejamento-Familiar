import { useState } from 'react'
import FamilyLogo from '../components/FamilyLogo'

export default function Welcome({ onEnter }) {
  const [isEntering, setIsEntering] = useState(false)

  const handleEnter = () => {
    setIsEntering(true)
    setTimeout(onEnter, 600)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-slate-900 to-blue-900 flex items-center justify-center p-6">
      <div
        className={`text-center max-w-2xl transition-all duration-500 ${
          isEntering ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <div className="w-48 h-48 bg-white rounded-3xl p-6 shadow-2xl">
            <FamilyLogo classname="w-full h-full" />
          </div>
        </div>

        {/* Título */}
        <h1
          className="text-6xl font-bold mb-4 text-white"
          style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
        >
          Planejamento Familiar
        </h1>

        {/* Subtítulo */}
        <p className="text-xl text-teal-200 mb-2">Gerencie as finanças da sua família</p>
        <p className="text-lg text-slate-400 mb-12">
          Organize, controle e realize os sonhos de todos
        </p>

        {/* Benefícios */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
            <p className="text-sm text-white">Múltiplos membros</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <div className="text-3xl mb-2">💰</div>
            <p className="text-sm text-white">Controle de gastos</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-white">Metas e objetivos</p>
          </div>
        </div>

        {/* Botão Entrar */}
        <button
          onClick={handleEnter}
          className="px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Começar agora
        </button>

        {/* Footer */}
        <p className="text-slate-500 text-sm mt-8">
          Organize sua vida financeira em família
        </p>
      </div>
    </div>
  )
}
