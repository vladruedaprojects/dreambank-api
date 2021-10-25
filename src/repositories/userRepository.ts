import { Service } from "typedi"
import IUser from "../interfaces/userInterface"
import User from "../models/userModel"
import TokenJwt from "../services/tokenJwt"

@Service()
class UserRepository {
  async signIn (userReq: IUser): Promise<object> {
    try {
      const user = await User.findOne({ idCard: userReq.idCard })
      if (user) {
        userReq._id = user._id
        const tokenJwt: TokenJwt = new TokenJwt(userReq)
        const token = await tokenJwt.getToken()
        const isMatch = user.comparePassword(userReq.password)

        if (isMatch) {
          return { user: {
            _id: user._id,
            idCard: user.idCard,
            email: user.email,
            name: user.name
          }, token }
        } else {
          throw new Error('Invalid idCard or password')
        }

      } else {
        throw new Error('Invalid idCard or password')
      }

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async signUp (userReq: IUser): Promise<object> {
    const user = new User(userReq)

    try {
      const userStored = await user.save()
      return { user: userStored }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default UserRepository
