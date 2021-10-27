import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import TransactionController from '../../controllers/transactionController'
import Authorization from '../../middlewares/auth'

const router = Router()

const transactionController = Container.get(TransactionController)

router
  .get('/all',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.getTransactions(req, res))

  .get('/account?:accountId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.getTransactionsByAccount(req, res))

  .post('/account?:accountId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.getTransactionsAverage(req, res))

  .get('/id?:transactionId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.getTransaction(req, res))

  .post('/new',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.newTransaction(req, res))

  .put('/update/id?:transactionId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.updateTransaction(req, res))

  .delete('/id?:transactionId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => transactionController.removeTransaction(req, res))

export default router
