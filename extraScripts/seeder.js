import User from './backend/models/userModel.js'
import users from './users.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './backend/config/db.js'

dotenv.config()

// connectDB()

const importData = async () => {
  try {
    User.deleteMany()
    console.log('cleared')
    const createdUsers = await User.insertMany(users)
    console.log('insertedd!!!')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

importData()
