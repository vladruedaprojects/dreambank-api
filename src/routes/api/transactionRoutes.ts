import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import TransactionController from '../../controllers/transactionController'

const router = Router()

const transactionController = Container.get(TransactionController)

router
  .get('/all', (req, res) => transactionController.getTransactions(req, res))
  .get('/id?:transactionId', (req, res) => transactionController.getTransaction(req, res))
  .post('/new', (req, res) => transactionController.newTransaction(req, res))
  .put('/update/id?:transactionId', (req, res) => transactionController.updateTransaction(req, res))
  .delete('/id?:transactionId', (req, res) => transactionController.removeTransaction(req, res))

export default router
