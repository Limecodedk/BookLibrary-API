import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBookContext } from '../../providers/BookProvider';
import { imageUrl } from '../../APIConfig';

const BookDetails = () => {
  const { bookId } = useParams();
  const { findBookById } = useBookContext();
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setBook(await findBookById(bookId));
    }
    fetchData();
  }, []);

  return (
    <section className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={`${imageUrl}/${book?.imageCover}`} className='img-fluid' alt='book image cover' />
        </div>
        <div className='col-md-6'>
          <h1>{`${book?.title}`}</h1>
          <p>{`${book?.author}`}</p>
          <p>{`${book?.description}`}</p>
        </div>
      </div>
    </section >
  )
}

export default BookDetails