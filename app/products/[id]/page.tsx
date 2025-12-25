'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Share2, 
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { Product, getProductById, getProductsByCategory, formatPrice, calculateDiscount } from '@/lib/products';
import { categoryNames } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string);
      if (foundProduct) {
        setProduct(foundProduct);
        // Varsayılan seçimleri ayarla
        if (foundProduct.sizes?.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        if (foundProduct.colors?.length > 0) {
          setSelectedColor(foundProduct.colors[0].name);
        }
        // İlgili ürünleri getir
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Ürün Bulunamadı</h2>
          <p className="text-gray-500 mb-6">Aradığınız ürün mevcut değil.</p>
          <Link href="/products" className="btn-primary">
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-24 pb-20">
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link href="/" className="hover:text-rose-500 transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-rose-500 transition-colors">Ürünler</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-rose-500 transition-colors">
            {categoryNames[product.category]}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        {/* Back Button (Mobile) */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Geri</span>
        </motion.button>

        {/* Product Detail Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 to-beige-100 shadow-xl">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-rose-300" />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-4 py-2 bg-rose-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Yeni
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    %{discount} İndirim
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isWishlisted 
                    ? 'bg-rose-500 text-white' 
                    : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-rose-500'
                }`}
              >
                <Heart size={22} fill={isWishlisted ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-wider mb-2">
              {categoryNames[product.category]}
            </span>

            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Renk: <span className="font-normal text-gray-600">{selectedColor}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-rose-500 ring-2 ring-rose-200 scale-110' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Beden</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 rounded-xl font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                          : 'bg-beige-50 text-gray-700 hover:bg-beige-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Adet</h3>
              <div className="inline-flex items-center gap-4 p-1 bg-beige-50 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4"
              >
                <ShoppingBag size={20} />
                Sepete Ekle
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-xl bg-beige-100 flex items-center justify-center text-gray-600 hover:text-rose-500 hover:bg-beige-200 transition-all"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-beige-100">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rose-50 flex items-center justify-center">
                  <Truck size={20} className="text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">Ücretsiz Kargo</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rose-50 flex items-center justify-center">
                  <RotateCcw size={20} className="text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">Kolay İade</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-rose-50 flex items-center justify-center">
                  <Shield size={20} className="text-rose-500" />
                </div>
                <p className="text-xs text-gray-600">Güvenli Ödeme</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl sm:text-3xl text-center mb-12"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Benzer <span className="gradient-text">Ürünler</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
