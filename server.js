import dotenv from 'dotenv';
import app, { connectDb } from './src/app';
dotenv.config();
(async () => {
  await connectDb();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}!`);
  });
})();
