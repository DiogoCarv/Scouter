'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('administrador', [{
      nome: 'Admin Teste',
      email: 'admin@teste.com',
      senha: '123456',  // Lembre-se de usar bcrypt para senhas reais
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('administrador', null, {});
  }
};
