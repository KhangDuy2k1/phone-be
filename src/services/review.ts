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
                let star_number: number =
                    (allReview as any).sum_star / countReview;
                console.log(star_number);
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
            console.log(error);
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
}
