import { IPhone } from '../models/phone';
import { DiscountModel } from '../models/discount';
import { PhoneModel } from '../models/phone';
import { CustomError } from '../utils/error';
import { ConfigModel } from '../models/config';
import { ColorModel } from '../models/color';
import { StorageModel } from '../models/storage';
import { ImageModel } from '../models/image';

export class PhoneService {
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
                attributes: ['id', 'name', 'desc', 'price'],
                include: [
                    {
                        model: ColorModel,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [],
                        },
                    },
                    {
                        model: StorageModel,
                        attributes: ['id', 'memory'],
                        through: {
                            attributes: [],
                        },
                    },
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
}
