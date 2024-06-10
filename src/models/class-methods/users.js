import models from '../index.js'
const { UsersModel } = models

export const addUser = async (user) => {
  return (await UsersModel.create(user)).get({ plain: true })
}

export const getUserById = (id) => {
  return UsersModel.findByPk(id)
}

export const getUserByEmail = (email) => {
  return UsersModel.findOne({
    where: {
      email,
      status: 'active'
    },
    raw: true
  })
}

export const softDeleteUser = (id) => {
  return UsersModel.update({ status: 'deleted' }, {
    where: {
      id
    }
  })
}

export const hardDeleteUser = (id) => {
  return UsersModel.destroy({
    where: {
      id
    }
  })
}
