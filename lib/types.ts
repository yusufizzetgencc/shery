export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sizes: Size[];
  colors: ProductColor[];
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: Date;
}

export type Category = 
  | 'elbise'
  | 'bluz'
  | 'pantolon'
  | 'etek'
  | 'ceket'
  | 'aksesuar'
  | 'ayakkabi';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    id: 'elbise',
    name: 'Elbiseler',
    description: 'Zarif ve şık elbise koleksiyonu',
    image: '/images/categories/elbise.jpg'
  },
  {
    id: 'bluz',
    name: 'Bluzlar',
    description: 'Her tarza uygun bluz seçenekleri',
    image: '/images/categories/bluz.jpg'
  },
  {
    id: 'pantolon',
    name: 'Pantolonlar',
    description: 'Rahat ve şık pantolon modelleri',
    image: '/images/categories/pantolon.jpg'
  },
  {
    id: 'etek',
    name: 'Etekler',
    description: 'Feminen ve modern etek tasarımları',
    image: '/images/categories/etek.jpg'
  },
  {
    id: 'ceket',
    name: 'Ceketler',
    description: 'Sezonun en trend ceketleri',
    image: '/images/categories/ceket.jpg'
  },
  {
    id: 'aksesuar',
    name: 'Aksesuarlar',
    description: 'Stilinizi tamamlayacak aksesuarlar',
    image: '/images/categories/aksesuar.jpg'
  },
  {
    id: 'ayakkabi',
    name: 'Ayakkabılar',
    description: 'Şık ve rahat ayakkabı modelleri',
    image: '/images/categories/ayakkabi.jpg'
  }
];

export const categoryNames: Record<Category, string> = {
  elbise: 'Elbiseler',
  bluz: 'Bluzlar',
  pantolon: 'Pantolonlar',
  etek: 'Etekler',
  ceket: 'Ceketler',
  aksesuar: 'Aksesuarlar',
  ayakkabi: 'Ayakkabılar'
};


