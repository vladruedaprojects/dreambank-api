import { Document, ObjectId } from 'mongoose'

interface ITransaction extends Document {
  user: string | ObjectId
  account: string | ObjectId
  description: string
  amount: number
  balance: number
  createdAt: number
  updatedAt: number
}

export default ITransaction
