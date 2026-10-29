import { httpClient } from '../../../api/httpClient'
import type { PagedResponse } from '../../shared/types'
import type { Book, BookFormValues } from '../types'

export async function getBooks(pageNumber: number, pageSize = 10) {
  const { data } = await httpClient.get<PagedResponse<Book>>('/api/books', {
    params: { pageNumber, pageSize },
  })
  return data
}

export async function getBook(id: number) {
  const { data } = await httpClient.get<Book>(`/api/books/${id}`)
  return data
}

export async function createBook(values: BookFormValues) {
  const { data } = await httpClient.post<Book>('/api/books', values)
  return data
}

export async function updateBook(id: number, values: BookFormValues) {
  const { data } = await httpClient.put<Book>(`/api/books/${id}`, values)
  return data
}

export async function deleteBook(id: number) {
  await httpClient.delete(`/api/books/${id}`)
}
