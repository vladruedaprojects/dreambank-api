import { ObjectId } from "mongoose"
import { Service } from "typedi"
import ITransaction from "../interfaces/transaction"
import TransactionModel from "../models/transactionModel"

@Service()
class TransactionRepository {
  async getTransactions (userId: string | ObjectId): Promise<ITransaction[]> {
    return await TransactionModel.find({ user: userId })
  }

  async getTransactionsByAccount (userId: string | ObjectId, accountId: string | ObjectId): Promise<ITransaction[] | null> {
    return await TransactionModel.find({ user: userId, account: accountId })
  }

  async getTransaction (id: string): Promise<ITransaction | null> {
    return TransactionModel.findById(id)
  }

  async newTransaction (transactionReq: ITransaction): Promise<ITransaction | null> {
    try {
      const transaction = new TransactionModel(transactionReq)

      return await transaction.save()
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async updateTransaction (id: string, transactionReq: ITransaction): Promise<ITransaction | null> {
    return await TransactionModel.findByIdAndUpdate(id, transactionReq, { new: true })
  }

  async removeTransaction (id: string): Promise<ITransaction | null> {
    try {
      const transaction = await TransactionModel.findById(id)

      if (transaction) {
        const transactionRemoved = await transaction.remove()
        return transactionRemoved
      }
      throw new Error('Transaction Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default TransactionRepository
