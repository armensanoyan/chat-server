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
        allowNull: false
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
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted', 'blocked'),
        allowNull: false
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
