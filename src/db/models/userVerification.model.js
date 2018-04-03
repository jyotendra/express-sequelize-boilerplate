'use strict';
module.exports = (sequelize, DataTypes) => {
  const userVerification = sequelize.define('userVerification', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    accessToken: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
  });

  userVerification.associate = function(models) {
    userVerification.belongsTo(models.user)
  };
  return userVerification;
};