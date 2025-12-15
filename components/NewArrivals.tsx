'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product, getProducts } from '@/lib/products';
import { Sparkles } from 'lucide-react';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const newProducts = allProducts.filter(p => p.isNew).slice(0, 4);
    setProducts(newProducts);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-beige-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-beige-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-4"
            >
              <Sparkles size={16} className="text-rose-500" />
              <span className="text-rose-600 text-sm font-medium">Yeni Sezon</span>
            </motion.div>
            <h2 
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Yeni <span className="gradient-text">Gelenler</span>
            </h2>
            <p className="text-gray-600 max-w-lg">
              Bu sezonun en trend parçaları ve yeni tasarımlar sizi bekliyor.
            </p>
          </div>

          <Link href="/products?new=true" className="mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              Tümünü Gör
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

