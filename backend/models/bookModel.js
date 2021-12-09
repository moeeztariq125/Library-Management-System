import mongoose from 'mongoose'

// Book Schema
const bookSchema = mongoose.Schema({
  isbn: { type: String },
  title: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: String,
      required: true,
    },
  ],
  shortDescription: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  authors: [
    {
      type: String,
    },
  ],
  pageCount: {
    type: Number,
  },
  thumbnailUrl: {
    type: String,
  },
  quantity_available: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },

  quantity_total: {
    type: Number,
    required: true,
    default: 0,
  },
  borrowedBy: [
    {
      type: String,
      unique: true,
    },
  ],
})

const Books = mongoose.model('Books', bookSchema, 'Books')
export default Books
