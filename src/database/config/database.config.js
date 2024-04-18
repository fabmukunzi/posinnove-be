import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config
 const connectToDatabase = async () => {
  const databaseConnection = new Sequelize(process.env.DEV_DATABASE_URL, {
    dialect: 'postgres',
  });

  try {
    await databaseConnection.authenticate();
    console.log('Connection has been established successfully.');
    return databaseConnection;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};
export default connectToDatabase