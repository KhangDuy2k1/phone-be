import { IPhoneVariant, PhoneVariantModel } from '../models/phoneVariant';
import { CustomError } from '../utils/error';

export class PhoneVariantService {
    public addPhoneVariant = async (
        bodyPhoneVariant: IPhoneVariant
    ): Promise<any> => {
        try {

            const isCheck = await PhoneVariantModel.findOne({
                where: {
                    phone_id: bodyPhoneVariant.phone_id,
                    color_id: bodyPhoneVariant.color_id,
                    storage_id: bodyPhoneVariant.storage_id,
                },
            });
            if (isCheck) {
                throw new CustomError(409, 'đã tồn tại');
            } else {
                const phoneVariant =
                    await PhoneVariantModel.create(bodyPhoneVariant);
                return {
                    success: true,
                    statusCode: 201,
                    message: 'tạo thành công',
                    phoneVariant: phoneVariant.dataValues,
                };
            }
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    selectColorStoreId = async(bodySelect:{phone_id: any, color_id: any, storage_id: any}):Promise<any> => {
        try {
            const result = await PhoneVariantModel.findOne({
                 where: bodySelect
            })
            return {
               price: result?.dataValues.price_detail
            }
        } catch (error) {
            throw new CustomError(500, "loi server")
        }   
}
}
