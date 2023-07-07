import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable, map, catchError, lastValueFrom } from 'rxjs';
import { getRandomPrice } from 'src/common/utils/utils';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { IProduct } from 'src/common/interfaces/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  getAllCategories(): Observable<{ strCategory: string }> {
    return this.http
      .get(`${this.configService.get('API_URL')}/list.php?c=list`)
      .pipe(map(({ data: { meals } }) => meals))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  getMealsByCategory(category: string): Promise<IProduct[]> {
    const request = this.http
      .get(`${this.configService.get('API_URL')}/filter.php?c=${category}`)
      .pipe(map(({ data: { meals } }) => meals))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return lastValueFrom(request);
  }

  createProducts(products: IProduct[]) {
    return this.productModel.insertMany(products);
  }

  getProductsByCategory(category: string) {
    return this.productModel.find({ category });
  }

  getProductsByIds(idsMeals: string[]) {
    return this.productModel.find({ idMeal: { $in: idsMeals } });
  }

  async createCategoryPriceDocuments(meals: IProduct[], category: string) {
    const mealsWithPrice = meals.map((meal) => ({
      ...meal,
      price: getRandomPrice(category),
      category,
    }));

    await this.createProducts(mealsWithPrice);

    return mealsWithPrice;
  }
}
