import { Request, Response } from "express"
import { Service } from "typedi"
import ITransaction from "../interfaces/transaction"
import TransactionService from "../services/transactionService"

@Service()
class TransactionController {
  private transactionService: TransactionService

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService
  }

  async getTransactions (req: Request, res: Response) : Promise<object> {
    const userId = res.locals.user._id

    try {
      const transactions = await this.transactionService.getTransactions(userId)

      return res.status(200).send(transactions)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }

  async getTransactionsByAccount (req: Request, res: Response) : Promise<object> {
    const userId = res.locals.user._id

    try {
      const transactions = await this.transactionService.getTransactionsByAccount(userId, req.params.accountId)

      return res.status(200).send(transactions)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }

  async getTransaction (req: Request, res: Response) : Promise<object> {
    const id = req.params.transactionId

    try {
      const transaction = await this.transactionService.getTransaction(id)

      return res.status(200).send(transaction)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }

  async newTransaction (req: Request, res: Response) : Promise<object> {
    const transaction: ITransaction = req.body

    try {
      const transactionCreated = await this.transactionService.newTransaction(transaction)

      return res.status(200).send(transactionCreated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }

  async updateTransaction (req: Request, res: Response) : Promise<object> {
    const transaction: ITransaction = req.body
    const id = req.params.transactionId

    try {
      const transactionUpdated = await this.transactionService.updateTransaction(id, transaction)

      return res.status(200).send(transactionUpdated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }

  async removeTransaction (req: Request, res: Response) : Promise<object> {
    const id = req.params.transactionId

    try {
      const transaction = await this.transactionService.removeTransaction(id)

      return res.status(200).send(transaction)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', type: 'server' })
    }
  }
  
}

export default TransactionController
