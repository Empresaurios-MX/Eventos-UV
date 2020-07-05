'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING(100)
      },
      nombre: {
        type: Sequelize.STRING(50)
      },
      apellidos: {
        type: Sequelize.STRING(50)
      },
      intereses: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      rol: {
        type: Sequelize.STRING(20)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuarios');
  }
};
