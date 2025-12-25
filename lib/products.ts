import { Product, Category } from './types';
import database from './database.json';

// Re-export Product type
export type { Product };

// JSON veritabanından ürünleri al
function loadProducts(): Product[] {
  return (database.products as Product[]).map(product => ({
    ...product,
    inStock: product.inStock !== false,
    createdAt: product.createdAt || new Date().toISOString()
  }));
}

// Tüm ürünleri getir
export function getProducts(): Product[] {
  return loadProducts();
}

// ID'ye göre ürün getir
export function getProductById(id: string): Product | undefined {
  const products = loadProducts();
  return products.find(p => p.id === id);
}

// Kategoriye göre ürünleri getir
export function getProductsByCategory(category: Category): Product[] {
  const products = loadProducts();
  return products.filter(p => p.category === category);
}

// Öne çıkan ürünleri getir
export function getFeaturedProducts(): Product[] {
  const products = loadProducts();
  return products.filter(p => p.isFeatured);
}

// Yeni ürünleri getir
export function getNewProducts(): Product[] {
  const products = loadProducts();
  return products.filter(p => p.isNew);
}

// Fiyatı formatla (TL)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

// İndirim yüzdesini hesapla
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
