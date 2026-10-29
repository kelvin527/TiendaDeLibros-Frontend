import { useEffect, useState } from 'react'
import { Spinner } from '../../shared/components/Spinner'
import { Pagination } from '../../shared/components/Pagination'
import { Toast } from '../../shared/components/Toast'
import { useToast } from '../../shared/hooks/useToast'
import { BookForm } from '../components/BookForm'
import { BookListItem } from '../components/BookListItem'
import { createBook, deleteBook, getBooks, updateBook } from '../services/booksService'
import type { Book, BookFormValues } from '../types'

const emptyForm: BookFormValues = {
  title: '',
  description: '',
  pageCount: 0,
  excerpt: '',
  publishDate: new Date().toISOString(),
}

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast, showToast } = useToast()

  async function loadBooks(page: number) {
    setLoading(true)
    const result = await getBooks(page)
    setBooks(result.items)
    setPageNumber(result.pageNumber)
    setTotalPages(result.totalPages)
    setLoading(false)
  }

  useEffect(() => {
    loadBooks(1)
  }, [])

  function startCreate() {
    setEditingBook(null)
    setShowForm(true)
  }

  function startEdit(book: Book) {
    setEditingBook(book)
    setShowForm(true)
  }

  async function handleSubmit(values: BookFormValues) {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, values)
        showToast('Libro actualizado con éxito')
      } else {
        await createBook(values)
        showToast('Libro creado con éxito')
      }
      setShowForm(false)
      await loadBooks(pageNumber)
    } catch {
      showToast('No se pudo guardar el libro', 'error')
    }
  }

  async function handleDelete(book: Book) {
    if (!confirm(`¿Eliminar "${book.title}"?`)) return
    try {
      await deleteBook(book.id)
      showToast('Libro eliminado con éxito')
      await loadBooks(pageNumber)
    } catch {
      showToast('No se pudo eliminar el libro', 'error')
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Libros</h1>
        <button
          onClick={startCreate}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Agregar libro
        </button>
      </div>

      {showForm && (
        <BookForm
          submitLabel={editingBook ? 'Actualizar libro' : 'Crear libro'}
          initialValues={
            editingBook
              ? {
                  title: editingBook.title,
                  description: editingBook.description ?? '',
                  pageCount: editingBook.pageCount,
                  excerpt: editingBook.excerpt ?? '',
                  publishDate: editingBook.publishDate,
                }
              : emptyForm
          }
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <ul className="space-y-3">
            {books.map((book) => (
              <BookListItem
                key={book.id}
                book={book}
                onEdit={() => startEdit(book)}
                onDelete={() => handleDelete(book)}
              />
            ))}
          </ul>
          <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={loadBooks} />
        </>
      )}

      <Toast toast={toast} />
    </section>
  )
}
