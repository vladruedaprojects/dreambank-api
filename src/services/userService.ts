import { Service } from "typedi";
import IUser from "../interfaces/userInterface";
import UserRepository from "../repositories/userRepository"

@Service()
class UserService {
  
  constructor(private readonly userRepository: UserRepository) { }

  async signIn (user: IUser): Promise<object> {
    return await this.userRepository.signIn(user)
  }

  async signUp (user: IUser): Promise<object> {
    return await this.userRepository.signUp(user)
  }

}

export default UserService
