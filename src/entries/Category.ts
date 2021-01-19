export interface Category {
  id: number;
  title: string;
  parentCategory?: Category;
  subCategories?: Category[];
}