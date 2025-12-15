'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Package, 
  ArrowLeft,
  X,
  Upload,
  Check,
  AlertCircle,
  TrendingUp,
  Star,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { Product, getProducts, addProduct, deleteProduct, formatPrice } from '@/lib/products';
import { Category, categoryNames, categories } from '@/lib/types';

const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;

const defaultColors = [
  { name: 'Pembe', hex: '#FFB3C6' },
  { name: 'Bej', hex: '#E8DCC4' },
  { name: 'Beyaz', hex: '#FFFFFF' },
  { name: 'Krem', hex: '#FFFAF5' },
  { name: 'Pudra', hex: '#E8A0BF' },
  { name: 'Siyah', hex: '#1A1A1A' },
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'elbise' as Category,
    sizes: [] as typeof sizes[number][],
    colors: [] as { name: string; hex: string }[],
    isNew: true,
    isFeatured: false,
  });

  const loadProducts = useCallback(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.description) {
      showNotification('error', 'Lütfen gerekli alanları doldurun');
      return;
    }

    addProduct({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      images: ['/images/products/placeholder.jpg'],
      sizes: formData.sizes,
      colors: formData.colors,
      isNew: formData.isNew,
      isFeatured: formData.isFeatured,
    });

    loadProducts();
    setShowAddModal(false);
    resetForm();
    showNotification('success', 'Ürün başarıyla eklendi');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      deleteProduct(id);
      loadProducts();
      showNotification('success', 'Ürün silindi');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'elbise',
      sizes: [],
      colors: [],
      isNew: true,
      isFeatured: false,
    });
  };

  const toggleSize = (size: typeof sizes[number]) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: { name: string; hex: string }) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.some(c => c.name === color.name)
        ? prev.colors.filter(c => c.name !== color.name)
        : [...prev.colors, color]
    }));
  };

  const stats = [
    { label: 'Toplam Ürün', value: products.length, icon: Package, color: 'from-rose-400 to-rose-500' },
    { label: 'Yeni Ürünler', value: products.filter(p => p.isNew).length, icon: TrendingUp, color: 'from-emerald-400 to-teal-500' },
    { label: 'Öne Çıkan', value: products.filter(p => p.isFeatured).length, icon: Star, color: 'from-amber-400 to-orange-400' },
    { label: 'Kategoriler', value: Object.keys(categoryNames).length, icon: Layers, color: 'from-violet-400 to-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50/30 pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors mb-3 sm:mb-4 text-sm"
            >
              <ArrowLeft size={16} />
              <span>Ana Sayfa</span>
            </Link>
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Admin <span className="gradient-text">Panel</span>
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Ürün yönetimi ve düzenleme</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Plus size={20} />
            <span>Yeni Ürün Ekle</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className="text-white sm:w-6 sm:h-6" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Ürün</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Kategori</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Fiyat</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Durum</th>
                  <th className="text-right p-4 font-semibold text-gray-600 text-sm">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-gray-50 hover:bg-rose-50/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-rose-100 to-beige-100 flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-rose-400 sm:w-6 sm:h-6" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1.5 bg-beige-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                          {categoryNames[product.category]}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-900 text-sm sm:text-base">{formatPrice(product.price)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {product.isNew && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-medium">
                              Yeni
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-medium">
                              Öne Çıkan
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            title="Düzenle"
                          >
                            <Edit3 size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Henüz ürün eklenmemiş</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-4 left-4 right-4 bottom-4 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl z-[60] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-xl sm:text-2xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Yeni Ürün Ekle
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ürün Adı *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-sm"
                    placeholder="Örn: Pembe İpek Midi Elbise"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all resize-none text-sm"
                    placeholder="Ürün açıklaması..."
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiyat (₺) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all appearance-none bg-white text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedenler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.sizes.includes(size)
                            ? 'bg-rose-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renkler
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {defaultColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => toggleColor(color)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          formData.colors.some(c => c.name === color.name)
                            ? 'bg-rose-100 border-2 border-rose-500'
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-gray-700">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-600">Yeni Ürün</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-600">Öne Çıkan Ürün</span>
                  </label>
                </div>

                {/* Image Upload Placeholder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ürün Görseli
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 sm:p-8 text-center hover:border-rose-300 transition-colors cursor-pointer">
                    <Upload size={28} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 text-sm">Görsel yüklemek için tıklayın</p>
                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP (max 5MB)</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 sm:gap-4 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    İptal
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddProduct}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-xl font-semibold shadow-lg shadow-rose-200/50 hover:shadow-xl transition-all text-sm"
                  >
                    Ürünü Ekle
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg z-[70] ${
              notification.type === 'success' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <Check size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
