import express from 'express';
import { createSubscribe,unSubscribe,sendBlogPostPublishedEmail } from '../controllers/subscribe.controller';
import validateSubscriber from '../validations/subscribe.validation';

const subscribeRoutes = express.Router();

subscribeRoutes.post('/',validateSubscriber, createSubscribe);
subscribeRoutes.get('/:id', unSubscribe);
subscribeRoutes.post('/notify', sendBlogPostPublishedEmail);

export default subscribeRoutes;