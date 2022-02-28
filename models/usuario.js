'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pedido, {
        foreignKey: 'usuarioId'
      });
      this.hasOne(models.Payment, {
        foreignKey: 'usuarioId'
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nickname: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    rol: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    numeroCuenta:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};