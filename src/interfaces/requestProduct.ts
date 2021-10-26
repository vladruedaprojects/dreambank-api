import { Document, ObjectId } from 'mongoose'

interface IRequestProduct extends Document {
  product: string | ObjectId
  user: string | ObjectId
  cellphone: string
  monthlyIncome: number
  status: boolean
  createdAt: number
  updatedAt: number
}

export default IRequestProduct
