import { useState } from 'react'

export default function Sidebar({ activeModule, setActiveModule, modules, user }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const modulesList = Object.entries(modules).map(([id, module]) => ({
    id,
    label: module.label || id
  }))

  return (
    <aside className={`bg-surface border-r border-white border-opacity-10 h-screen sticky top-0 overflow-y-auto transition-all ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-white border-opacity-10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent2 rounded-lg flex items-center justify-center">
                <span>💼</span>
              </div>
              <div>
                <h1 className="text-sm font-bold font-syne text-text">Motta</h1>
                <p className="text-xs text-muted">App</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-surface2 rounded-lg transition text-text"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-white border-opacity-10">
          <p className="text-xs text-muted">Conectado</p>
          <p className="text-sm font-semibold text-text truncate">{user.email}</p>
        </div>
      )}

      {/* Menu Items */}
      <nav className={`p-4 ${isCollapsed ? 'space-y-2' : 'grid grid-cols-2 gap-2'}`}>
        {modulesList.map((module) => {
          // Extrai o ícone (primeiro emoji) e o texto
          const parts = module.label.split(' ')
          const icon = parts[0]
          const label = parts.slice(1).join(' ')
          
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center ${isCollapsed ? 'gap-3 px-4 py-3' : 'flex-col gap-1 px-2 py-2'} rounded-lg transition text-left ${
                activeModule === module.id
                  ? 'bg-accent bg-opacity-20 text-accent border border-accent border-opacity-30'
                  : 'text-muted hover:text-text hover:bg-surface2'
              }`}
              title={module.label}
            >
              <span className="text-lg flex-shrink-0">
                {icon}
              </span>
              {!isCollapsed && (
                <span className="text-xs text-center line-clamp-2">{label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white border-opacity-10 bg-surface">
        {!isCollapsed && (
          <p className="text-xs text-muted text-center">v1.0</p>
        )}
      </div>
    </aside>
  )
}
