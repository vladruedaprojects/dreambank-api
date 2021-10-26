import { Request, Response } from "express"
import { Service } from "typedi"
import IUser from "../interfaces/userInterface"
import UserService from "../services/userService"

@Service()
class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async signIn (req: Request, res: Response): Promise<object> {
    const user: IUser = req.body

    if (user && user.idCard) {
      try {
        const userSignedIn: object = await this.userService.signIn(user)

        if (userSignedIn) {
          return res.status(201).send(userSignedIn)
        }
      } catch (error) {
        return res.status(400).send({ message: 'Invalid idCard or password', type: 'validation' })
      }
    }

    return res.status(400).send({ message: 'Invalid idCard or password', type: 'validation' })
  }

  async signUp (req: Request, res: Response): Promise<object> {
    const user: IUser = req.body

    if (user) {
      try {
        const userStored: object = await this.userService.signUp(user)

        if (userStored) {
          return res.status(201).send(userStored)
        }
      } catch (error) {
        return res.status(400).send({ message: 'The user already exists', type: 'validation' })
      }
      
    }
    return res.status(400).send({ message: 'The user already exists', type: 'validation' })
  }

  logout (req: Request, res: Response): object {
    return res.status(200).send({ message: 'Logout ok.' })
  }
  
}

export default UserController
