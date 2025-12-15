'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

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
    <footer className="bg-gradient-to-b from-beige-50 to-white">
      {/* Newsletter Section */}
      <div className="border-b border-beige-100">
        <div className="container-custom py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center px-4"
          >
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Bültenimize Katılın
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Yeni koleksiyonlar, özel indirimler ve stil önerilerinden ilk siz haberdar olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-beige-200 bg-white focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Abone Ol</span>
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/">
              <h2 
                className="text-2xl sm:text-3xl tracking-[0.15em] mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="gradient-text font-medium">SHERY</span>
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 max-w-sm text-sm leading-relaxed">
              Kadın modasında zarafet ve şıklığı bir araya getiriyoruz. 
              Her parça, sizin benzersiz tarzınızı yansıtmak için özenle seçildi.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <span>Bağdat Caddesi No: 123, Kadıköy, İstanbul</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-rose-500 flex-shrink-0" />
                <span>+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-rose-500 flex-shrink-0" />
                <span>info@shery.com.tr</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-rose-500 hover:border-rose-200 hover:shadow-md transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Alışveriş</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Kurumsal</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Yardım</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-rose-500 transition-colors text-sm"
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
      <div className="border-t border-gray-100">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
