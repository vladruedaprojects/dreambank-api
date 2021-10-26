import jwt = require('jwt-simple')
import moment = require('moment')
import 'dotenv/config'
import IUser from '../interfaces/userInterface'

export class TokenJwt {
  private token: Promise<string> | string | null

  constructor (user?: IUser, token?: string) {
    this.token = token || null
    if (!this.token && user) {
      this.token = this.createToken(user)
    }
  }

  async createToken(user: IUser): Promise<string> {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(1, 'days').unix()
    }
    const token = await jwt.encode(payload, process.env.SECRET_TOKEN || 'other_environment_secret')
    return token
  }

  getToken () {
    return this.token
  }

  async decodeToken(token: string): Promise<object> {
    const decoded: object = new Promise<object>((resolve, reject) => {
      try {
        const payload = jwt.decode(token, process.env.SECRET_TOKEN || 'other_environment_secret')
  
        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'Token expired!'
          })
        }
        resolve({ _id: payload.sub })
      } catch (err) {
        reject({
          status: 403,
          message: 'Invalid Token!'
        })
      }
    })
  
    return decoded
  }
}

export default TokenJwt
