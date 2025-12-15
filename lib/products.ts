import { Product } from './types';

// Mock products data - Bu veriler daha sonra gerçek veritabanı ile değiştirilecek
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pembe İpek Midi Elbise',
    description: 'Zarif ipek kumaştan üretilmiş, belden büzgülü midi boy elbise. Özel günleriniz için mükemmel bir seçim.',
    price: 2450,
    category: 'elbise',
    images: ['/images/products/dress-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pembe', hex: '#FFB3C6' },
      { name: 'Bej', hex: '#E8DCC4' }
    ],
    isNew: true,
    isFeatured: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Bej Saten Bluz',
    description: 'Yumuşak saten kumaştan, V yaka detaylı şık bluz. Hem günlük hem de özel kombinlerde kullanılabilir.',
    price: 890,
    category: 'bluz',
    images: ['/images/products/blouse-1.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bej', hex: '#F5E6D3' },
      { name: 'Beyaz', hex: '#FFFFFF' }
    ],
    isNew: true,
    isFeatured: true,
    createdAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Yüksek Bel Wide Leg Pantolon',
    description: 'Yüksek bel, geniş paça kesim pantolon. Şık ve rahat bir görünüm sunar.',
    price: 1250,
    category: 'pantolon',
    images: ['/images/products/pants-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Krem', hex: '#FFFAF5' },
      { name: 'Siyah', hex: '#1A1A1A' }
    ],
    isFeatured: true,
    createdAt: new Date('2024-01-13')
  },
  {
    id: '4',
    name: 'Pileli Midi Etek',
    description: 'Zarif pileli detaylı, midi boy etek. Hafif dökümlü kumaşı ile hareket özgürlüğü sağlar.',
    price: 980,
    category: 'etek',
    images: ['/images/products/skirt-1.jpg'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pudra', hex: '#E8A0BF' },
      { name: 'Kum Beji', hex: '#D4C4A8' }
    ],
    isNew: true,
    createdAt: new Date('2024-01-12')
  },
  {
    id: '5',
    name: 'Oversize Blazer Ceket',
    description: 'Trend oversize kesim blazer ceket. Premium kumaş kalitesi ile sezon boyunca vazgeçilmeziniz olacak.',
    price: 2890,
    category: 'ceket',
    images: ['/images/products/jacket-1.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Bej', hex: '#E8DCC4' },
      { name: 'Pembe', hex: '#FFD6E0' }
    ],
    isFeatured: true,
    createdAt: new Date('2024-01-11')
  },
  {
    id: '6',
    name: 'İnci Detaylı Küpe',
    description: 'Minimal tasarımlı, zarif inci detaylı küpe. Her kombine uyum sağlar.',
    price: 450,
    category: 'aksesuar',
    images: ['/images/products/accessory-1.jpg'],
    sizes: [],
    colors: [
      { name: 'Altın', hex: '#D4AF37' },
      { name: 'Gümüş', hex: '#C0C0C0' }
    ],
    isNew: true,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '7',
    name: 'Topuklu Stiletto',
    description: '9 cm topuk yüksekliğinde, zarif stiletto ayakkabı. Özel günleriniz için ideal.',
    price: 1750,
    category: 'ayakkabi',
    images: ['/images/products/shoes-1.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Nude', hex: '#E8DCC4' },
      { name: 'Siyah', hex: '#1A1A1A' }
    ],
    isFeatured: true,
    createdAt: new Date('2024-01-09')
  },
  {
    id: '8',
    name: 'Çiçek Desenli Maxi Elbise',
    description: 'Romantik çiçek desenli, fırfır detaylı maxi elbise. Yaz aylarının vazgeçilmezi.',
    price: 1890,
    category: 'elbise',
    images: ['/images/products/dress-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pembe Çiçekli', hex: '#FFB3C6' }
    ],
    isNew: true,
    createdAt: new Date('2024-01-08')
  }
];

// LocalStorage'dan ürünleri getir
export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return mockProducts;
  }
  
  const stored = localStorage.getItem('shery-products');
  if (stored) {
    const products = JSON.parse(stored);
    return products.map((p: Product) => ({
      ...p,
      createdAt: new Date(p.createdAt)
    }));
  }
  
  // İlk yüklemede mock ürünleri kaydet
  localStorage.setItem('shery-products', JSON.stringify(mockProducts));
  return mockProducts;
}

// Yeni ürün ekle
export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  products.unshift(newProduct);
  localStorage.setItem('shery-products', JSON.stringify(products));
  
  return newProduct;
}

// Ürün sil
export function deleteProduct(id: string): void {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem('shery-products', JSON.stringify(filtered));
}

// Ürün güncelle
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  localStorage.setItem('shery-products', JSON.stringify(products));
  
  return products[index];
}

// Kategoriye göre ürünleri getir
export function getProductsByCategory(category: string): Product[] {
  const products = getProducts();
  return products.filter(p => p.category === category);
}

// Öne çıkan ürünleri getir
export function getFeaturedProducts(): Product[] {
  const products = getProducts();
  return products.filter(p => p.isFeatured);
}

// Yeni ürünleri getir
export function getNewProducts(): Product[] {
  const products = getProducts();
  return products.filter(p => p.isNew);
}

// Fiyatı formatla
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

