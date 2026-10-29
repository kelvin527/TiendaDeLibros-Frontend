import { useState, type FormEvent } from 'react'
import type { AuthorFormValues } from '../types'

interface AuthorFormProps {
  initialValues: AuthorFormValues
  submitLabel: string
  onSubmit: (values: AuthorFormValues) => Promise<void>
  onCancel: () => void
}

export function AuthorForm({ initialValues, submitLabel, onSubmit, onCancel }: AuthorFormProps) {
  const [values, setValues] = useState(initialValues)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={values.firstName}
            onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Apellido</label>
          <input
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">ID del libro</label>
        <input
          type="number"
          min={1}
          required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={values.idBook}
          onChange={(e) => setValues({ ...values, idBook: Number(e.target.value) })}
        />
        <p className="mt-1 text-xs text-slate-500">
          Cada registro de autor representa la autoría de un libro específico.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? 'Guardando…' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
