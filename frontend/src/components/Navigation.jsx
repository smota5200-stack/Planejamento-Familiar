export default function Navigation({ activeModule, setActiveModule, modules }) {
  const modulesList = Object.entries(modules).map(([id, { label }]) => ({ id, label }))

  return (
    <nav className="bg-surface border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto">
          {modulesList.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`px-4 py-4 border-b-2 transition whitespace-nowrap ${
                activeModule === module.id
                  ? 'border-accent text-accent font-semibold'
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              {module.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
