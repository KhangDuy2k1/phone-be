import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/user';
// import { CustomError } from '../utils/error';
import { CategoryModel } from '../models/category';
import { ConfigModel } from '../models/config';
import { DiscountModel } from '../models/discount';
import { ImageModel } from '../models/image';
import { PhoneModel } from '../models/phone';
import { ColorModel } from '../models/color';
import { StorageModel } from '../models/storage';
import { OrderModel } from '../models/order';
import { PhoneVariantModel } from '../models/phoneVariant';
import { CartModel } from '../models/cart';
import { OrderItemModel } from '../models/orderItem';
import { SlideModel } from '../models/slide';
export class ConnectDatabase {
    private sequelize: any;
    private databaseName: string;
    private username: string;
    private password: string;
    private host: string;
    constructor() {
        this.databaseName = process.env.DATABASE || 'phone';
        this.username = 'root';
        this.password = process.env.PASSWORD || 'Khangbn2k1@';
        this.host = process.env.HOST || 'localhost';
        this.sequelize = new Sequelize(
            `mysql://${this.username}:${this.password}@localhost:3306/${this.databaseName}`
        );
    }
    getSequelize = (): any => {
        return this.sequelize;
    };
    connectDatabase = async (): Promise<void> => {
        try {
            this.sequelize.authenticate();
            this.sequelize.addModels([
                OrderItemModel,
                ColorModel,
                StorageModel,
                UserModel,
                CategoryModel,
                OrderModel,
                ConfigModel,
                PhoneVariantModel,
                CartModel,
                DiscountModel,
                ImageModel,
                PhoneModel,
                SlideModel,
            ]);
            await this.sequelize.sync({ force: false }).then(() => {
                console.log('Cơ sở dữ liệu đã được đồng bộ hóa.');
            });
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error(error);
        }
    };
}
