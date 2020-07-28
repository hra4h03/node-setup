import express, {  } from "express";
import http from 'http'
import socket from 'socket.io'
import bodyParser from 'body-parser'

import { registerAdminPanel } from './admin/admin.routes'
import { connectToDB } from "./_helpers/DB";

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const server = http.createServer(app);
const io = socket(http)

;(async () => {
  try {
    const DB_connection = await connectToDB(process.env.DB as string);
    app.use(express.json())
    app.use(bodyParser.json()) 

    const { router: Main } = await import('./routes/main.routes')
    app.use("/", Main)

    const { router: Admin, path = '/admin' } = registerAdminPanel(DB_connection)
    app.use(path, Admin)  
  } catch (error) {
    console.log(error)
  }
})()

io.on('connection', (_socket) => {
  console.log('a user connected');
});

const PORT = process.env.PORT || 3000 as number 
server.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`))

