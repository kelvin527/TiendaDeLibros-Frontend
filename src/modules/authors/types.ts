export interface Author {
  id: number
  idBook: number
  firstName: string
  lastName: string
}

export interface AuthorFormValues {
  idBook: number
  firstName: string
  lastName: string
}

export interface AuthorGroup {
  firstName: string
  lastName: string
  bookCount: number
  representativeId: number
}
