'use client';

import { motion } from 'framer-motion';
import { Truck, RefreshCcw, Shield, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Ücretsiz Kargo',
    description: '500₺ üzeri siparişlerde kargo bedava'
  },
  {
    icon: RefreshCcw,
    title: 'Kolay İade',
    description: '14 gün içinde ücretsiz iade imkanı'
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL ile güvenli alışveriş'
  },
  {
    icon: Headphones,
    title: '7/24 Destek',
    description: 'Her zaman yanınızdayız'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white border-y border-beige-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-100 to-beige-100 flex items-center justify-center group-hover:from-rose-200 group-hover:to-rose-100 transition-all"
              >
                <feature.icon size={28} className="text-rose-500" />
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

