import express from 'express';
import Joi from 'joi';
import { Endpoins } from '../constants/endpoins';
import { ImageService } from '../services/image';
import { Validator } from '../utils/validate';
import { ImageController } from '../controllers/image';
const validator = new Validator();
const imageService: ImageService = new ImageService();
const imageController: ImageController = new ImageController(
    imageService,
    Joi,
    validator
);
export const imageRouter = express.Router();
imageRouter.post(Endpoins.addImage, imageController.addImage);
imageRouter.put(Endpoins.updateImage, imageController.updateImage);
