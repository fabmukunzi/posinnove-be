import app from './app.js';
import connectToDatabase from './src/database/config/database.config.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
