import { ObjectId } from "mongoose"
import { Service } from "typedi"
import ITransaction from "../interfaces/transaction"
import TransactionRepository from "../repositories/transactionRepository"

@Service()
class TransactionService {
  
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async getTransactions (userId: string | ObjectId): Promise<object> {
    return await this.transactionRepository.getTransactions(userId)
  }

  async getTransactionsByAccount (userId: string | ObjectId, accountId: string | ObjectId): Promise<object> {
    return await this.transactionRepository.getTransactionsByAccount(userId, accountId)
  }

  async getTransaction (id: string): Promise<object> {
    return await this.transactionRepository.getTransaction(id)
  }

  async newTransaction (transaction: ITransaction): Promise<object> {
    return await this.transactionRepository.newTransaction(transaction)
  }

  async updateTransaction (id: string, transaction: ITransaction): Promise<object> {
    return await this.transactionRepository.updateTransaction(id, transaction)
  }

  async removeTransaction (id: string): Promise<object> {
    return await this.transactionRepository.removeTransaction(id)
  }

}

export default TransactionService
