import { ICategory } from "../category-management/CategoryInterface";

export interface IProduct {
  id: number;
  name: string;
  long_description?: string;
  price?: number;
  short_description?: string;
  category?: ICategory;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
}
