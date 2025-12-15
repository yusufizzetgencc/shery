'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product, getProducts } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const featured = allProducts.filter(p => p.isFeatured).slice(0, 4);
    setProducts(featured);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-rose-500 text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Öne Çıkanlar
          </motion.span>
          <h2 
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            En Çok <span className="gradient-text">Sevilenler</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Müşterilerimizin en çok tercih ettiği, kalite ve şıklığı bir arada sunan özel parçalar.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              Tüm Ürünleri Gör
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

