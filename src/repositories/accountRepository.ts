import { ObjectId } from "mongoose"
import { Service } from "typedi"
import IAccount from "../interfaces/account"
import AccountModel from "../models/accountModel"

@Service()
class AccountRepository {
  async getAccounts (userId: string | ObjectId): Promise<object> {
    return await AccountModel.find({ user: userId }).populate('product')
  }

  async getAccount (id: string): Promise<object> {
    try {
      const account = await AccountModel.findById({ id })
      return { account }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async newAccount (accountReq: IAccount): Promise<object> {
    const account = new AccountModel(accountReq)

    try {
      const accountStored = await account.save()
      return { account: accountStored }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateAccount (id: string, accountReq: IAccount): Promise<object> {
    try {
      const accountUpdated = await AccountModel.findByIdAndUpdate(id, accountReq, { new: true })
      return { account: accountUpdated }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async removeAccount (id: string): Promise<object> {
    try {
      const account = await AccountModel.findById(id)

      if (account) {
        const accountRemoved = await account.remove()
        return { account: accountRemoved }
      }
      throw new Error('Account Not found')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default AccountRepository
