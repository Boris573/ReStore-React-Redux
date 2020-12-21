
const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId
  }
}

const booksError = (err) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: err
  };
};

export const bookRemovedFromCart = (bookId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: bookId
  }
}

export const allBooksRemovedFromCart = (bookId) => {
  return {
    type: 'ALL_BOOKS_REMOVED_FROM_CART',
    payload: bookId
  }
}

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(booksRequested());
        bookstoreService.getBooks()
          .then((data) => dispatch(booksLoaded(data)))
          .catch((err) => dispatch(booksError(err)))
}

export {
  fetchBooks
};
