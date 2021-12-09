import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBookDetails, updateBook } from '../actions/bookActions'
import FormContainer from './FormContainer'
import { BOOK_UPDATE_RESET } from '../constants/bookConstants'

const BookEditScreen = ({ match, history }) => {
  const bookId = match.params.id
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [categories, setCategories] = useState([])
  const [sdesc, setSdesc] = useState('')
  const [ldesc, setLdesc] = useState('')
  const [authors, setAuthors] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [thumbURL, setThumbURL] = useState('')
  const [qtyavail, setQtyavail] = useState(0)
  const [rating, setRating] = useState(0)
  const [pubData, setPubData] = useState(Date('22-2-2'))

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const bookDetails = useSelector((state) => state.bookDetails)
  const { loading, error, book } = bookDetails

  const bookUpdate = useSelector((state) => state.bookUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET })
      history.push('/admin/booklist')
    } else {
      if (userInfo && userInfo.isAdmin) {
        if (!book.title || book._id !== bookId) {
          dispatch(listBookDetails(bookId))
        } else {
          setTitle(book.title)
          setIsbn(book.isbn)
          setCategories(book.categories)
          setSdesc(book.sdesc)
          setLdesc(book.ldesc)
          setAuthors(book.authors)
          setPageCount(book.pageCount)
          setThumbURL(book.thumbURL)
          setQtyavail(book.qtyavail)
          setRating(book.rating)
          setPubData(book.pubData)
        }
      } else {
        history.push('/')
      }
    }
  }, [dispatch, bookId, book, history, userInfo, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateBook({
        _id: bookId,
        title: title,
        isbn: isbn,
        categories: categories,
        shortDescription: sdesc,
        longDescription: ldesc,
        authors: authors,
        pageCount: pageCount,
        thumbnailUrl: thumbURL,
        quantity_available: qtyavail,
        rating: rating,
        publishedDate: pubData,
      })
    )
  }

  return (
    <>
      <Link to='/admin/booklist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isbn'>
              <Form.Label>ISBN </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ISBN'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='categories'>
              <Form.Label>Categories </Form.Label>

              <Form.Control
                type='text'
                label='Enter categories with spaces'
                value={categories}
                onChange={(e) => setCategories(e.target.value.split(','))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='sdesc'>
              <Form.Label>Short Description </Form.Label>

              <Form.Control
                type='text'
                label='Enter Small Description'
                value={sdesc}
                onChange={(e) => setSdesc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ldesc'>
              <Form.Label>Long Description </Form.Label>

              <Form.Control
                type='text'
                label='Enter Long Description'
                value={ldesc}
                onChange={(e) => setLdesc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='authors'>
              <Form.Label>Authors </Form.Label>

              <Form.Control
                type='text'
                label='Enter Author'
                value={authors}
                onChange={(e) => setAuthors(e.target.value.split(','))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pagecount'>
              <Form.Label>Page Count </Form.Label>

              <Form.Control
                type='number'
                label='Enter Page Count'
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ThumbURL'>
              <Form.Label>Thumbnail URL </Form.Label>

              <Form.Control
                type='text'
                label='Enter Thumbnail URL'
                value={thumbURL}
                onChange={(e) => setThumbURL(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='qtyavailable'>
              <Form.Label>Quantity Available </Form.Label>

              <Form.Control
                type='number'
                label='Enter Quantity available'
                value={qtyavail}
                onChange={(e) => setQtyavail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Rating </Form.Label>

              <Form.Control
                type='number'
                label='Enter rating'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pubdate'>
              <Form.Label>Publishing Date </Form.Label>

              <Form.Control
                type='date'
                label='Enter Publishing Date'
                value={pubData}
                onChange={(e) => setPubData(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default BookEditScreen
