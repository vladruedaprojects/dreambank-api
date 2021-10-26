import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import AccountController from '../../controllers/accountController'
import Authorization from '../../middlewares/auth'

const router = Router()

const accountController = Container.get(AccountController)

router
  .get('/all',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => accountController.getAccounts(req, res))
  .get('/id?:accountId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => accountController.getAccount(req, res))
  .post('/new',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => accountController.newAccount(req, res))
  .put('/update/id?:accountId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => accountController.updateAccount(req, res))
  .delete('/id?:accountId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => accountController.removeAccount(req, res))

export default router
