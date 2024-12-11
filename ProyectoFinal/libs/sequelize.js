import { Sequelize } from 'sequelize';
import { defineModels } from "../db/models/index.js";

const DB_NAME = 'store';
const DB_USER = 'postgres';
const DB_PASS = '1';
const DB_HOST = '127.0.0.1';
const DB_PORT = '5432';

export const sequelize = new Sequelize({
    host: '127.0.0.1',
    port: '5432',
    username: 'postgres',
    'password': '1',
    'database': 'store',
    dialect: 'postgres'
});

defineModels(sequelize);

sequelize.sync();

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Unable to connect to the database:', error);
}