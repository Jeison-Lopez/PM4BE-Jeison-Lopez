import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async seedCategories() {
    const categoriesData = [
      { name: 'Category One' },
      { name: 'Category Two' },
      // Agrega más categorías si es necesario
    ];

    for (const categoryData of categoriesData) {
      const category = await this.categoriesRepository.findOne({
        where: { name: categoryData.name },
      });
      if (!category) {
        const newCategory = this.categoriesRepository.create(categoryData);
        await this.categoriesRepository.save(newCategory);
      }
    }
  }
}
