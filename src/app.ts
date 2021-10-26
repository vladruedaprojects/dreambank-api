import express from 'express'
import 'dotenv/config'

// Routes
import IndexRoutes from './routes/indexRoutes'
import UserRoutes from './routes/api/userRoutes'
import ProductRoutes from './routes/api/productRoutes'
import RequestProductRoutes from './routes/api/requestProductRoutes'
import AccountRoutes from './routes/api/accountRoutes'
import TransactionRoutes from './routes/api/transactionRoutes'
import cors = require('cors')

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
        .disable('x-powered-by')
    }

    private middlewares() {
      this.app.use(express.json())
        .use(cors({
          origin: process.env.ORIGIN || 'http://localhost:3000',
          /* function (origin, callback) {
            return callback(null, true)
          }, */
          credentials: true
        }))
        .use((req, res, next) => {
          res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS, HEAD')
          res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
          next()
        })
    }

    private routes() {
      this.app.use('/api', IndexRoutes)
        .use('/api/user', UserRoutes)
        .use('/api/product', ProductRoutes)
        .use('/api/requestproduct', RequestProductRoutes)
        .use('/api/account', AccountRoutes)
        .use('/api/transaction', TransactionRoutes)
    }

    async listen(): Promise<void> {
      await this.app.listen(this.app.get('port'))
      // eslint-disable-next-line no-console
      console.log('Server on port', this.app.get('port'))
    }

}
