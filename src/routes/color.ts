import express from 'express';
import Joi from 'joi';
import { Validator } from '../utils/validate';
import { ColorController } from '../controllers/color';
import { ColorService } from '../services/color';
import { Endpoins } from '../constants/endpoins';
const colorService = new ColorService();
const validator = new Validator();
const colorController = new ColorController(colorService, Joi, validator);

export const colorRouter = express.Router();
colorRouter.post(Endpoins.addColor, colorController.addColor);
colorRouter.delete(Endpoins.deleteColor, colorController.deleteColor);
colorRouter.put(Endpoins.updateColor, colorController.updateColor);
