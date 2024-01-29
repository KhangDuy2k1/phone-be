import { IPhone } from '../models/phone';
import { DiscountModel } from '../models/discount';
import { PhoneModel } from '../models/phone';
import { CustomError } from '../utils/error';
import { ConfigModel } from '../models/config';
import { ColorModel } from '../models/color';
import { StorageModel } from '../models/storage';
import { ImageModel } from '../models/image';
import { ConnectDatabase } from '../configs/connectDatabase';
import { PhoneVariantModel } from '../models/phoneVariant';
import  Sequelize from 'sequelize';

export class PhoneService {
    private connectDatabase: ConnectDatabase
    constructor(connectDatabase: ConnectDatabase){
        this.connectDatabase = connectDatabase;
    }
    private checkId = async (id: number): Promise<boolean> => {
        try {
            const isCheck = await PhoneModel.findByPk(id);
            return !!isCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public addPhone = async (phone: IPhone) => {
        try {
            const newPhone = new PhoneModel(phone);
            await newPhone.save();
            return {
                statusCode: 201,
                message: 'tạo điện thoại mới thành công',
                newPhone: newPhone,
            };
        } catch (error: any) {
            console.error(error);
            throw new CustomError(500, 'lỗi server');
        }
    };
    public getAllPhones = async (): Promise<any> => {
        try {
            const phones = await PhoneModel.findAll({
                include: [
                    {
                        model: DiscountModel,
                        attributes: ['scale'],
                    },
                ],
            });
            return {
                success: true,
                statusCode: 200,
                message: 'lấy điện thoại thành công',
                phones,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    phoneDetail = async (id: number): Promise<any> => {
        try {
            const phoneDetail = await PhoneModel.findOne({
                where: {
                    id: id,
                },
                attributes: ['id','avatar', 'name', 'desc', 'price', "star_number", "inventory_number"],
                include: [
                    {
                        model: ImageModel,
                        attributes: ['id', 'link'], 
                    },
                    {
                        model: ConfigModel,
                        attributes: [
                            'screen',
                            'os',
                            'rear_camera',
                            'front_camera',
                            'chip',
                            'ram',
                            'pin',
                        ],
                    },
                    {
                        model: DiscountModel,
                        attributes: ['scale'],
                    },
                ],
            });
            if (!phoneDetail) {
                throw new CustomError(404, 'Không tìm thấy');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'lấy thành công',
                    phoneDetail,
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    public addPhoneToWarehouse = async (
        id_phone: number,
        numberPhone: number
    ): Promise<any> => {
        try {
            const response = await PhoneModel.findByPk(id_phone, {
                raw: true,
            });
            const newTotal: number | undefined =
                response?.inventory_number === 0 || response?.inventory_number
                    ? response?.inventory_number + numberPhone
                    : 0;


            const phone = await PhoneModel.update(
                {
                    inventory_number: newTotal,
                },
                {
                    where: {
                        id: response?.id,
                    },
                }
            );
            return {
                success: true,
                statusCode: 200,
                message: 'thêm vào kho thành công',
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public listPhonesMassiveDiscount = async(): Promise<any> => { 
        try {
            const result = await this.connectDatabase.getSequelize().query(`
                    select * from phones 
                    join discounts on discounts.id = phones.discount_id
                    order by discounts.scale desc
                    limit 10;
            `)
            
            return {
                success: true,
                message: "lấy thành công",
                statusCode: 200,
                phones: result[0]
            }
        } catch (error) {
            console.error(error)
            throw new CustomError(500, "lỗi server");
        }
    }
    public getColorAndStorageById = async (id: number): Promise<any> => {
        try {
          const [colorsResult, storagesResult] = await Promise.all([
            this.connectDatabase.getSequelize().query(`
              SELECT DISTINCT colors.id,
              colors.name
              FROM phone_variants
              JOIN colors ON phone_variants.color_id = colors.id
            `),
            this.connectDatabase.getSequelize().query(`
              SELECT DISTINCT storages.id,
              storages.memory
              FROM phone_variants
              JOIN storages ON phone_variants.storage_id = storages.id;
            `)
          ]);
          
          const colors = colorsResult[0];
          const storages = storagesResult[0];
      
          return { colors, storages };
        } catch (error) {
           throw new CustomError(500, "lỗi server")
            
        }
      };
      
      

}
