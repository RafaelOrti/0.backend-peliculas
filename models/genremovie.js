'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenreMovie extends Model {
    static associate(models) {
      this.belongsTo(models.Movie, {
        foreignKey: 'MovieId'
      });
    }
  }
  GenreMovie.init({
    GenreId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GenreMovie',
  });
  return GenreMovie;
};