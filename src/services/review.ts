import { PhoneModel } from '../models/phone';
import { ReviewModel } from '../models/review';
import { CustomError } from '../utils/error';

export class ReviewService {
    private sequelize: any;
    constructor(sequelize: any) {
        this.sequelize = sequelize;
    }
    private checkStarNumber = (starNumber: number): boolean => {
        return starNumber >= 0 && starNumber <= 5;
    };
    private caculationReview = (sum_star: number, totalReview:number):number => {       
                return sum_star/totalReview;
    } 
    public addReview = async (bodyReview: {
        user_id: number;
        phone_id: number;
        star_number: number;
    }): Promise<any> => {
        const transaction = await this.sequelize.transaction();
        try {
            if (!this.checkStarNumber(bodyReview.star_number)) {
                throw new CustomError(400, 'số sao đánh giá sai');
            } else {
                let response = await ReviewModel.create(bodyReview, {
                    transaction,
                });
                const [allReview, countReview] = await Promise.all([
                    ReviewModel.findOne({
                        raw: true,
                        where: {
                            phone_id: bodyReview.phone_id,
                        },
                        transaction,
                        attributes: [
                            [
                                this.sequelize.fn(
                                    'sum',
                                    this.sequelize.col('star_number')
                                ),
                                'sum_star',
                            ],
                        ],
                    }),
                    ReviewModel.count({
                        transaction,
                        where: {
                            phone_id: bodyReview.phone_id,
                        },
                    }),
                ]);
                let star_number = this.caculationReview((allReview as any).sum_star, countReview)
                const phoneUpdate = await PhoneModel.update(
                    {
                        star_number: star_number,
                    },
                    {
                        where: {
                            id: bodyReview.phone_id,
                        },
                        transaction,
                    }
                );
                await transaction.commit();
                return {
                    success: true,
                    statusCode: 201,
                    message: 'tạo reivew thành công',
                };
            }
        } catch (error) {
            await transaction.rollback();
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    public reviewInfo = async():Promise<any> => {
            try {
                const [totalReview, total1Star, total2Star,total3Star,total4Star,total5Star ] = await Promise.all([
                    this.sequelize.query(`
                        select count(*) as totalReview from reviews
                    `),
                    this.sequelize.query(`
                        select count(*) as total1Star from reviews 
                        where star_number = 1
                    `),
                    this.sequelize.query(`
                        select count(*) as total2Star from reviews 
                        where star_number = 2
                    `),this.sequelize.query(`
                    select count(*) as total3Star from reviews 
                    where star_number = 3
                    `),
                        this.sequelize.query(`
                        select count(*) as total4Star from reviews 
                        where star_number = 4
                    `),
                    this.sequelize.query(`
                        select count(*) as total5Star from reviews 
                        where star_number = 5
                    `)

                ]) 
            return {
               totalReview: totalReview[0][0].totalReview,
               total1Star: total1Star[0][0].total1Star,
               total2Star: total2Star[0][0].total2Star,
               total3Star: total3Star[0][0].total3Star,
               total4Star: total4Star[0][0].total4Star,
               total5Star: total5Star[0][0].total5Star,
            }
            } catch (error) {
                throw new CustomError(500, "loi server")
            }
    }
}
