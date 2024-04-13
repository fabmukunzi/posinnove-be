import express from 'express';
import { sequelize } from './database/models';

const app = express();
export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};
app.get('/', (req,res) => {
  return res.status(200).json({ message: 'Welcome to posinnove Api' });
});
export default app;
