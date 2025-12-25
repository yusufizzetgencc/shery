'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, formatPrice, calculateDiscount } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-beige-50 aspect-[3/4] mb-4 shadow-sm hover:shadow-xl transition-all duration-500">
          {/* Product Image */}
          <div className="absolute inset-0">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-white/50 to-beige-100/80 flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-inner">
                    <ShoppingBag className="w-7 h-7 text-rose-400" />
                  </div>
                  <p className="text-sm font-medium text-rose-500/80 line-clamp-2">{product.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="px-3 py-1.5 bg-rose-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-rose-200"
              >
                Yeni
              </motion.span>
            )}
            {discount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg"
              >
                %{discount} İndirim
              </motion.span>
            )}
            {product.isFeatured && !discount && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-semibold rounded-full shadow-lg"
              >
                Öne Çıkan
              </motion.span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Favorilere ekleme işlemi
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 hover:bg-white transition-all"
              aria-label="Favorilere ekle"
            >
              <Heart size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Hızlı bakış
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-rose-500 hover:bg-white transition-all"
              aria-label="Hızlı bakış"
            >
              <Eye size={18} />
            </motion.button>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick View Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full py-3 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-xl hover:bg-white transition-colors shadow-xl text-center"
            >
              Ürünü İncele
            </motion.span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2 px-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1 text-sm sm:text-base">
            {product.name}
          </h3>
        </Link>
        
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
