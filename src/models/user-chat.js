import { DataTypes } from 'sequelize'

const ModelDefinition = () => {
  return {
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('admin', 'user', 'owner'),
        allowNull: false,
        defaultValue: 'user'
      }
    },
    options: {
      tableName: 'userChat',
      timestamps: true
    }
  }
}

export default (sequelize) => {
  const UserChatDefinition = ModelDefinition(DataTypes)

  const UserChatModel = sequelize.define('UserChat', UserChatDefinition.attributes, UserChatDefinition.options)

  return UserChatModel
}
