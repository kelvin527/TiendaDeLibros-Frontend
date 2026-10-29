import type { AuthorGroup } from '../types'

interface AuthorListItemProps {
  author: AuthorGroup
  onEdit: () => void
  onDelete: () => void
}

export function AuthorListItem({ author, onEdit, onDelete }: AuthorListItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 border border-slate-200 rounded-lg p-4">
      <div>
        <h3 className="font-semibold text-slate-900">
          {author.firstName} {author.lastName}
        </h3>
        <p className="text-sm text-slate-600">
          {author.bookCount} {author.bookCount === 1 ? 'libro publicado' : 'libros publicados'}
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
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
