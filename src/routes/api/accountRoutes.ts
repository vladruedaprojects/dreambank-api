import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import AccountController from '../../controllers/accountController'

const router = Router()

const accountController = Container.get(AccountController)

router
  .get('/all', (req, res) => accountController.getAccounts(req, res))
  .get('/id?:accountId', (req, res) => accountController.getAccount(req, res))
  .post('/new', (req, res) => accountController.newAccount(req, res))
  .put('/update/id?:accountId', (req, res) => accountController.updateAccount(req, res))
  .delete('/id?:accountId', (req, res) => accountController.removeAccount(req, res))

export default router
