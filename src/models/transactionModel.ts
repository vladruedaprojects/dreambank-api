import mongoose, { Schema, model, Model } from 'mongoose';
import ITransaction from '../interfaces/transaction'

const TransactionSchema: Schema = new Schema<ITransaction>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
})

const TransactionModel: Model<ITransaction> = model<ITransaction>('Transaction', TransactionSchema)

export default TransactionModel
