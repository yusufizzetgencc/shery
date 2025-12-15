'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-beige-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-beige-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-rose-50/30 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative container-custom pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-rose-100 shadow-sm mb-6"
            >
              <Sparkles size={16} className="text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Yeni Sezon Koleksiyonu</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Zarafeti
              <br />
              <span className="gradient-text font-medium">Yeniden</span>
              <br />
              Keşfedin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Kadın modasında yeni bir soluk. Şıklığınızı tamamlayacak özel parçalar, 
              benzersiz tasarımlar ve zamansız elegans.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group"
                >
                  Koleksiyonu Keşfet
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/products?new=true">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto btn-secondary"
                >
                  Yeni Gelenler
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 mt-12 pt-8 border-t border-rose-100"
            >
              {[
                { value: '500+', label: 'Ürün Çeşidi' },
                { value: '50K+', label: 'Mutlu Müşteri' },
                { value: '4.9', label: 'Memnuniyet' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-[400px] lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-rose-200/50">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
                  alt="Shery Fashion - Kadın Modası"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-transparent to-transparent" />
              </div>

              {/* Floating Card - Top Left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 lg:-left-8 top-1/4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 border border-rose-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 flex items-center justify-center">
                    <span className="text-white text-lg">👗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">En Çok Satan</p>
                    <p className="text-rose-500 text-xs">İpek Elbise</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 lg:-right-8 bottom-1/4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 border border-rose-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">4.9 Puan</p>
                    <p className="text-gray-400 text-xs">5000+ Değerlendirme</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 bg-beige-200/50 rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-20 h-20 sm:w-28 sm:h-28 bg-rose-100/50 rounded-full -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-9 border-2 border-rose-300 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-rose-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
