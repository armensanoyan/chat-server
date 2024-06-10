import Joi from 'joi'
import { ValidationError } from '../utils/errors.js'

export const validateChatCreate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}

export const validateUserAdd = (req, res, next) => {
  const schema = Joi.object({
    chatId: Joi.number().required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}

export const validateGeMessages = (req, res, next) => {
  const schema = Joi.object({
    chatId: Joi.number().required()
  })

  const { error } = schema.validate(req.params)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}

export const validateMessageAdd = (req, res, next) => {
  const schema = Joi.object({
    chatId: Joi.number().required(),
    message: Joi.string().required(),
    parentId: Joi.number().optional()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}

export const validateMessageDelete = (req, res, next) => {
  const schema = Joi.object({
    messageId: Joi.number().required()
  })

  const { error } = schema.validate(req.params)
  if (error) {
    return next(new ValidationError(error?.message))
  }
  return next()
}
