import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import RequestProductController from '../../controllers/requestProductController'
import Authorization from '../../middlewares/auth'

const router = Router()

const requestProductController = Container.get(RequestProductController)

router
  .get('/all', (req, res) => requestProductController.getRequestProducts(req, res))
  .get('/id?:requestProductId', (req, res) => requestProductController.getRequestProduct(req, res))
  .post('/new',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => requestProductController.newRequestProduct(req, res))
  .put('/update/id?:requestProductId', (req, res) => requestProductController.updateRequestProduct(req, res))
  .delete('/id?:requestProductId', (req, res) => requestProductController.removeRequestProduct(req, res))

export default router
