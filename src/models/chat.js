import { DataTypes } from 'sequelize'

const ModelDefinition = () => {
  return {
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    },
    options: {
      tableName: 'chats',
      timestamps: true
    }
  }
}

export default (sequelize) => {
  const ChatsDefinition = ModelDefinition(DataTypes)

  const ChatsModel = sequelize.define('Users', ChatsDefinition.attributes, ChatsDefinition.options)

  return ChatsModel
}
