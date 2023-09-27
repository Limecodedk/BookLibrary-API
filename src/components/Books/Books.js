import { Link } from 'react-router-dom';
import { useBookContext } from '../../providers/BookProvider'
import AddBook from './AddBook';
import ConfirmationModal from '../modal/ConfirmationModal';
import { useState } from 'react';

const Books = () => {
  const { books, removeBook } = useBookContext();
  const [bookId, setBookId] = useState();

  const handleDeleteItemSelected = (event) => {
    const bookId = event.target.dataset.bookId;
    setBookId(bookId);
    document.getElementById("confirmationModalButton").click();
  }

  const handleDeleteBook = () => {
    const handleDelete = async () => {
      const result = await removeBook(bookId);
    }
    handleDelete();
  }

  return (
    <>
      {/*   <AddBook /> */}
      <table className='table table-striped mt-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {
            books?.map((b, index) => (
              <tr key={index}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.description.slice(0, 100)}</td>
                <td>{b.author}</td>
                <td>{b.rating}</td>
                <td>
                  <Link className="btn btn-outline-primary me-3" to={`/book/details/${b.id}`} >Read more</Link>
                  <Link className="btn btn-outline-warning" to={`/book/edit/${b.id}`}>Edit</Link>
                  <button className="btn btn-outline-danger" data-book-id={b.id} onClick={handleDeleteItemSelected}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table >
      <Link className="btn btn-outline-primary" to={`/book/addbook`}>Add new book</Link>
      <ConfirmationModal title='Delete Book' message={`Are you sure you wish to delete the book with an id ${bookId}?`} onConfirm={handleDeleteBook} />
    </>
  )
}

export default Books