import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export const productsData = [
  { id: 1, nameEn: 'Mango Pickle', nameHi: 'आम का अचार', image: 'mango_pickle', preorder: true, spicy: true },
  { id: 2, nameEn: 'Lemon Pickle', nameHi: 'नींबू का अचार', image: 'mango_pickle', preorder: false, spicy: false }, // Using mango placeholder
  { id: 3, nameEn: 'Normal Mix Pickle', nameHi: 'मिक्स अचार', image: 'garlic_pickle', preorder: false, spicy: true, pricing: [{ weight: '250g', price: 150 }] }, // Using garlic placeholder
  { id: 4, nameEn: 'Garlic Pickle', nameHi: 'लहसुन का अचार', image: 'garlic_pickle', preorder: false, spicy: true },
  { id: 5, nameEn: 'Chilli Pickle', nameHi: 'मिर्च का अचार', image: 'garlic_pickle', preorder: false, spicy: true },
  { id: 7, nameEn: 'Carrot Pickle', nameHi: 'गाजर का अचार', image: 'mango_pickle', preorder: false, spicy: false },
  { id: 9, nameEn: 'Karonda-Gajar Pickle', nameHi: 'करौंदा-गाजर अचार', image: 'mango_pickle', preorder: false, spicy: false, pricing: [{ weight: '1kg', price: 600 }] },
  { id: 10, nameEn: 'Amla Pickle', nameHi: 'आंवला अचार', image: 'mango_pickle', preorder: false, spicy: false, pricing: [{ weight: '500g', price: 250 }, { weight: '1kg', price: 500 }] },
  { id: 11, nameEn: 'Suran/Yam Pickle', nameHi: 'सूरन अचार', image: 'mango_pickle', preorder: false, spicy: true, pricing: [{ weight: '500g', price: 250 }, { weight: '1kg', price: 500 }] },
  { id: 12, nameEn: 'Lal/Hara Mirch Pickle', nameHi: 'लाल/हरा मिर्च अचार', image: 'garlic_pickle', preorder: false, spicy: true, pricing: [{ weight: '500g', price: 250 }, { weight: '1kg', price: 500 }] },
  { id: 13, nameEn: 'Singhada/Water Chestnut Pickle', nameHi: 'सिंघाड़ा अचार', image: 'mango_pickle', preorder: false, spicy: false, pricing: [{ weight: '500g', price: 250 }, { weight: '1kg', price: 500 }] },
  { id: 14, nameEn: 'Kathal/Jackfruit Pickle', nameHi: 'कटहल अचार', image: 'mango_pickle', preorder: false, spicy: true, pricing: [{ weight: '500g', price: 250 }, { weight: '1kg', price: 500 }] },
];

export const dryFruitsData = [
  { id: 8, nameEn: 'Kaju-Badam Pickle', nameHi: 'काजू-बादाम अचार', image: 'dry_fruit_pickle', preorder: true, spicy: false, pricing: [{ weight: '500g', price: 600 }, { weight: '1kg', price: 1200 }] },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product, onOpenDetail }) => {
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const addToCart = useStore(state => state.addToCart);
  const setIsCartOpen = useStore(state => state.setIsCartOpen);

  const hasPricing = product.pricing && product.pricing.length > 0;
  const currentPricing = hasPricing ? product.pricing[selectedWeightIdx] : null;

  let whatsappUrl = `https://wa.me/917905045552?text=Hello%20Triveni%20Achar,%20I%20would%20like%20to%20order%20${encodeURIComponent(product.nameEn)}`;
  if (hasPricing) {
    whatsappUrl = `https://wa.me/917905045552?text=${encodeURIComponent(`मुझे ${product.nameHi} (${currentPricing.weight} - ₹${currentPricing.price}) चाहिए`)}`;
  }

  const handleAddToCart = () => {
    if (!hasPricing) {
      toast.error('Pricing not available yet.');
      return;
    }
    addToCart(product, currentPricing.weight, currentPricing.price);
    toast.success(`${product.nameEn} added to cart`);
    setIsCartOpen(true);
  };

  return (
    <motion.div 
      className="card flex flex-col group relative bg-white rounded-[24px] overflow-hidden border border-highlight/10 shadow-sm"
      variants={cardVariants}
      whileHover={{ 
        y: -6,
        boxShadow: "var(--shadow-glow-gold)",
        borderColor: "rgba(255, 179, 0, 0.4)",
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
    >
      {product.preorder && (
        <motion.div 
          className="absolute top-3 right-3 z-10 bg-highlight text-on-surface text-xs font-bold px-3 py-1.5 rounded-badge flex items-center shadow-md overflow-hidden"
          initial={{ '--shimmer-x': '-100%' }}
          whileInView={{ '--shimmer-x': '200%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          style={{
            backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: "var(--shimmer-x)"
          }}
        >
          <Tag className="w-3 h-3 mr-1" /> Preorder
        </motion.div>
      )}
      
      {product.spicy && (
        <motion.div 
          className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-badge flex items-center shadow-md overflow-hidden"
          initial={{ '--shimmer-x': '-100%' }}
          whileInView={{ '--shimmer-x': '200%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
          style={{
            backgroundImage: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: "var(--shimmer-x)"
          }}
        >
          Spicy
        </motion.div>
      )}

      <div 
        className="relative aspect-w-4 aspect-h-3 w-full bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <picture>
          <source srcSet={`/images/${product.image}.webp`} type="image/webp" />
          <motion.img 
            src={`/images/${product.image}.jpg`} 
            alt={product.nameEn}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ minHeight: '200px' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.03 }}
          />
        </picture>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow bg-white relative z-10">
        <h3 
          className="font-heading font-bold text-xl text-primary mb-1 cursor-pointer hover:underline"
          onClick={() => onOpenDetail(product)}
        >
          {product.nameHi}
        </h3>
        <p className="text-on-surface/70 text-sm mb-3 font-medium">{product.nameEn}</p>
        
        {hasPricing && (
          <div className="mb-4">
            {product.pricing.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.pricing.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWeightIdx(idx)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      selectedWeightIdx === idx
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-on-surface/70 border-gray-300 hover:border-primary'
                    }`}
                  >
                    {p.weight}
                  </button>
                ))}
              </div>
            )}
            <div className="text-[#D4A017] font-bold text-lg">
              {product.pricing.length === 1 ? `${currentPricing.weight} — ` : ''}₹{currentPricing.price}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1 text-sm py-2.5 bg-[#4CAF50] hover:bg-[#45a049] border-[#4CAF50] hover:border-[#45a049] !text-white"
            >
              Add to Cart
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 text-sm py-2.5 text-center flex items-center justify-center gap-1"
            >
              Order on WhatsApp
            </a>
          </div>
          
          {product.preorder && (
            <a href="#preorder" className="btn-secondary w-full text-sm py-2.5">
              Preorder Batch
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="py-24 bg-surface relative">
      <ProductDetailModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <section id="pickles" className="mb-24">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Our Traditional Range</h2>
            <p className="text-on-surface/80 max-w-2xl mx-auto text-lg">Made with cold-pressed mustard oil and sun-dried spices, following our grandmother's sacred recipes.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {productsData.map(product => (
              <ProductCard key={product.id} product={product} onOpenDetail={setSelectedProduct} />
            ))}
          </motion.div>
        </section>

        <section id="dry-fruit" className="bg-primary/5 rounded-[2rem] p-8 md:p-12 border border-primary/10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block">Premium Collection</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Dry Fruit Pickles</h2>
            <p className="text-on-surface/80 max-w-2xl mx-auto text-lg">A rich, festive blend of premium nuts and raisins steeped in aromatic spices. Perfect for gifting and special occasions.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {dryFruitsData.map(product => (
              <ProductCard key={product.id} product={product} onOpenDetail={setSelectedProduct} />
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default ProductGrid;
