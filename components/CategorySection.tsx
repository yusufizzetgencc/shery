'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';

const categoryImages: Record<string, string> = {
  elbise: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
  bluz: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=600&auto=format&fit=crop',
  pantolon: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop',
  etek: 'https://images.unsplash.com/photo-1577900232427-18c9f3f59ff9?q=80&w=600&auto=format&fit=crop',
  ceket: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
  aksesuar: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
  ayakkabi: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop',
};

export default function CategorySection() {
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-beige-50/50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-rose-100/20 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-beige-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block text-rose-500 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Kategoriler
          </motion.span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Stilinizi <span className="gradient-text">Keşfedin</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base px-4">
            Her tarza ve her ana uygun koleksiyonlarımızı keşfedin.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`${index === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''}`}
            >
              <Link href={`/products?category=${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 ${
                    index === 0 ? 'aspect-[4/3] md:aspect-square' : 'aspect-square'
                  }`}
                >
                  {/* Background Image or Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-rose-100 to-beige-200">
                    {categoryImages[category.id] && (
                      <Image
                        src={categoryImages[category.id]}
                        alt={category.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className={`mx-auto mb-3 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center ${
                          index === 0 ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'
                        }`}>
                          <span className={`${index === 0 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                            {category.icon}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    <div className="flex items-end justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 
                          className={`text-white font-semibold mb-1 truncate ${
                            index === 0 ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-xl'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {category.name}
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm hidden sm:block line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                      <motion.div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-2"
                      >
                        <ArrowUpRight size={16} className="sm:w-[18px] sm:h-[18px]" />
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
