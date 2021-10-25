import { Document } from 'mongoose'

interface IUser extends Document {
  idCard: string
  name: string
  email: string
  password: string,
  avatar: string
}

export default IUser
