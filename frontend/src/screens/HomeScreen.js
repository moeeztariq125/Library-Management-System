import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Book from '../components/Book'
import { useEffect } from 'react'
import { listBooks } from '../actions/bookActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books } = bookList

  useEffect(() => {
    dispatch(listBooks())
  }, [dispatch])
  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
