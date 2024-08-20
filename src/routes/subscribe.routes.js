import express from 'express';
import { createSubscribe,unSubscribe,sendBlogPostPublishedEmail } from '../controllers/subscribe.controller';

const subscribeRoutes = express.Router();

subscribeRoutes.post('/', createSubscribe);
subscribeRoutes.get('/:id', unSubscribe);
subscribeRoutes.post('/notify', sendBlogPostPublishedEmail);

export default subscribeRoutes;