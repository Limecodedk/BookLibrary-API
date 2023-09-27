import { useState } from "react"
import { useBookContext } from "../../providers/BookProvider";
import InfoModal from "../modal/InfoModal";
import { Link } from "react-router-dom";

const AddBook = () => {
  const { addBook } = useBookContext();
  const [book, setBook] = useState({ title: undefined, author: undefined, rating: undefined, description: undefined, imageCover: null, file: null });
  const [postResult, setPostResult] = useState();

  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.name === "file" ? event.target.files[0] : event.target.value;

    setBook(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const handleSubmit = async () => {
      const result = await addBook(book);
      setPostResult(result);
      event.target.reset();
      document.getElementById("infoModalButton").click();
    }
    handleSubmit();
  }

  return (
    <>
      <section className="container-fluid">
        <div className="row">
          <div className="col">
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" required />
                <div id="titleHelp" className="form-text">The title on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="author">Author</label>
                <input type="text" className="form-control" id="author" name="author" required />
                <div id="authorHelp" className="form-text">The author on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="rating">Rating</label>
                <input type="text" className="form-control" id="rating" name="rating" required />
                <div id="ratingHelp" className="form-text">The rating on the book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" row={6} required></textarea>
                <div id="descriptionHelp" className="form-text">The description on book</div>
              </div>
              <div className="mb-3">
                <label htmlFor="image">ImageCover</label>
                <input type="file" className="form-control" accept="image/*" id="image" name="file" required />
                <div id="imageHelp" className="form-text">The Image Cover on book</div>
              </div>
              <Link to='/' className="btn btn-outline-primary me-3" >Annullere</Link>
              <button type="submit" className="btn btn-outline-primary">Save</button>
            </form>
          </div>
        </div>
      </section>
      <InfoModal title='Book Added' message={`The book ${postResult?.title} with an id: ${postResult?.id} has been added.`} />
    </>
  )
}

export default AddBook