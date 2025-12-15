'use client';

import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { Product, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-beige-50 aspect-[3/4] mb-4">
        {/* Product Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-beige-100 to-rose-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/60 flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-rose-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <p className="text-sm text-rose-400 font-medium">{product.name}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-rose-500 text-white text-xs font-medium rounded-full"
            >
              Yeni
            </motion.span>
          )}
          {product.isFeatured && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="px-3 py-1 bg-beige-400 text-white text-xs font-medium rounded-full"
            >
              Öne Çıkan
            </motion.span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
            aria-label="Favorilere ekle"
          >
            <Heart size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 transition-colors"
            aria-label="Hızlı bakış"
          >
            <Eye size={18} />
          </motion.button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick View Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full hover:bg-white transition-colors shadow-lg"
          >
            Ürünü İncele
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {/* Colors */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-lg font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}

