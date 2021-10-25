import { Service } from "typedi"
import ITransaction from "../interfaces/transaction"
import TransactionModel from "../models/transactionModel"

@Service()
class TransactionRepository {
  async getTransactions (): Promise<object> {
    return await TransactionModel.find({})
  }

  async getTransaction (id: string): Promise<object> {
    try {
      const transaction = await TransactionModel.findById({ id })
      return { transaction }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async newTransaction (transactionReq: ITransaction): Promise<object> {
    const transaction = new TransactionModel(transactionReq)

    try {
      const transactionStored = await transaction.save()
      return { transaction: transactionStored }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateTransaction (id: string, transactionReq: ITransaction): Promise<object> {
    try {
      const transactionUpdated = await TransactionModel.findByIdAndUpdate(id, transactionReq, { new: true })
      return { transaction: transactionUpdated }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async removeTransaction (id: string): Promise<object> {
    try {
      const transaction = await TransactionModel.findById(id)

      if (transaction) {
        const transactionRemoved = await transaction.remove()
        return { transaction: transactionRemoved }
      }
      throw new Error('Transaction Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default TransactionRepository
