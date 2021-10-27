import { Service } from "typedi"
import IProduct from "../interfaces/product"
import ProductModel from "../models/productModel"

@Service()
class ProductRepository {
  async getProducts (): Promise<IProduct[]> {
    return await ProductModel.find({})
  }

  async getProduct (id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id)
  }

  async newProduct (productReq: IProduct): Promise<IProduct | null> {
    const product = new ProductModel(productReq)

    return await product.save()
  }

  async updateProduct (id: string, productReq: IProduct): Promise<IProduct | null> {
      return await ProductModel.findByIdAndUpdate(id, productReq, { new: true })
  }

  async removeProduct (id: string): Promise<IProduct | null> {
    // eslint-disable-next-line no-useless-catch
    try {
      const product = await ProductModel.findById(id)

      if (product) {
        const productRemoved = await product.remove()
        return productRemoved
      }
      throw new Error('Product Not found')
    } catch (error) {
      throw error
    }
  }
}

export default ProductRepository
