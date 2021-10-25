import { Router } from 'express'

const router = Router()

router
  .get('/', (req, res) => res.json('Welcome to Dreambank API'))
  .get('/api', (req, res) => res.json('Welcome to Dreambank API'))

export default router
