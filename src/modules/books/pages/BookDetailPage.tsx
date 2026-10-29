import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner } from '../../shared/components/Spinner'
import { getAuthorsByBook } from '../../authors/services/authorsService'
import type { Author } from '../../authors/types'
import { getBook } from '../services/booksService'
import type { Book } from '../types'

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function load() {
      setLoading(true)
      const [bookData, authorsData] = await Promise.all([
        getBook(Number(id)),
        getAuthorsByBook(Number(id)),
      ])
      setBook(bookData)
      setAuthors(authorsData)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <Spinner />
  if (!book) return <p className="text-center py-10">Libro no encontrado.</p>

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/books" className="text-sm text-indigo-600 hover:underline">
        ← Volver a libros
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mt-4">{book.title}</h1>
      <p className="text-sm text-slate-500 mt-1">
        {book.pageCount} páginas · publicado el {new Date(book.publishDate).toLocaleDateString()}
      </p>

      <p className="mt-4 text-slate-700">{book.description}</p>

      {book.excerpt && (
        <blockquote className="mt-4 border-l-4 border-indigo-200 pl-4 text-slate-600 italic">
          {book.excerpt}
        </blockquote>
      )}

      <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-2">Autor</h2>
      {authors.length === 0 ? (
        <p className="text-sm text-slate-500">Este libro no tiene autor registrado.</p>
      ) : (
        <ul className="space-y-1">
          {authors.map((author) => (
            <li key={author.id} className="text-slate-700">
              {author.firstName} {author.lastName}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
