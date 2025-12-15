'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Search, ShoppingBag } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/products', label: 'Koleksiyon' },
  { href: '/products?category=elbise', label: 'Elbiseler' },
  { href: '/products?category=bluz', label: 'Bluzlar' },
  { href: '/products?category=aksesuar', label: 'Aksesuarlar' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-rose-500 transition-colors"
              aria-label="Menüyü aç"
            >
              <Menu size={24} />
            </button>

            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-6 flex-1">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors underline-animation whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <Link href="/" className="flex-shrink-0 mx-4 lg:mx-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h1 
                  className="text-2xl md:text-3xl tracking-[0.2em] font-light"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="gradient-text font-medium">SHERY</span>
                </h1>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors underline-animation whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Icons */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
                  aria-label="Ara"
                >
                  <Search size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
                  aria-label="Favoriler"
                >
                  <Heart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-rose-500 transition-colors relative"
                  aria-label="Sepet"
                >
                  <ShoppingBag size={20} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    0
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
                aria-label="Favoriler"
              >
                <Heart size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-rose-500 transition-colors relative"
                aria-label="Sepet"
              >
                <ShoppingBag size={20} />
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-[60] lg:hidden shadow-2xl"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 
                    className="text-xl tracking-[0.15em]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="gradient-text font-medium">SHERY</span>
                  </h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50"
                    aria-label="Menüyü kapat"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="flex-1 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-base text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-3 px-4 text-sm text-gray-500 hover:text-rose-500 transition-colors"
                  >
                    <span>Admin Panel</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
