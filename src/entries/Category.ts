export interface Category {
  id: number;
  title: string;
  parentCategory?: Category;
  parentCategoryId?: number;
  subCategories?: Category[];
}