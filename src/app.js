import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'dotenv/config'
import http from 'http'

import { CORS, HOST, PORT } from './config/config.js'
import healthApi from './api/health.js'
import api from './api/index.js'
import { ErrorHandler } from './middleware/error-handler.js'
import openConnection from './lib/socket.js'

const app = express()
app.set('port', PORT)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)
server.listen(PORT, HOST)
openConnection(server)
/**
 * Middleware which setups the `morgan` logger.
 */
app.use(morgan('dev'))

/**
 * Cross-origin resource sharing middleware.
 *  Reflect any request that is coming from an origin ending with `CORS.ORIGIN` from config.
 */
app.use(cors({
  origin: CORS.ORIGIN,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Length', 'Content-Type', 'Origin'],
  //   exposedHeaders: ['X-Total-Count'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: -1
}))

/**
 * Body parser middleware :
 * 1. Parses the text as URL encoded data (limit 5 mb).
 * 2. Parses the text as JSON & exposes the resulting object on req.body (limit 5 mb).
 */
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(bodyParser.json({ limit: '5mb' }))

app.use('/health', healthApi)

app.use('/api', api)

app.use(ErrorHandler)

export default server
