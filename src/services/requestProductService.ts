import { Service } from "typedi"
import IRequestProduct from "../interfaces/requestProduct"
import RequestProductRepository from "../repositories/requestProductRepository"

@Service()
class RequestProductService {
  
  constructor(private readonly requestProductRepository: RequestProductRepository) { }

  async getRequestProducts (): Promise<IRequestProduct[]> {
    return await this.requestProductRepository.getRequestProducts()
  }

  async getRequestProduct (id: string): Promise<IRequestProduct | null> {
    return await this.requestProductRepository.getRequestProduct(id)
  }

  async newRequestProduct (requestProduct: IRequestProduct): Promise<IRequestProduct | null> {
    return await this.requestProductRepository.newRequestProduct(requestProduct)
  }

  async updateRequestProduct (id: string, requestProduct: IRequestProduct): Promise<IRequestProduct | null> {
    return await this.requestProductRepository.updateRequestProduct(id, requestProduct)
  }

  async removeRequestProduct (id: string): Promise<IRequestProduct | null> {
    return await this.requestProductRepository.removeRequestProduct(id)
  }

}

export default RequestProductService
