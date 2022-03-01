'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate(models) {
      this.belongsToMany(models.Movie, {
        through:models.ActorMovie,
        foreignKey: 'ActorId'
      });
    }
  }
  Actor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actor',
  });
  return Actor;
};