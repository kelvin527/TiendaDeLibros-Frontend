import { NavLink } from 'react-router-dom'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">Tienda de Libros</span>
        <div className="flex gap-2">
          <NavLink to="/books" className={linkClasses}>
            Libros
          </NavLink>
          <NavLink to="/authors" className={linkClasses}>
            Autores
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
