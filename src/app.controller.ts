import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all-categories')
  getCategories() {
    return this.appService.getAllCategories();
  }

  @Get('list-meals/:category')
  async getMealsByCategory(@Param('category') category: string) {
    const isFileCreated = this.appService.checkCategoryFileExist(category);

    if (isFileCreated) return this.appService.getCategoryFile(category);

    const meals = await this.appService.getMealsByCategory(category);

    if (!meals) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return this.appService.createCategoryPriceFile(meals, category);
  }
}
