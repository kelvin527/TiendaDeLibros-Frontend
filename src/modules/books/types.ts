export interface Book {
  id: number
  title: string
  description: string | null
  pageCount: number
  excerpt: string | null
  publishDate: string
}

export interface BookFormValues {
  title: string
  description: string
  pageCount: number
  excerpt: string
  publishDate: string
}
