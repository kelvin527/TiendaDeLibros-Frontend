import { Link } from 'react-router-dom'
import type { Book } from '../types'

interface BookListItemProps {
  book: Book
  onEdit: () => void
  onDelete: () => void
}

export function BookListItem({ book, onEdit, onDelete }: BookListItemProps) {
  return (
    <li className="flex items-start justify-between gap-4 border border-slate-200 rounded-lg p-4">
      <div>
        <h3 className="font-semibold text-slate-900">{book.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{book.description}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Link
          to={`/books/${book.id}`}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Ver detalle
        </Link>
        <button
          onClick={onEdit}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}
