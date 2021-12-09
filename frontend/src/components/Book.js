import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Book = ({ book }) => {
  return (
    <Card>
      <Link to={`/book/${book._id}`}>
        <Card.Img
          src={book.thumbnailUrl}
          style={{
            width: '15vw',
            height: '100%',
            objectFit: 'cover',
          }}
        ></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/book/${book._id}`}>
          <Card.Title as='div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
        <Rating value={book.rating} />
      </Card.Body>
    </Card>
  )
}

export default Book
