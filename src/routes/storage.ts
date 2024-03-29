import express from 'express';
import Joi from 'joi';
import { StorageService } from '../services/storage';
import { StorageController } from '../controllers/storage';
import { Endpoins } from '../constants/endpoins';
import { Validator } from '../utils/validate';
const storageService = new StorageService();
const validator = new Validator();
const storageController = new StorageController(storageService, Joi, validator);
export const storageRouter = express.Router();
storageRouter.post(Endpoins.addStorage, storageController.addStorage);
storageRouter.delete(Endpoins.deleteStorage, storageController.deleteStorage);
storageRouter.put(Endpoins.updateStorage, storageController.updateStorage);
storageRouter.get(Endpoins.allStorage, storageController.getAllStorage);

