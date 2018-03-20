'use strict';
module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      accessToken: {
        type: DataTypes.STRING,
        allowNull: false
      },

      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },

      deviceId: {
        type: DataTypes.STRING,
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
  }, {
    freezeTableName: true
  });
  AccessToken.associate = function(models) {
    AccessToken.belongsTo(models.User, {
        foreignKey: "userId"
    })
  };
  return AccessToken;
};