import { Request, Response, NextFunction } from "express"
import TokenJwt from '../services/tokenJwt'

export class Authorization {

  constructor (_req: Request, res: Response, next: NextFunction) {
    this.isAuth(_req, res, next)
  }

  isAuth (_req: Request, res: Response, next: NextFunction) {
    let token = null
    const tokenJwt = new TokenJwt()

    if (_req.headers && _req.headers.authorization) {
      token = _req.headers.authorization.split(' ')[1]
    } 

    if (!token) {
      return res.status(403).send({ message: 'No token provided' })
    }

    tokenJwt.decodeToken(token)
      .then((response) => { // Valid Token
        console.log(response) // Para la validación del usuario _id
        next()
      })
      .catch((response) => {
        res.status(response.status)
        return res.status(403).send({ message: 'Authorization denied' })
      })
  }
}

export default Authorization
