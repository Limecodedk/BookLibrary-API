import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Books from './components/Books/Books';
import { BookProvider } from './providers/BookProvider';
import BookDetails from './components/Books/BookDetails';
import AddBook from './components/Books/AddBook';
import EditBook from './components/Books/EditBook';
const App = () => {
  return (
    <BrowserRouter>
      <BookProvider>
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/book/details/:bookId' element={<BookDetails />} />
          <Route path='/book/addbook' element={<AddBook />} />
          <Route path='/book/edit/:bookId' element={<EditBook />} />
        </Routes>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;