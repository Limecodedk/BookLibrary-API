import { createContext, useState, useEffect, useContext } from "react";
import { baseUrl } from "../APIConfig";


const BookContext = createContext();

export const useBookContext = () => {
  const context = useContext(BookContext);
  return context;
}

/* GET */
const getBooks = async () => {
  const result = await fetch(`${baseUrl}/library`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
  return await result.json();
}

//GET By ID
const getBookById = async (id) => {
  const result = await fetch(`${baseUrl}/library/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
  return await result.json();
}

//POST
const postBook = async (book) => {

  const form = new FormData();
  for (const [key, value] of Object.entries(book)) {
    form.append(key, value);
  }

  const result = await fetch(`${baseUrl}/library`, {
    method: "POST",
    body: form
  });
  return await result.json();
}

//PUT
const putBook = async (id, book) => {
  const result = await fetch(`${baseUrl}/library/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(book)
  });
  if (result.ok) {
    return result.status;
  }
  else {
    throw new Error("There was an error with the PUT request. Contact your admin.");
  }
}

//Delete 
const deleteBook = async (id) => {
  const result = await fetch(`${baseUrl}/library/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
  return await result.json();
}


export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState();

  const findBookById = async (id) => {
    return await getBookById(id);
  }

  const addBook = async (book) => {
    const newBook = await postBook(book);
    setBooks(prevValue => ([
      ...prevValue,
      newBook
    ]));
    return newBook;
  }

  const editBook = async (id, book) => {
    const result = await putBook(id, book);

    if (result === 204) {
      const UpdatedBooks = books.map(b => b.id === Number(id) ? book : b);
      setBooks(UpdatedBooks);
    }
    return result;
  }


  const removeBook = async (id) => {
    const deletedBook = await deleteBook(id);
    setBooks(prevValue => prevValue.filter(b => b.id !== deletedBook.id));
    return deleteBook;
  }

  useEffect(() => {
    const fetchData = async () => {
      setBooks(await getBooks());
    }
    fetchData();
  }, []);

  return (
    <BookContext.Provider value={{ books, findBookById, addBook, removeBook, editBook }}>
      {children}
    </BookContext.Provider>
  )
}