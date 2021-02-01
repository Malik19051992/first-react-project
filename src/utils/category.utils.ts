import * as _ from 'lodash';

import { Category } from '../entries/Category';

export class CategoryUtils{
  static groupCategoryData(categories: Category[], parentId?: number): Category[] {
    const groupedCategories: Category[] = _.map(categories, (category: Category) => {
      category.subCategories = _.filter(categories, { parentCategoryId: category.id });

      if (category.parentCategoryId) {
        category.parentCategory = _.find(categories, { id: category.parentCategoryId })
      }

      return category;
    });

    return _.filter(groupedCategories, (category) => !category.parentCategoryId);
  }
}