import type { Author, AuthorGroup } from './types'

/**
 * La API externa modela cada fila de Author como "una persona escribió un libro",
 * así que agrupamos por nombre para mostrar cuántos libros tiene cada autor.
 */
export function groupAuthorsByName(authors: Author[]): AuthorGroup[] {
  const groups = new Map<string, AuthorGroup>()

  for (const author of authors) {
    const key = `${author.firstName}|${author.lastName}`
    const existing = groups.get(key)

    if (existing) {
      existing.bookCount += 1
    } else {
      groups.set(key, {
        firstName: author.firstName,
        lastName: author.lastName,
        bookCount: 1,
        representativeId: author.id,
      })
    }
  }

  return Array.from(groups.values())
}
