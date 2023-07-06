import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable, map, catchError, lastValueFrom } from 'rxjs';
import { checkIfFileOrDirectoryExists, getFile, createFile } from 'src/common/helpers/storage.helper';
import { getRandomPrice } from 'src/common/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
    constructor(private http: HttpService, private configService: ConfigService ) {}

    getAllCategories(): Observable<{ strCategory: string }> {
      return this.http
        .get(`${this.configService.get('API_URL')}/list.php?c=list`)
        .pipe(map((res: any) => res.data.meals))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );
    }
  
    async getMealsByCategory(category: string): Promise<any[]> {
      const request = this.http
        .get(`${this.configService.get('API_URL')}/filter.php?c=${category}`)
        .pipe(map(({ data: { meals } }: any) => meals))
        .pipe(
          catchError(() => {
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
