import AsyncHandler from 'express-async-handler'
import Books from '../models/bookModel.js'
import User from '../models/userModel.js'

//@desc   fetch all books
//@route  GET /api/books
//@access Public
const getbooks = AsyncHandler(async (req, res) => {
  const books = await Books.find({})
  res.json(books)
})

//@desc   fetch all books
//@route  GET /api/books/:id
//@access Public
const getbookbyId = AsyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id)
  if (book) {
    res.json(book)
  } else {
    res.status(404).json({ message: 'book not found' })
  }
})

//@desc   get Borrower list of Book
//@route  GET /api/books/borrowers
//@access Private
const getBorrowers = AsyncHandler(async (req, res) => {
  const books = await Books.find({}).select([
    '_id',
    'borrowedBy',
    'title',
    'thumbnailUrl',
  ])
  res.send(books)
})

//@desc   delete book
//@route  DELETE /api/books/:id
//@access Private/Admin
const deleteBook = AsyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id)
  if (book) {
    await book.remove()
    res.json({
      message: 'book removed',
    })
  } else {
    res.status(404).json({ message: 'book not found' })
  }
})

//@desc   Create a book
//@route  POST /api/books
//@access Private/Admin
const createBook = AsyncHandler(async (req, res) => {
  const book = new Books({
    title: 'Sample Title',
    isbn: 'xxxxxxx',
    pageCount: 0,
    publishedDate: Date('22-2-2'),
    thumbnailUrl: 'sample URL',
    longDescription: '',
    shortDescription: '',
    authors: [],
    categories: [],
    quantity_available: 0,
    quantity_total: 0,
    borrowedBy: [],
    rating: 0,
  })
  const createdBook = await book.save()
  res.status(201).json(createdBook)
})

//@desc   Update a book
//@route  PUT /api/books/:id
//@access Private/Admin
const updateBook = AsyncHandler(async (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    longDescription,
    shortDescription,
    authors,
    categories,
    quantity_available,
    rating,
  } = req.body
  const book = await Books.findById(req.params.id)
  if (book) {
    book.title = title
    book.isbn = isbn
    book.pageCount = pageCount
    book.publishedDate = publishedDate
    book.thumbnailUrl = thumbnailUrl
    book.longDescription = longDescription
    book.shortDescription = shortDescription
    book.authors = authors
    book.categories = categories
    book.quantity_available = quantity_available
    book.quantity_total = quantity_available
    book.rating = rating
    book.borrowedBy = []
  } else {
    res.status(404).json({ message: 'book not found' })
  }

  const updatedbook = await book.save()
  res.status(201).json(updatedbook)
})

//@desc   Update Borrower list of Book on Borrow
//@route  GET /api/books/:id/borrowers
//@access Private
const updateBorrowersOnBorrow = AsyncHandler(async (req, res) => {
  const borrowedBy = req.user.id
  const book = await Books.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if (book) {
    if (book.borrowedBy.includes(borrowedBy)) {
      res.status(401).json({ message: 'Already Borrowed' })
    } else {
      book.borrowedBy = [...book.borrowedBy, borrowedBy]
      book.quantity_available = book.quantity_available - 1
      user.books_borrowed = [...user.books_borrowed, req.params.id]
    }
  } else {
    res.status(404).json({ message: 'book not found' })
  }

  await book.save()
  await user.save()

  res.status(201).json({ message: 'Book Borrowed' })
})

//@desc   Update Borrower list of Book on Return
//@route  GET /api/books/:id/return
//@access Private
const updateBorrowersOnReturn = AsyncHandler(async (req, res) => {
  const borrowedBy = req.user.id
  const book = await Books.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if (book) {
    if (book.borrowedBy.includes(borrowedBy)) {
      book.borrowedBy = book.borrowedBy.filter((e) => e !== req.user.id)

      book.quantity_available = book.quantity_available + 1
      user.books_borrowed = [...user.books_borrowed, req.params.id]
      user.books_borrowed = user.books_borrowed.filter(
        (e) => e !== req.params.id
      )
      res.status(201).json({ message: 'Book returned!' })
    } else {
      res.status(401).json({ message: "You don't have this book" })
    }
  } else {
    res.status(404).json({ message: 'book not found' })
  }

  await book.save()
  await user.save()
  res.status(201).json({ message: 'Book Borrowed' })
})

export {
  getbooks,
  getbookbyId,
  deleteBook,
  createBook,
  updateBook,
  updateBorrowersOnBorrow,
  updateBorrowersOnReturn,
  getBorrowers,
}
