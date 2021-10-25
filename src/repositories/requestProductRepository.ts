import { Service } from "typedi"
import IRequestProduct from "../interfaces/requestProduct"
import RequestProductModel from "../models/requestProductModel"

@Service()
class RequestProductRepository {
  async getRequestProducts (): Promise<object> {
    return await RequestProductModel.find({})
  }

  async getRequestProduct (id: string): Promise<object> {
    try {
      const requestProduct = await RequestProductModel.findById({ id })
      return { requestProduct }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async newRequestProduct (requestProductReq: IRequestProduct): Promise<object> {
    const requestProduct = new RequestProductModel(requestProductReq)

    try {
      const requestProductStored = await requestProduct.save()
      return { requestProduct: requestProductStored }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateRequestProduct (id: string, requestProductReq: IRequestProduct): Promise<object> {
    try {
      const requestProductUpdated = await RequestProductModel.findByIdAndUpdate(id, requestProductReq, { new: true })
      return { requestProduct: requestProductUpdated }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async removeRequestProduct (id: string): Promise<object> {
    try {
      const requestProduct = await RequestProductModel.findById(id)

      if (requestProduct) {
        const requestProductRemoved = await requestProduct.remove()
        return { requestProduct: requestProductRemoved }
      }
      throw new Error('RequestProduct Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default RequestProductRepository
