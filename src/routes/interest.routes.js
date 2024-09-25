import express from "express";
import { UpsertInterests, getInterests } from "../controllers/interests.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const InterestRoutes = express.Router();

InterestRoutes.post('/', protectRoute, UpsertInterests);
InterestRoutes.get('/', protectRoute, getInterests);

export default InterestRoutes;