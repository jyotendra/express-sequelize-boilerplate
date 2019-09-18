"use strict";
module.exports = (sequelize, DataTypes) => {
  const accessToken = sequelize.define(
    "accessToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      accessToken: {
        type: DataTypes.STRING,
        allowNull: false
      },

      deviceId: {
        type: DataTypes.STRING
      },

      isActive: {
        type: DataTypes.BOOLEAN
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  accessToken.associate = function(models) {
    accessToken.belongsTo(models.user);
  };
  return accessToken;
};
