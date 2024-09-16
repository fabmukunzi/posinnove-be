import express from "express";
import { AddInterests,UpdateInterests,getInterests } from "../controllers/interests.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const InterestRoutes = express.Router();

InterestRoutes.post('/',protectRoute,AddInterests)
InterestRoutes.patch('/',protectRoute,UpdateInterests)
InterestRoutes.patch('/',protectRoute,getInterests)


export default InterestRoutes