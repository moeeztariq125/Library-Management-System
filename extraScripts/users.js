import bcrypt from 'bcryptjs'
import fs from 'fs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
    books_borrowed: [],
  },
  {
    name: 'John Doe',
    email: 'John@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
    books_borrowed: [],
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
    books_borrowed: [],
  },
]

export default users
