import { ObjectId } from "mongoose"
import { Service } from "typedi"
import ITransaction from "../interfaces/transaction"
import TransactionRepository from "../repositories/transactionRepository"

@Service()
class TransactionService {
  
  constructor(private readonly transactionRepository: TransactionRepository) { }

  async getTransactions (userId: string | ObjectId): Promise<ITransaction[] | null> {
    return await this.transactionRepository.getTransactions(userId)
  }

  async getTransactionsByAccount (userId: string | ObjectId, accountId: string | ObjectId): Promise<ITransaction[] | null> {
    return await this.transactionRepository.getTransactionsByAccount(userId, accountId)
  }

  async getTransactionsAverage (
    userId: string | ObjectId,
    accountId: string | ObjectId,
    fromDate: string,
    toDate: string): Promise<number> {

      return await this.transactionRepository.getTransactionsAverage(userId, accountId, fromDate, toDate)
  }

  async getTransaction (id: string): Promise<ITransaction | null> {
    return await this.transactionRepository.getTransaction(id)
  }

  async newTransaction (transaction: ITransaction): Promise<ITransaction | null> {
    return await this.transactionRepository.newTransaction(transaction)
  }

  async updateTransaction (id: string, transaction: ITransaction): Promise<ITransaction | null> {
    return await this.transactionRepository.updateTransaction(id, transaction)
  }

  async removeTransaction (id: string): Promise<ITransaction | null> {
    return await this.transactionRepository.removeTransaction(id)
  }

}

export default TransactionService
