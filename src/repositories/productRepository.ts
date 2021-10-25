import { Service } from "typedi"
import IProduct from "../interfaces/product"
import ProductModel from "../models/productModel"

@Service()
class ProductRepository {
  async getProducts (): Promise<object> {
    return await ProductModel.find({})
  }

  async getProduct (id: string): Promise<object> {
    try {
      const product = await ProductModel.findById({ id })
      return { product }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async newProduct (productReq: IProduct): Promise<object> {
    const product = new ProductModel(productReq)

    try {
      const productStored = await product.save()
      return { product: productStored }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProduct (id: string, productReq: IProduct): Promise<object> {
    try {
      const productUpdated = await ProductModel.findByIdAndUpdate(id, productReq, { new: true })
      return { product: productUpdated }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async removeProduct (id: string): Promise<object> {
    try {
      const product = await ProductModel.findById(id)

      if (product) {
        const productRemoved = await product.remove()
        return { product: productRemoved }
      }
      throw new Error('Product Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default ProductRepository
