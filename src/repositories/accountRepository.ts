import { ObjectId } from "mongoose"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import AccountModel from "../models/accountModel"

@Service()
class AccountRepository {
  async getAccounts (userId: string | ObjectId): Promise<IAccount[]> {
    return await AccountModel.find({ user: userId }).populate('product')
  }

  async getAccount (id: string | ObjectId): Promise<IAccount | null> {
    try {
      const account = await AccountModel.findById(id)
      return account
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async newAccount (accountReq: IAccount): Promise<IAccount | null> {
    const account = new AccountModel(accountReq)

    try {
      const accountStored = await account.save()
      return accountStored
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateAccount (id: string | ObjectId, updates: object): Promise<IAccount | null> {
    try {
      const accountUpdated = await AccountModel.findByIdAndUpdate(id, updates, { new: true })
      return accountUpdated
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async removeAccount (id: string): Promise<IAccount | null> {
    try {
      const account = await AccountModel.findById(id)

      if (account) {
        const accountRemoved = await account.remove()
        return accountRemoved
      }
      throw new Error('Account Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default AccountRepository
