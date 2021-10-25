import mongoose, { Schema, model, Model } from 'mongoose';
import IRequestProduct from '../interfaces/requestProduct'

const RequestProductSchema: Schema = new Schema<IRequestProduct>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cellphone: {
    type: String,
    required: true
  },
  monthlyIncome: {
    type: Number,
    default: 0
  }
  
},
{
  timestamps: true
})

const RequestProductModel: Model<IRequestProduct> = model<IRequestProduct>('RequestProduct', RequestProductSchema)

export default RequestProductModel
