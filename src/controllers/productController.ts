import { Request, Response } from "express"
import { Service } from "typedi"
import IProduct from "../interfaces/product"
import ProductService from "../services/productService"

@Service()
class ProductController {
  private productService: ProductService

  constructor(productService: ProductService) {
    this.productService = productService
  }

  async getProducts (req: Request, res: Response) : Promise<object> {
    try {
      const products = await this.productService.getProducts()

      return res.status(200).send(products)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query products', type: 'server' })
    }
  }

  async getProduct (req: Request, res: Response) : Promise<object> {
    const id = req.params.productId

    try {
      const product = await this.productService.getProduct(id)

      return res.status(200).send(product)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query products', type: 'server' })
    }
  }

  async newProduct (req: Request, res: Response) : Promise<object> {
    const product: IProduct = req.body

    try {
      const productCreated = await this.productService.newProduct(product)

      return res.status(200).send(productCreated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query products', type: 'server' })
    }
  }

  async updateProduct (req: Request, res: Response) : Promise<object> {
    const product: IProduct = req.body
    const id = req.params.productId

    try {
      const productUpdated = await this.productService.updateProduct(id, product)

      return res.status(200).send(productUpdated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query products', type: 'server' })
    }
  }

  async removeProduct (req: Request, res: Response) : Promise<object> {
    const id = req.params.productId

    try {
      const product = await this.productService.removeProduct(id)

      return res.status(200).send(product)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query products', type: 'server' })
    }
  }
  
}

export default ProductController
