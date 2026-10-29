import { httpClient } from '../../../api/httpClient'
import type { PagedResponse } from '../../shared/types'
import type { Author, AuthorFormValues } from '../types'

const MAX_PAGE_SIZE = 50

export async function getAuthorsPage(pageNumber: number, pageSize = MAX_PAGE_SIZE) {
  const { data } = await httpClient.get<PagedResponse<Author>>('/api/authors', {
    params: { pageNumber, pageSize },
  })
  return data
}

export async function getAllAuthors() {
  const authors: Author[] = []
  const firstPage = await getAuthorsPage(1, MAX_PAGE_SIZE)
  authors.push(...firstPage.items)

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const nextPage = await getAuthorsPage(page, MAX_PAGE_SIZE)
    authors.push(...nextPage.items)
  }

  return authors
}

export async function getAuthor(id: number) {
  const { data } = await httpClient.get<Author>(`/api/authors/${id}`)
  return data
}

export async function getAuthorsByBook(bookId: number) {
  const { data } = await httpClient.get<Author[]>(`/api/authors/by-book/${bookId}`)
  return data
}

export async function createAuthor(values: AuthorFormValues) {
  const { data } = await httpClient.post<Author>('/api/authors', values)
  return data
}

export async function updateAuthor(id: number, values: AuthorFormValues) {
  const { data } = await httpClient.put<Author>(`/api/authors/${id}`, values)
  return data
}

export async function deleteAuthor(id: number) {
  await httpClient.delete(`/api/authors/${id}`)
}
