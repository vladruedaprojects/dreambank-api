import { Schema, model, Model } from 'mongoose';
import IUser from '../interfaces/userInterface'
import bcrypt from 'bcrypt-nodejs'

export interface IUserModel extends IUser {
  comparePassword(password: string): boolean
}

const UserSchema: Schema = new Schema<IUser>({
  idCard: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
  }
  
})

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  if (!user.isModified('password')) {
    return next()
  }
      
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, null, (e, hash) => {
      if (e) {
        return next(e)
      }

      user.password = hash
      next()
    })
  })
})

UserSchema.method('comparePassword', function (password: string): boolean {
  if (bcrypt.compareSync(password, this.password)) return true
  return false
})

const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema)

export default UserModel
