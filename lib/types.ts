// Ürün tipi tanımı
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // İndirimli ürünler için orijinal fiyat
  category: Category;
  image: string; // Ana ürün görseli (Cloudinary URL)
  images?: string[]; // Ek görseller
  sizes: Size[];
  colors: ProductColor[];
  isNew?: boolean;
  isFeatured?: boolean;
  inStock?: boolean;
  createdAt?: string;
}

// Kategori tipi
export type Category = 
  | 'elbise'
  | 'bluz'
  | 'pantolon'
  | 'etek'
  | 'ceket'
  | 'aksesuar'
  | 'ayakkabi';

// Beden tipi
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

// Renk tipi
export interface ProductColor {
  name: string;
  hex: string;
}

// Kategori bilgisi
export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}

// JSON veritabanı tipi
export interface Database {
  categories: CategoryInfo[];
  products: Product[];
}

// Kategorileri getir
import database from './database.json';

export const categories: CategoryInfo[] = database.categories as CategoryInfo[];

export const categoryNames: Record<Category, string> = {
  elbise: 'Elbiseler',
  bluz: 'Bluzlar',
  pantolon: 'Pantolonlar',
  etek: 'Etekler',
  ceket: 'Ceketler',
  aksesuar: 'Aksesuarlar',
  ayakkabi: 'Ayakkabılar'
};
