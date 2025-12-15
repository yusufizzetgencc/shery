'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

export default function CategorySection() {
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-24 bg-gradient-to-b from-beige-50 to-white">
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
            Kategoriler
          </motion.span>
          <h2 
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Stilinizi <span className="gradient-text">Keşfedin</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Her tarza ve her ana uygun koleksiyonlarımızı keşfedin.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <Link href={`/products?category=${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'
                  }`}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-rose-100 to-beige-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className={`mx-auto mb-4 rounded-full bg-white/40 flex items-center justify-center ${
                          index === 0 ? 'w-24 h-24' : 'w-16 h-16'
                        }`}>
                          <svg 
                            className={`text-rose-400 ${index === 0 ? 'w-12 h-12' : 'w-8 h-8'}`}
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
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 
                          className={`text-white font-medium mb-1 ${
                            index === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {category.name}
                        </h3>
                        <p className="text-white/70 text-sm hidden sm:block">
                          {category.description}
                        </p>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

