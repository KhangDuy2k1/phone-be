import { ICategoryService } from '../interfaces/service';
import { ICategory } from '../models/category';
import { CategoryModel } from '../models/category';
import { DiscountModel } from '../models/discount';
import { PhoneModel } from '../models/phone';
import { CustomError } from '../utils/error';
export class CategoryService implements ICategoryService {
    private conn: any;
    constructor(conn: any) {
        this.conn = conn;
    }
    private checkId = async (id: number): Promise<boolean> => {
        try {
            const response = await CategoryModel.findByPk(id);
            return !!response;
        } catch (error) {
            throw new CustomError(500, 'lối server');
        }
    };
    public addCategory = async (category: ICategory): Promise<any> => {
        // console.log(category);
        try {
            const isExistCategory = await CategoryModel.findOne({
                where: {
                    name: category.name,
                },
            });
            if (isExistCategory) {
                throw new CustomError(409, 'category đã tồn tại');
            } else {
                const response = await CategoryModel.create(category);
                return {
                    success: true,
                    message: 'tạo category thành công',
                    category: response.dataValues,
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
    public getAllCategories = async (): Promise<any> => {
        try {
            const categories = await CategoryModel.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: PhoneModel,
                        attributes: ['id', 'name'],
                    },
                ],
            });
            return {
                success: true,
                message: 'lấy categories thành công',
                categories,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    public getPhoneByCategory = async (category_id: number): Promise<any> => {
        try {
            const check = await this.checkId(category_id);
            if (!check) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                const catgoryPhone = await CategoryModel.findByPk(category_id, {
                    attributes: ['id', 'name'],
                    include: {
                        model: PhoneModel,
                        attributes: ['id', 'name', 'desc', 'price', 'avatar'],
                        include: [
                            {
                                model: DiscountModel,
                                attributes: ['scale'],
                            },
                        ],
                    },
                });
                return {
                    success: true,
                    statusCode: 200,
                    message: 'lấy phones của category thành công',
                    category: catgoryPhone?.toJSON(),
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
    public deleteCategory = async (idcategrory: number): Promise<any> => {
        try {
            const isExistId = await this.checkId(idcategrory);
            if (!isExistId) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                const respones = await this.conn.query(
                    `DELETE FROM categories WHERE id = ${idcategrory};`
                );
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
    public updateCategory = async (
        id: number,
        bodyCategory: { name: string }
    ): Promise<any> => {
        try {
            const [affectedRows] = await CategoryModel.update(
                {
                    name: bodyCategory.name,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            if (!affectedRows) {
                throw new CustomError(400, 'không thể cập nhật');
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
