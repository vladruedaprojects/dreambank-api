import 'reflect-metadata'
import { Router } from 'express'
import Container from 'typedi'
import UserController from '../../controllers/userController'

const router = Router()

const userController = Container.get(UserController)

router
  .post('/signin', (req, res) => userController.signIn(req, res))
  .post('/signup', (req, res) => userController.signUp(req, res))

export default router
