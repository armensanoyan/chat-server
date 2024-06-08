import Joi from 'joi'
import { ValidationError } from '../utils/errors.js'

export const validateUserCreate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    password: Joi.string().required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}
