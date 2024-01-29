import express from 'express';
import Joi from 'joi';
import { PhoneController } from '../controllers/phone';
import { Validator } from '../utils/validate';
import { PhoneService } from '../services/phone';
import { Endpoins } from '../constants/endpoins';
import { ConnectDatabase } from '../configs/connectDatabase';
const connectDatabase = new ConnectDatabase();
const phoneService: PhoneService = new PhoneService(connectDatabase);
const validator: Validator = new Validator();
const phoneController = new PhoneController(Joi, phoneService, validator);
export const phoneRouter = express.Router();
phoneRouter.post(Endpoins.addPhone, phoneController.addPhone);
phoneRouter.get(Endpoins.allPhone, phoneController.phones);
phoneRouter.get(Endpoins.phoneDetail, phoneController.phoneDetail);
phoneRouter.get(Endpoins.getMassiveDiscount, phoneController.listPhonesMassiveDiscount)
phoneRouter.get(Endpoins.getColorAndStore, phoneController.getColorAndStorageById)
phoneRouter.post(
    Endpoins.addPhoneToWarehouse,
    phoneController.addPhoneToWarehouse
);
