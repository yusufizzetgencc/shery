'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product, getProducts } from '@/lib/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const newProducts = allProducts.filter(p => p.isNew).slice(0, 4);
    setProducts(newProducts);
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-beige-50/50">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-beige-100/40 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/80 backdrop-blur-sm rounded-full mb-4"
            >
              <Sparkles size={16} className="text-rose-500" />
              <span className="text-rose-600 text-sm font-semibold">Yeni Sezon</span>
            </motion.div>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Yeni <span className="gradient-text">Gelenler</span>
            </h2>
            <p className="text-gray-600 max-w-md text-sm sm:text-base">
              Bu sezonun en trend parçaları ve yeni tasarımlar sizi bekliyor.
            </p>
          </div>

          <Link href="/products?new=true" className="hidden sm:block flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Tümünü Gör
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:hidden"
        >
          <Link href="/products?new=true">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Tümünü Gör
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
