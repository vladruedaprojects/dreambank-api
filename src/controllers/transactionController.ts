import { Request, Response } from "express"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import ITransaction from "../interfaces/transaction"
import AccountService from "../services/accountService"
import TransactionService from "../services/transactionService"

@Service()
class TransactionController {
  private transactionService: TransactionService
  private accountService: AccountService

  constructor(transactionService: TransactionService, accountService: AccountService) {
    this.transactionService = transactionService
    this.accountService = accountService
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
      const account = await this.accountService.updateAccount(transaction.account, { $inc: { balance: transaction.amount}  })

      if (account) {
        transaction.balance = account.balance
        const transactionCreated = await this.transactionService.newTransaction(transaction)
        if (transactionCreated) {
          return res.status(200).send(transactionCreated)
        }
      }
      return res.status(404).send({ message: 'Resource not found', type: 'validation' })
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query transactions', error })
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
