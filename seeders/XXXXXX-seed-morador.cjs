'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('moradores', [{
      nome: 'Morador Teste',
      email: 'morador@teste.com',
      senha: '123456',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('moradores', null, {});
  }
};
