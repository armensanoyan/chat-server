import Router from 'express'
import { handleGet } from '../utils/success-handler.js'

const router = Router()

router.use('/', (req, res, next) => {
  return handleGet(res, { message: 'Welcome to the API' })
})

export default router
