import { Document } from 'mongoose'

interface IProduct extends Document {
  productType: string
  icon: string
  name: string
}

export default IProduct
