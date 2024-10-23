import express from 'express';
import { getAllExpertiseAndInterests } from '../controllers/defaultTable.controller';

const expertiseAndInterestsRoutes = express.Router();

expertiseAndInterestsRoutes.get('/', getAllExpertiseAndInterests);

export default expertiseAndInterestsRoutes;
