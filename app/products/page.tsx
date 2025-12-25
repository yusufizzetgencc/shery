'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/products';
import { Category, categoryNames, categories } from '@/lib/types';
import { Filter, X, ChevronDown, Grid3X3, LayoutGrid, Loader2, SlidersHorizontal } from 'lucide-react';

const sortOptions = [
  { value: 'newest', label: 'En Yeniler' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'name', label: 'İsim: A-Z' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  const isNewParam = searchParams.get('new') === 'true';

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyNew, setShowOnlyNew] = useState(isNewParam);

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (isNewParam) {
      setShowOnlyNew(true);
    }
  }, [isNewParam]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by new
    if (showOnlyNew) {
      filtered = filtered.filter(p => p.isNew);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
    }

    return filtered;
  }, [products, selectedCategory, sortBy, showOnlyNew]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-28 pb-20">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {selectedCategory !== 'all' 
              ? categoryNames[selectedCategory] 
              : showOnlyNew 
                ? 'Yeni Gelenler' 
                : 'Tüm Koleksiyon'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {filteredProducts.length} ürün listeleniyor
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 p-4 bg-white rounded-2xl shadow-sm border border-rose-50"
        >
          {/* Left Side - Filter Toggle & Categories */}
          <div className="flex items-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-50 to-beige-50 hover:from-rose-100 hover:to-beige-100 rounded-full text-sm font-medium transition-colors border border-rose-100"
            >
              <SlidersHorizontal size={16} />
              Filtreler
              {(selectedCategory !== 'all' || showOnlyNew) && (
                <span className="w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {(selectedCategory !== 'all' ? 1 : 0) + (showOnlyNew ? 1 : 0)}
                </span>
              )}
            </motion.button>

            {/* Active Filters */}
            <AnimatePresence>
              {selectedCategory !== 'all' && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSelectedCategory('all')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm hover:bg-rose-200 transition-colors"
                >
                  {categoryNames[selectedCategory]}
                  <X size={14} />
                </motion.button>
              )}
              {showOnlyNew && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setShowOnlyNew(false)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm hover:bg-rose-200 transition-colors"
                >
                  Yeni Ürünler
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Sort & Grid */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-beige-50 border border-beige-200 rounded-full text-sm focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-beige-50 rounded-full border border-beige-100">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-full transition-all ${gridCols === 3 ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded-full transition-all ${gridCols === 4 ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid3X3 size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-rose-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Kategoriler</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200'
                        : 'bg-beige-50 text-gray-600 hover:bg-beige-100'
                    }`}
                  >
                    Tümü
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200'
                          : 'bg-beige-50 text-gray-600 hover:bg-beige-100'
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-beige-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnlyNew}
                      onChange={(e) => setShowOnlyNew(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-600">Sadece yeni ürünleri göster</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            gridCols === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-100 to-beige-100 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-rose-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500 mb-6">Bu kriterlere uygun ürün bulunmuyor.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setShowOnlyNew(false);
              }}
              className="btn-primary"
            >
              Filtreleri Temizle
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-28 pb-20 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Yükleniyor...</p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductsContent />
    </Suspense>
  );
}
