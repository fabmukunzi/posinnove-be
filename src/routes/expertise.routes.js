import express from "express";
import { UpsertExpertise, getExpertise } from "../controllers/expertise.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const ExpertiseRoutes = express.Router();

ExpertiseRoutes.post('/', protectRoute, UpsertExpertise);
ExpertiseRoutes.get('/', protectRoute, getExpertise);

export default ExpertiseRoutes;
