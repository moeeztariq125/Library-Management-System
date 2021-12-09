import express from 'express'
const router = express.Router()
import {
  getbooks,
  getbookbyId,
  deleteBook,
  updateBook,
  createBook,
  getBorrowers,
  updateBorrowersOnBorrow,
  updateBorrowersOnReturn,
} from '../controllers/bookController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getbooks).post(protect, admin, createBook)
router.route('/borrowers').get(protect, admin, getBorrowers)
router
  .route('/:id')
  .get(getbookbyId)
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook)

router.route('/:id/borrowers').get(protect, updateBorrowersOnBorrow)
router.route('/:id/return').get(protect, updateBorrowersOnReturn)

export default router
