import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getborrowers } from '../actions/bookActions'

const BookBorrowersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const bookBorrowers = useSelector((state) => state.bookBorrowers)
  const { loading, error, borrowers } = bookBorrowers

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo !== null) {
      if (userInfo.isAdmin) {
        dispatch(getborrowers())
      } else {
        history.push('/')
      }
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Link to='/' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <h1>Book Borrowers</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover className='table-sm'>
          <thead>
            <tr>
              <th>Name</th>
              <th>ThumbNail</th>
              <th>Borrowers</th>
            </tr>
          </thead>
          <tbody>
            {borrowers.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>
                  <Card.Img
                    src={book.thumbnailUrl}
                    alt={book.title}
                    style={{
                      width: '15vw',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  ></Card.Img>
                </td>
                <td>
                  <ul>
                    {book.borrowedBy.map((b) => (
                      <li key='{b}'>{b}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BookBorrowersScreen
