import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import {
  listBookDetails,
  updateBorrowersOnReturn,
} from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateBorrowersOnBorrow } from '../actions/bookActions'
import { BOOK_BORROWERS_UPDATE_ON_BORROW_RESET } from '../constants/bookConstants'

const BookScreen = ({ match }) => {
  const dispatch = useDispatch()
  const bookDetails = useSelector((state) => state.bookDetails)
  const { loading, error, book } = bookDetails

  const bookBorrowersUpdateOnBorrow = useSelector(
    (state) => state.bookBorrowersOnBorrowUpdate
  )
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = bookBorrowersUpdateOnBorrow

  const bookBorrowersUpdateOnReturn = useSelector(
    (state) => state.bookBorrowersOnReturnUpdate
  )
  const {
    loading: updateReturnLoading,
    error: updateReturnError,
    success: Returnsuccess,
  } = bookBorrowersUpdateOnReturn

  useEffect(() => {
    dispatch(listBookDetails(match.params.id))
  }, [match.params.id, dispatch, success, Returnsuccess])

  const BorrowHandler = () => {
    dispatch(updateBorrowersOnBorrow(match.params.id))
  }

  const ReturnHandler = () => {
    dispatch(updateBorrowersOnReturn(match.params.id))
  }

  const clearStuff = () => {
    dispatch({ type: BOOK_BORROWERS_UPDATE_ON_BORROW_RESET })
  }

  return (
    <>
      {updateLoading && <Loader />}
      {success && <Message variant='success'>Book Borrowed</Message>}
      {updateError && <Message variant='danger'>{updateError}</Message>}
      {updateReturnLoading && <Loader />}
      {Returnsuccess && <Message variant='success'>Book Returned</Message>}
      {updateReturnError && (
        <Message variant='danger'>{updateReturnError}</Message>
      )}
      <Link className='btn btn-dark my-3' to='/' onClick={clearStuff}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Card.Img src={book.thumbnailUrl} alt={book.title}></Card.Img>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{book.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={book.rating} />
              </ListGroup.Item>
              <ListGroup.Item>
                <span>{`${book.quantity_available} Copies Remaining`}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Description</b>: {book.longDescription}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Quatity</Col>
                    <Col>
                      <strong>{book.quantity_available}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {book.quantity_available > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={book.quantity_available === 0}
                    onClick={BorrowHandler}
                  >
                    Borrow
                  </Button>
                  <Button
                    className='btn-block'
                    type='button'
                    onClick={ReturnHandler}
                  >
                    Return
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookScreen
