'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, formatPrice } from '@/lib/products';
import { Product } from '@/lib/types';
import { 
  Package, 
  ArrowLeft, 
  Eye, 
  Star,
  Tag,
  Copy,
  Check,
  ExternalLink,
  FileJson
} from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const allProducts = getProducts();
    setProducts(allProducts);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sampleProduct = `{
  "id": "yeni-urun-${Date.now()}",
  "name": "Ürün Adı",
  "description": "Ürün açıklaması buraya gelecek.",
  "price": 1500,
  "originalPrice": 2000,
  "category": "elbise",
  "image": "https://res.cloudinary.com/doiaxvaa4/image/upload/...",
  "sizes": ["XS", "S", "M", "L"],
  "colors": [
    { "name": "Pembe", "hex": "#FFB3C6" },
    { "name": "Beyaz", "hex": "#FFFFFF" }
  ],
  "isNew": true,
  "isFeatured": false
}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Ana Sayfaya Dön
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ürün <span className="gradient-text">Yönetimi</span>
              </h1>
              <p className="text-gray-500 text-sm">
                Toplam {products.length} ürün
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <FileJson className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Ürün Ekleme Rehberi</h2>
              <p className="text-white/90 text-sm mb-4">
                Yeni ürün eklemek için <code className="bg-white/20 px-2 py-0.5 rounded">lib/database.json</code> dosyasını düzenleyin.
                Cloudinary'ye yüklediğiniz görsellerin linklerini bu dosyaya ekleyin.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="https://console.cloudinary.com" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                >
                  <ExternalLink size={14} />
                  Cloudinary Panel
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sample JSON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-50 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Örnek Ürün JSON Formatı</h3>
            <button
              onClick={() => copyToClipboard(sampleProduct, 'sample')}
              className="flex items-center gap-2 px-3 py-1.5 bg-beige-50 hover:bg-beige-100 rounded-lg text-sm transition-colors"
            >
              {copied === 'sample' ? (
                <>
                  <Check size={14} className="text-green-500" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Kopyala
                </>
              )}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
            <code>{sampleProduct}</code>
          </pre>
        </motion.div>

        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-rose-50 overflow-hidden"
        >
          <div className="p-4 border-b border-rose-50">
            <h3 className="font-semibold text-gray-900">Mevcut Ürünler</h3>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 flex items-center justify-center">
                <Package className="w-8 h-8 text-rose-300" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Henüz ürün yok</h4>
              <p className="text-gray-500 text-sm">
                lib/database.json dosyasına ürün ekleyerek başlayın.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-rose-50">
              {products.map((product) => (
                <div key={product.id} className="p-4 hover:bg-rose-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-rose-100 to-beige-100 flex-shrink-0">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-rose-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                        {product.isNew && (
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs rounded-full">
                            Yeni
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full flex items-center gap-1">
                            <Star size={10} />
                            Öne Çıkan
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Tag size={12} />
                          {product.category}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-beige-50 hover:bg-beige-100 rounded-lg text-sm transition-colors"
                    >
                      <Eye size={14} />
                      Görüntüle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Categories Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-beige-50 rounded-2xl"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Kullanılabilir Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            {['elbise', 'bluz', 'pantolon', 'etek', 'ceket', 'aksesuar', 'ayakkabi'].map((cat) => (
              <span 
                key={cat}
                className="px-3 py-1.5 bg-white rounded-lg text-sm text-gray-600 shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
