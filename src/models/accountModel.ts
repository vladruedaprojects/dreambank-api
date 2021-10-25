import mongoose, { Schema, model, Model } from 'mongoose';
import IAccount from '../interfaces/account'

const AccountSchema: Schema = new Schema<IAccount>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  numberName: {
    type: String
  },
  currency: {
    type: String,
    default: 'USD'
  },
  balance: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
})

const AccountModel: Model<IAccount> = model<IAccount>('Account', AccountSchema)

export default AccountModel
