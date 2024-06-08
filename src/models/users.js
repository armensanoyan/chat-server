import { DataTypes } from 'sequelize'

const ModelDefinition = () => {
  return {
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted', 'blocked'),
        allowNull: false,
        defaultValue: 'active' // should be 'inactive' till email verification is done
      }
    },
    options: {
      tableName: 'users',
      timestamps: true
    }
  }
}

export default (sequelize) => {
  const UsersDefinition = ModelDefinition()

  const UsersModel = sequelize.define('Users', UsersDefinition.attributes, UsersDefinition.options)

  return UsersModel
}
