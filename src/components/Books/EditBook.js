import { Link, useNavigate, useParams } from "react-router-dom"
import { useBookContext } from "../../providers/BookProvider";
import { useEffect, useState } from "react";
import InfoModal from "../modal/InfoModal";
import Books from "./Books";

const EditBook = () => {
  const { bookId } = useParams();
  const { findBookById, editBook } = useBookContext();
  const navigate = useNavigate();
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setBook(await findBookById(bookId));
    }
    fetchData();
  }, []);

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setBook(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formSubmit = async () => {
      const result = await editBook(bookId, book);
      if (result == 204) {
        document.getElementById("infoModalButton").click();
      }
    }
    formSubmit();
  }

  const handleInfoModalConfirm = () => {
    navigate("/");
  }

  return (
    <>
      <section className="container-fluid">
        <div className="row">
          <div className="col">
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" defaultValue={book?.title} required />
                <div id="titleHelp" className="form-text">The title on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="author">Author</label>
                <input type="text" className="form-control" id="author" name="author" defaultValue={book?.author} required />
                <div id="authorHelp" className="form-text">The author on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="rating">Rating</label>
                <input type="text" className="form-control" id="rating" name="rating" defaultValue={book?.rating} required />
                <div id="ratingHelp" className="form-text">The rating on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" row={6} defaultValue={book?.description} required></textarea>
                <div id="descriptionHelp" className="form-text">The description on book</div>
              </div>
              <Link to='/' className="btn btn-outline-primary me-3" >Annullere</Link>
              <button type="submit" className="btn btn-outline-primary">Save</button>
            </form>
          </div>
        </div>
      </section>
      <InfoModal title="Book Edit" message={`The Book ${book?.title} has been edited.`} onConfirm={handleInfoModalConfirm} />
    </>
  )
}

export default EditBook