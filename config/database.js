
import { Sequelize } from 'sequelize';

// Configurando a conexão com MySQL no XAMPP
const sequelize = new Sequelize('sistema_problemas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Para desativar logs de SQL no console
});

export default sequelize;