import express, {  } from "express";
import http from 'http'
import { connect } from "mongoose";
import socket from 'socket.io'
import bodyParser from 'body-parser'

const app = express()
const server = http.createServer(app);
const io = socket(http)

;(async () => {
  try {
    const DB = process.env.DB as string
    const DB_connection = DB && await connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.log(`server error: `, error.message)
    process.exit(1);
  }
})()

app.use(express.json())
app.use(bodyParser.json())

io.on('connection', (_socket) => {
  console.log('a user connected');
});

import { router as Main } from './routes/main.routes'
app.use("/", Main)


const PORT = process.env.PORT || 3000 as number 
server.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))