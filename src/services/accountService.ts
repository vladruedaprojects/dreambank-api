import { ObjectId } from "mongoose"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import AccountRepository from "../repositories/accountRepository"

@Service()
class AccountService {
  
  constructor(private readonly accountRepository: AccountRepository) { }

  async getAccounts (userId: string | ObjectId): Promise<IAccount[]> {
    return await this.accountRepository.getAccounts(userId)
  }

  async getAccount (id: string | ObjectId): Promise<IAccount | null> {
    return await this.accountRepository.getAccount(id)
  }

  async newAccount (account: IAccount): Promise<IAccount | null> {
    return await this.accountRepository.newAccount(account)
  }

  async updateAccount (id: string | ObjectId, updates: object): Promise<IAccount | null> {
    return await this.accountRepository.updateAccount(id, updates)
  }

  async removeAccount (id: string): Promise<IAccount | null> {
    return await this.accountRepository.removeAccount(id)
  }

}

export default AccountService
