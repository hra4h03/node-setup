import { connect } from "mongoose"

export const connectToDB = (DB_uri: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const DB = DB_uri || 'mongodb://localhost:27017/example' as string
      const DB_connection = await connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      resolve(DB_connection)
    } catch(error) {
      reject(error.message)
      process.exit(1);
    }
  }) 
}