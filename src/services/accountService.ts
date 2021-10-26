import { ObjectId } from "mongoose"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import AccountRepository from "../repositories/accountRepository"

@Service()
class AccountService {
  
  constructor(private readonly accountRepository: AccountRepository) { }

  async getAccounts (userId: string | ObjectId): Promise<object> {
    return await this.accountRepository.getAccounts(userId)
  }

  async getAccount (id: string): Promise<object> {
    return await this.accountRepository.getAccount(id)
  }

  async newAccount (account: IAccount): Promise<object> {
    return await this.accountRepository.newAccount(account)
  }

  async updateAccount (id: string, account: IAccount): Promise<object> {
    return await this.accountRepository.updateAccount(id, account)
  }

  async removeAccount (id: string): Promise<object> {
    return await this.accountRepository.removeAccount(id)
  }

}

export default AccountService
