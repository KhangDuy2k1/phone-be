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
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
}
