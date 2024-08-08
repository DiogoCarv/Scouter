import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sql10724709', 'sql10724709', '7PW5G8GQcX', {
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    define: {
        timestamps: false   
    }
});

module.exports = sequelize;
