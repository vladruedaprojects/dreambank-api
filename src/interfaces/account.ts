import { Document, ObjectId } from 'mongoose'

interface IAccount extends Document {
  user: string | ObjectId
  product: string | ObjectId
  name: string
  numberName: string
  currency: string
  balance: number
  status: boolean
  createdAt: number
  updatedAt: number
}

export default IAccount
