import { lazy, Suspense } from 'react'
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { Navbar } from './modules/shared/components/Navbar'
import { Spinner } from './modules/shared/components/Spinner'

const BooksPage = lazy(() =>
  import('./modules/books/pages/BooksPage').then((m) => ({ default: m.BooksPage })),
)
const BookDetailPage = lazy(() =>
  import('./modules/books/pages/BookDetailPage').then((m) => ({ default: m.BookDetailPage })),
)
const AuthorsPage = lazy(() =>
  import('./modules/authors/pages/AuthorsPage').then((m) => ({ default: m.AuthorsPage })),
)

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
