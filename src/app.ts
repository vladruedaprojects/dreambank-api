import express from 'express'
import 'dotenv/config'

// Routes
import IndexRoutes from './routes/indexRoutes'
import UserRoutes from './routes/api/userRoutes'
import ProductRoutes from './routes/api/productRoutes'
import RequestProductRoutes from './routes/api/requestProductRoutes'
import AccountRoutes from './routes/api/accountRoutes'
import TransactionRoutes from './routes/api/transactionRoutes'

export class App {
    app: express.Application

    constructor (
      private port?: number | string
    ) {
      this.app = express()
      this.settings()
      this.middlewares()
      this.routes()
    }

    private settings() {
      this.app.set('port', this.port || process.env.PORT || 3000)
    }

    private middlewares() {
      this.app.use(express.json())
    }

    private routes() {
      this.app.use('/api', IndexRoutes)
      this.app.use('/api/user', UserRoutes)
      this.app.use('/api/product', ProductRoutes)
      this.app.use('/api/requestproduct', RequestProductRoutes)
      this.app.use('/api/account', AccountRoutes)
      this.app.use('/api/transaction', TransactionRoutes)
    }

    async listen(): Promise<void> {
      await this.app.listen(this.app.get('port'))
      // eslint-disable-next-line no-console
      console.log('Server on port', this.app.get('port'))
    }

}
