import { Request, Response } from "express"
import { Service } from "typedi"
import IRequestProduct from "../interfaces/requestProduct"
import RequestProductService from "../services/requestProductService"

@Service()
class RequestProductController {
  private requestProductService: RequestProductService

  constructor(requestProductService: RequestProductService) {
    this.requestProductService = requestProductService
  }

  async getRequestProducts (req: Request, res: Response) : Promise<object> {
    try {
      const requestProducts = await this.requestProductService.getRequestProducts()

      return res.status(200).send(requestProducts)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query requestProducts', type: 'server' })
    }
  }

  async getRequestProduct (req: Request, res: Response) : Promise<object> {
    const id = req.params.requestProductId

    try {
      const requestProduct = await this.requestProductService.getRequestProduct(id)

      return res.status(200).send(requestProduct)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query requestProducts', type: 'server' })
    }
  }

  async newRequestProduct (req: Request, res: Response) : Promise<object> {
    const requestProduct: IRequestProduct = req.body

    try {
      const requestProductCreated = await this.requestProductService.newRequestProduct(requestProduct)

      return res.status(200).send(requestProductCreated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query requestProducts', type: 'server' })
    }
  }

  async updateRequestProduct (req: Request, res: Response) : Promise<object> {
    const requestProduct: IRequestProduct = req.body
    const id = req.params.requestProductId

    try {
      const requestProductUpdated = await this.requestProductService.updateRequestProduct(id, requestProduct)

      return res.status(200).send(requestProductUpdated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query requestProducts', type: 'server' })
    }
  }

  async removeRequestProduct (req: Request, res: Response) : Promise<object> {
    const id = req.params.requestProductId

    try {
      const requestProduct = await this.requestProductService.removeRequestProduct(id)

      return res.status(200).send(requestProduct)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query requestProducts', type: 'server' })
    }
  }
  
}

export default RequestProductController
