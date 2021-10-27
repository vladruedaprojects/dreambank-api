import { Service } from "typedi"
import IRequestProduct from "../interfaces/requestProduct"
import RequestProductModel from "../models/requestProductModel"

@Service()
class RequestProductRepository {
  async getRequestProducts (): Promise<IRequestProduct[]> {
    return await RequestProductModel.find({})
  }

  async getRequestProduct (id: string): Promise<IRequestProduct | null> {
    return await RequestProductModel.findById(id)
  }

  async newRequestProduct (requestProductReq: IRequestProduct): Promise<IRequestProduct | null> {
    const requestProduct = new RequestProductModel(requestProductReq)

    return await requestProduct.save()
  }

  async updateRequestProduct (id: string, requestProductReq: IRequestProduct): Promise<IRequestProduct | null> {
    return await RequestProductModel.findByIdAndUpdate(id, requestProductReq, { new: true })
  }

  async removeRequestProduct (id: string): Promise<IRequestProduct | null> {
    try {
      const requestProduct = await RequestProductModel.findById(id)

      if (requestProduct) {
        const requestProductRemoved = await requestProduct.remove()
        return requestProductRemoved
      }
      throw new Error('RequestProduct Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default RequestProductRepository
