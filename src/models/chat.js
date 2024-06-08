import { DataTypes } from 'sequelize'

const ModelDefinition = () => {
  return {
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fromUserId: {
        type: DataTypes.INTEGER
      },
      toUserId: {
        type: DataTypes.INTEGER
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('sent', 'delivered', 'read', 'deleted'),
        defaultValue: 'sent'
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
