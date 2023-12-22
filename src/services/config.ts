import { IConfig } from '../models/config';
import { IConfigService } from '../interfaces/service';
import { ConfigModel } from '../models/config';
import { CustomError } from '../utils/error';
export interface IInfoRes {
    success: boolean;
    statusCode: number;
    message: string;
    config?: any;
    configs?: any[];
}
export class ConfigService implements IConfigService {
    public addConfig = async (bodyConfig: IConfig): Promise<IInfoRes> => {
        try {
            const config = await ConfigModel.create(bodyConfig);
            return {
                success: true,
                statusCode: 201,
                message: 'tạo config Thành công',
                config: config.dataValues,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public delConfig = async (idConfig: number): Promise<IInfoRes> => {
        try {
            const configDeleted = await ConfigModel.destroy({
                where: {
                    id: idConfig,
                },
            });
            if (!configDeleted) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Xóa thành công',
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'lỗi server');
        }
    };
    public udpateConfig = async (
        id: number,
        configBody: IConfig
    ): Promise<any> => {
        try {
            const response = await ConfigModel.update(configBody, {
                where: {
                    id: id,
                },
            });
            if (!response) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Cập nhật thành công',
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
