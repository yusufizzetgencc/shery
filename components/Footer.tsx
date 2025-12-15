'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Yeni Gelenler', href: '/products?new=true' },
    { label: 'Elbiseler', href: '/products?category=elbise' },
    { label: 'Bluzlar', href: '/products?category=bluz' },
    { label: 'Aksesuarlar', href: '/products?category=aksesuar' },
    { label: 'Tüm Ürünler', href: '/products' },
  ],
  company: [
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Kariyer', href: '/careers' },
    { label: 'İletişim', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'SSS', href: '/faq' },
    { label: 'Kargo & Teslimat', href: '/shipping' },
    { label: 'İade & Değişim', href: '/returns' },
    { label: 'Beden Rehberi', href: '/size-guide' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/shery', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/shery', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/shery', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-beige-50 to-beige-100">
      {/* Newsletter Section */}
      <div className="border-b border-beige-200">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 
              className="text-3xl md:text-4xl mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Bültenimize Katılın
            </h3>
            <p className="text-gray-600 mb-8">
              Yeni koleksiyonlar, özel indirimler ve stil önerilerinden ilk siz haberdar olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-6 py-4 rounded-full border border-beige-300 bg-white focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Abone Ol
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <h2 
                className="text-3xl tracking-[0.2em] mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="gradient-text">SHERY</span>
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm">
              Kadın modasında zarafet ve şıklığı bir araya getiriyoruz. 
              Her parça, sizin benzersiz tarzınızı yansıtmak için özenle seçildi.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-rose-500" />
                <span>Bağdat Caddesi No: 123, Kadıköy, İstanbul</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-rose-500" />
                <span>+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-rose-500" />
                <span>info@shery.com.tr</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 hover:shadow-md transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Alışveriş</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Kurumsal</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-5">Yardım</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-beige-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 Shery. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-rose-500 transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="hover:text-rose-500 transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

