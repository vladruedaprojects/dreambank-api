import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import ProductController from '../../controllers/productController'
import Authorization from '../../middlewares/auth'

const router = Router()

const productController = Container.get(ProductController)

router
  .get('/all', (req, res) => productController.getProducts(req, res))
  .get('/id?:productId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => productController.getProduct(req, res))
  .post('/new',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => productController.newProduct(req, res)
  )
  .put('/update/id?:productId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => productController.updateProduct(req, res))
  .delete('/id?:productId',
    (req, res, next) => new Authorization(req, res, next),
    (req, res) => productController.removeProduct(req, res))

export default router
