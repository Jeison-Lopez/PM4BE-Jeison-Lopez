import { Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  async seedCategories() {
    await this.categoriesService.seedCategories();
    return { message: 'Categories seeded successfully' };
  }
}
