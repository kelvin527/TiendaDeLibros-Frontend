import { useState, type FormEvent } from 'react'
import type { BookFormValues } from '../types'

interface BookFormProps {
  initialValues: BookFormValues
  submitLabel: string
  onSubmit: (values: BookFormValues) => Promise<void>
  onCancel: () => void
}

export function BookForm({ initialValues, submitLabel, onSubmit, onCancel }: BookFormProps) {
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
      <div>
        <label className="block text-sm font-medium text-slate-700">Título</label>
        <input
          required
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Descripción</label>
        <textarea
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          rows={2}
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Cantidad de páginas</label>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={values.pageCount}
            onChange={(e) => setValues({ ...values, pageCount: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Fecha de publicación</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={values.publishDate.slice(0, 10)}
            onChange={(e) => setValues({ ...values, publishDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Extracto</label>
        <textarea
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          rows={2}
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
        />
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
