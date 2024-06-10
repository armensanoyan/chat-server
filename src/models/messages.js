import { DataTypes } from 'sequelize'

const ModelDefinition = () => {
  return {
    attributes: {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      parentId: { // for reply
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    options: {
      tableName: 'messages',
      timestamps: true
    }
  }
}

export default (sequelize) => {
  const MessagesDefinition = ModelDefinition(DataTypes)

  const MessagesModel = sequelize.define('Messages', MessagesDefinition.attributes, MessagesDefinition.options)

  return MessagesModel
}
