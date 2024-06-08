import { DataTypes } from 'sequelize'
import Users from './users.js'

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
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'id'
        }
      },
      toUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'id'
        }
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
