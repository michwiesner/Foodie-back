import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

  @Get('all-categories')
  getCategories() {
    return this.productService.getAllCategories();
  }

  @Get('list-meals/:category')
  async getMealsByCategory(@Param('category') category: string) {
    const isFileCreated = this.productService.checkCategoryFileExist(category);

    if (isFileCreated) return this.productService.getCategoryFile(category);

    const meals = await this.productService.getMealsByCategory(category);

    if (!meals) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return this.productService.createCategoryPriceFile(meals, category);
  }
}
