import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  getAllCategories() {
    return this.http
      .get(`${API_URL}/list.php?c=list`)
      .pipe(map((res: any) => res.data.meals));
  }
}
