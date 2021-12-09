import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Book from '../components/Book'
import { useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
import { listBooks } from '../actions/bookActions'

const BorrowedBooksScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const bookList = useSelector((state) => state.bookList)
  const { books, success } = bookList

  useEffect(() => {
    if (userInfo === null) {
      history.push('/')
    }
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      dispatch(listBooks())
      dispatch(getUserDetails())
    }
  }, [dispatch, history, userInfo, user])

  if (loading) {
    return <Loader />
  } else if (error) {
    ;<Message variant='danger'>{error}</Message>
  } else if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
    return (
      <div>
        <h1>You Borrowed</h1>
        {success ? (
          <Row>
            {user.books_borrowed.map((bookid) => (
              <Col key={bookid} sm={12} md={6} lg={4} xl={3}>
                <Book book={books.find((ele) => ele._id === bookid)} />
              </Col>
            ))}
          </Row>
        ) : (
          <Loader />
        )}
      </div>
    )
  } else return <div></div>
}

export default BorrowedBooksScreen
