import { IStorage, StorageModel } from '../models/storage';
import { CustomError } from '../utils/error';

export class StorageService {
    private checkId = async (id: number): Promise<boolean> => {
        try {
            const response = await StorageModel.findByPk(id);
            return !!response;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public addMemory = async (bodyMemory: IStorage): Promise<any> => {
        try {
            const response = await StorageModel.create(bodyMemory);
            return {
                success: true,
                statusCode: 201,
                message: 'tạo thành công',
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public updateMemory = async (
        id: number,
        bodyMemory: IStorage
    ): Promise<any> => {
        try {
            const checkId = await this.checkId(id);
            if (!checkId) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                const respones = await StorageModel.update(bodyMemory, {
                    where: {
                        id: id,
                    },
                });
                return {
                    success: true,
                    statusCode: 200,
                    message: 'cập nhật thành cống',
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
    public deleteMemory = async (id: number): Promise<any> => {
        try {
            const responseCheck = await this.checkId(id);
            if (!responseCheck) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                const response = await StorageModel.destroy({
                    where: {
                        id: id,
                    },
                });
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Xóa thành công',
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
