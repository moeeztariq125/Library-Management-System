import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBooks, deleteBook, createBook } from '../actions/bookActions'
import { BOOK_CREATE_RESET } from '../constants/bookConstants'

const BookListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books } = bookList

  const bookDelete = useSelector((state) => state.bookDelete)
  const { loading: loadingDelete, errorDelete, successDelete } = bookDelete

  const bookCreate = useSelector((state) => state.bookCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo !== null) {
      dispatch({ type: BOOK_CREATE_RESET })
      if (!userInfo.isAdmin) {
        history.push('/')
      }
      if (successCreate) {
        history.push(`/admin/book/${createdBook.data._id}/edit`)
      } else {
        dispatch(listBooks())
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdBook])

  const deleteHandler = (bookid) => {
    if (window.confirm('Are you Sure?')) {
      dispatch(deleteBook(bookid))
    }
  }

  const createBookHandler = (book) => {
    dispatch(createBook())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Books</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBookHandler}>
            <i className='fas fa-plus'></i>Add Book
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>TOTAL QUANTITY</th>
              <th>QUANTITY AVAILABLE</th>
              <th>CATEGORIES</th>
              <th>PAGE COUNT</th>
              <th>AUTHORS</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>{book.quantity_available}</td>
                <td>{book.quantity_available}</td>
                <td>
                  {book.categories.map((category) => (
                    <p>{category}</p>
                  ))}
                </td>
                <td>{book.pageCount}</td>
                <td>
                  {book.authors.map((author) => (
                    <p>{author}</p>
                  ))}
                </td>

                <td>
                  <LinkContainer to={`/admin/book/${book._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => {
                      deleteHandler(book._id)
                    }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookListScreen
