'use client';

import { motion } from 'framer-motion';
import { Truck, RefreshCcw, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Ücretsiz Kargo',
    description: '500₺ üzeri siparişlerde',
    color: 'from-rose-400 to-rose-500'
  },
  {
    icon: RefreshCcw,
    title: 'Kolay İade',
    description: '14 gün içinde ücretsiz',
    color: 'from-amber-400 to-orange-400'
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL şifreleme',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Her zaman yanınızdayız',
    color: 'from-violet-400 to-purple-500'
  }
];

export default function Features() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
                className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
              >
                <feature.icon size={24} className="text-white sm:w-7 sm:h-7" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
