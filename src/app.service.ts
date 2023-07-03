import { Injectable, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, lastValueFrom, map } from 'rxjs';
import {
  checkIfFileOrDirectoryExists,
  createFile,
  getFile,
} from './common/helpers/storage.helper';
import { getRandomPrice } from './common/utils/utils';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getAllCategories(): Observable<{ strCategory: string }> {
    return this.http
      .get(`${API_URL}/list.php?c=list`)
      .pipe(map((res: any) => res.data.meals))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getMealsByCategory(category: string): Promise<any[]> {
    const request = this.http
      .get(`${API_URL}/filter.php?c=${category}`)
      .pipe(map(({ data: { meals } }: any) => meals))
      .pipe(
        catchError((error) => {
          console.log('error: ', error);
          throw new ForbiddenException('API not available');
        }),
      );

    return lastValueFrom(request);
  }

  checkCategoryFileExist = (category: string) =>
    checkIfFileOrDirectoryExists(`src/storage/${category}.txt`);

  getCategoryFile = (category: string) =>
    getFile(`src/storage/${category}.txt`, 'utf-8');

  createCategoryPriceFile = async (meals: any[], category: string) => {
    const mealsWithPrice = meals.map((meal) => ({
      price: getRandomPrice(category),
      ...meal,
    }));

    await createFile(
      `src/storage`,
      `${category}.txt`,
      JSON.stringify(mealsWithPrice),
    );
    return mealsWithPrice;
  };
}
