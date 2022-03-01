'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        //Este valor puede ser nulo
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      edad: {
        type: Sequelize.INTEGER
        ,
        allowNull: false,
        defaultValue: 0
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      rol: {
        type: Sequelize.BOOLEAN,
        //este método se usa para dar un valor por defecto
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};