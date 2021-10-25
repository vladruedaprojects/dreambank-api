import 'reflect-metadata'
import { App } from './app'
import 'dotenv/config'
import { ConnectionMongo } from './config/connectionMongo'

async function main() {
  const app = new App()
  const connectionMongo = new ConnectionMongo(process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/dreambank')
  
  await app.listen()
  await connectionMongo.connect()
}

main()
