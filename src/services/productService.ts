import { Service } from "typedi"
import IProduct from "../interfaces/product"
import ProductRepository from "../repositories/productRepository"

@Service()
class ProductService {
  
  constructor(private readonly productRepository: ProductRepository) { }

  async getProducts (): Promise<IProduct[]> {
    return await this.productRepository.getProducts()
  }

  async getProduct (id: string): Promise<IProduct | null> {
    return await this.productRepository.getProduct(id)
  }

  async newProduct (product: IProduct): Promise<IProduct | null> {
    return await this.productRepository.newProduct(product)
  }

  async updateProduct (id: string, product: IProduct): Promise<IProduct | null> {
    return await this.productRepository.updateProduct(id, product)
  }

  async removeProduct (id: string): Promise<IProduct | null> {
    return await this.productRepository.removeProduct(id)
  }

}

export default ProductService
