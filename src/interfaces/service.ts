import { ICategory } from '../models/category';
import { IDiscount } from '../models/discount';
import { IInfoRes } from '../services/config';
import { IConfig } from '../models/config';
export interface ICategoryService {
    addCategory: (category: ICategory) => Promise<any>;
    getAllCategories: () => Promise<any>;
    deleteCategory: (id: number) => Promise<any>;
    updateCategory: (id: number, body: { name: string }) => Promise<any>;
    getPhoneByCategory: (category_id: number) => Promise<any>;
}
export interface IConfigService {
    addConfig: (body: IConfig) => Promise<IInfoRes>;
    delConfig: (id: number) => Promise<IInfoRes>;
    udpateConfig: (id: number, config: IConfig) => Promise<IInfoRes>;
}
export interface IDiscountService {
    getAllDiscount: () => Promise<any>;
    addDiscount: (discount: IDiscount) => Promise<any>;
    deleteDiscount: (id: number) => Promise<any>;
    updateDiscount: (id: number, bodyDiscount: IDiscount) => Promise<any>;
}
