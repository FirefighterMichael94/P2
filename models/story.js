const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    story_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_story: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
 
  },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Story',
  }
);

module.exports = Story;
