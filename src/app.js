import express from 'express';
import userRoutes from './routes/user.routes'; 
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan("dev"))

app.get('/',(req,res)=>{
return res.status(200).json({message:"welcome to posinnove Backend APIs"})
})
app.use('/api/users', userRoutes);

export default app;