import express from 'express';
import Joi from 'joi';
import { PhoneVariantService } from '../services/phoneVariant';
import { PhoneVariantController } from '../controllers/phoneVariant';
import { Validator } from '../utils/validate';
import { Endpoins } from '../constants/endpoins';
const validator = new Validator();
const phoneVariantServie: PhoneVariantService = new PhoneVariantService();
const phoneVariantController: PhoneVariantController =
    new PhoneVariantController(Joi, phoneVariantServie, validator);
export const phoneVariant = express.Router();
phoneVariant.post(
    Endpoins.addPhoneVariant,
    phoneVariantController.addPhoneVariant
);
