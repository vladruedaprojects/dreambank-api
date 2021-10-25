/* eslint-disable no-console */
import mongoose from 'mongoose';

export class ConnectionMongo {
  private db: string

  constructor (db: string) {
    this.db = db
    mongoose.connection.on('disconnected', this.connect)
    mongoose.connection.on('error', (error) => {
      console.error(`Database connection error: ${error}`)
    })
  }

  async connect (): Promise<void> {
    return mongoose
      .connect(this.db)
      .then(() => {
        return console.info(`Successfully connected to ${ this.db }`)
      })
      .catch(error => {
        console.error('Error connecting to database: ', error)
        return process.exit(0)
      })
  }
}
