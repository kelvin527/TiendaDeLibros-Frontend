interface PaginationProps {
  pageNumber: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ pageNumber, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        className="px-3 py-1 rounded-md border border-slate-300 text-sm disabled:opacity-40"
        disabled={pageNumber <= 1}
        onClick={() => onPageChange(pageNumber - 1)}
      >
        Anterior
      </button>
      <span className="text-sm text-slate-600">
        Página {pageNumber} de {totalPages}
      </span>
      <button
        className="px-3 py-1 rounded-md border border-slate-300 text-sm disabled:opacity-40"
        disabled={pageNumber >= totalPages}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        Siguiente
      </button>
    </div>
  )
}
