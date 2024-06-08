import models from '../index.js'
const { UsersModel } = models

export const addUser = async (user) => {
  return UsersModel.create(user)
}

export const getUserById = async (id) => {
  return UsersModel.findByPk(id)
}

export const getUserByEmail = async (email) => {
  return UsersModel.findOne({
    where: {
      email
    },
    raw: true
  })
}

export const getUsers = async () => {
  return UsersModel.findAll()
}
