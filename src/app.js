import express from 'express';
import userRoutes from './routes/user.routes'; 

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
return res.status(200).json({message:"welcome to posinnove Backend APIs"})
})
app.use('/api/users', userRoutes);

export default app;
