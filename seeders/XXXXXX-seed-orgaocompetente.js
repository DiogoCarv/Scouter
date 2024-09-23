'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('orgaocompetente', [{
      nome: 'Órgão Competente Teste',
      email: 'orgao@teste.com',
      senha: '123456',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orgaocompetente', null, {});
  }
};
