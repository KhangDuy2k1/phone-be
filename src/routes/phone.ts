import express from 'express';
import Joi from 'joi';
import { PhoneController } from '../controllers/phone';
import { Validator } from '../utils/validate';
import { PhoneService } from '../services/phone';
import { Endpoins } from '../constants/endpoins';
const phoneService: PhoneService = new PhoneService();
const validator: Validator = new Validator();
const phoneController = new PhoneController(Joi, phoneService, validator);
export const phoneRouter = express.Router();
phoneRouter.post(Endpoins.addPhone, phoneController.addPhone);
phoneRouter.get(Endpoins.allPhone, phoneController.phones);
phoneRouter.get(Endpoins.phoneDetail, phoneController.phoneDetail);
