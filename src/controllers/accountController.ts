import { Request, Response } from "express"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import AccountService from "../services/accountService"

@Service()
class AccountController {
  private accountService: AccountService

  constructor(accountService: AccountService) {
    this.accountService = accountService
  }

  async getAccounts (req: Request, res: Response) : Promise<object> {
    const userId = res.locals.user._id

    try {
      const accounts = await this.accountService.getAccounts(userId)

      return res.status(200).send(accounts)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query accounts', type: 'server' })
    }
  }

  async getAccount (req: Request, res: Response) : Promise<object> {
    const id = req.params.accountId

    try {
      const account = await this.accountService.getAccount(id)

      return res.status(200).send(account)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query accounts', type: 'server' })
    }
  }

  async newAccount (req: Request, res: Response) : Promise<object> {
    const account: IAccount = req.body

    try {
      const accountCreated = await this.accountService.newAccount(account)

      return res.status(200).send(accountCreated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query accounts', type: 'server' })
    }
  }

  async updateAccount (req: Request, res: Response) : Promise<object> {
    const account: IAccount = req.body
    const id = req.params.accountId

    try {
      const accountUpdated = await this.accountService.updateAccount(id, account)

      return res.status(200).send(accountUpdated)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query accounts', type: 'server' })
    }
  }

  async removeAccount (req: Request, res: Response) : Promise<object> {
    const id = req.params.accountId

    try {
      const account = await this.accountService.removeAccount(id)

      return res.status(200).send(account)
    } catch (error) {
      return res.status(500).send({ message: 'Server error - query accounts', type: 'server' })
    }
  }
  
}

export default AccountController
