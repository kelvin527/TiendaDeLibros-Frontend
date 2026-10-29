import { useEffect, useState } from 'react'
import { Spinner } from '../../shared/components/Spinner'
import { Pagination } from '../../shared/components/Pagination'
import { AuthorForm } from '../components/AuthorForm'
import { AuthorListItem } from '../components/AuthorListItem'
import { groupAuthorsByName } from '../groupAuthorsByName'
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from '../services/authorsService'
import type { AuthorFormValues, AuthorGroup } from '../types'

const PAGE_SIZE = 10
const emptyForm: AuthorFormValues = { idBook: 0, firstName: '', lastName: '' }

export function AuthorsPage() {
  const [allAuthors, setAllAuthors] = useState<AuthorGroup[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<{ group: AuthorGroup; values: AuthorFormValues } | null>(null)

  async function loadAuthors() {
    setLoading(true)
    const authors = await getAllAuthors()
    setAllAuthors(groupAuthorsByName(authors))
    setLoading(false)
  }

  useEffect(() => {
    loadAuthors()
  }, [])

  const totalPages = Math.max(1, Math.ceil(allAuthors.length / PAGE_SIZE))
  const visibleAuthors = allAuthors.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)

  function startCreate() {
    setEditing(null)
    setShowForm(true)
  }

  async function startEdit(group: AuthorGroup) {
    const author = await getAuthor(group.representativeId)
    setEditing({ group, values: { idBook: author.idBook, firstName: author.firstName, lastName: author.lastName } })
    setShowForm(true)
  }

  async function handleSubmit(values: AuthorFormValues) {
    if (editing) {
      await updateAuthor(editing.group.representativeId, values)
    } else {
      await createAuthor(values)
    }
    setShowForm(false)
    await loadAuthors()
  }

  async function handleDelete(group: AuthorGroup) {
    if (!confirm(`¿Eliminar a ${group.firstName} ${group.lastName}?`)) return
    await deleteAuthor(group.representativeId)
    await loadAuthors()
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Autores</h1>
        <button
          onClick={startCreate}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Agregar autor
        </button>
      </div>

      {showForm && (
        <AuthorForm
          submitLabel={editing ? 'Actualizar autor' : 'Crear autor'}
          initialValues={editing ? editing.values : emptyForm}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <Spinner />
      ) : (
        <>
          <ul className="space-y-3">
            {visibleAuthors.map((author) => (
              <AuthorListItem
                key={`${author.firstName}-${author.lastName}`}
                author={author}
                onEdit={() => startEdit(author)}
                onDelete={() => handleDelete(author)}
              />
            ))}
          </ul>
          <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
        </>
      )}
    </section>
  )
}
