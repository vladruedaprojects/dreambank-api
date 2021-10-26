import { Request, Response, NextFunction } from "express"
import TokenJwt from '../services/tokenJwt'

export class Authorization {

  constructor (req: Request, res: Response, next: NextFunction) {
    this.isAuth(req, res, next)
  }

  isAuth (req: Request, res: Response, next: NextFunction) {
    let token = null
    const tokenJwt = new TokenJwt()

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
    } 

    if (!token) {
      return res.status(403).send({ message: 'No token provided' })
    }

    tokenJwt.decodeToken(token)
      .then((response) => { // Valid Token
        // repsponse tiene el _id del usuario
        res.locals.user = response
        next()
      })
      .catch((response) => {
        res.status(response.status)
        return res.status(403).send({ message: 'Authorization denied' })
      })
  }
}

export default Authorization
