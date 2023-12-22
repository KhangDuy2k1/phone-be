import express from 'express';
import { SlideController } from '../controllers/slide';
import { SlideService } from '../services/slide';
import { Endpoins } from '../constants/endpoins';
const slideService: SlideService = new SlideService();
const slideController: SlideController = new SlideController(slideService);
export const slideRouter = express.Router();
slideRouter.post(Endpoins.addSlide, slideController.addSlide);
slideRouter.get(Endpoins.getAllSlides, slideController.getAllSlice);
