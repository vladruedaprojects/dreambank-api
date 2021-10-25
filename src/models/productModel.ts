import { Schema, model, Model } from 'mongoose';
import IProduct from '../interfaces/product'

const ProductSchema: Schema = new Schema<IProduct>({
  productType: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
  
})

const ProductModel: Model<IProduct> = model<IProduct>('Product', ProductSchema)

export default ProductModel
