import React, { useState } from 'react';
import { Tag, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import ProductDetailModal from './ProductDetailModal';

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
  hidden: { opacity: 0, y: 30 },
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

const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ProductCard = ({ product, onOpenDetail }) => {
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [isJustAdded, setIsJustAdded] = useState(false);

  const cart = useStore(state => state.cart);
  const addToCart = useStore(state => state.addToCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const removeFromCart = useStore(state => state.removeFromCart);

  const hasPricing = product.pricing && product.pricing.length > 0;
  const currentPricing = hasPricing ? product.pricing[selectedWeightIdx] : null;
  const currentWeight = currentPricing?.weight;

  const cartItem = hasPricing && currentWeight
    ? cart.find(item => item.id === product.id && item.weight === currentWeight)
    : null;
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  let whatsappUrl = `https://wa.me/917905045552?text=Hello%20Triveni%20Achar,%20I%20would%20like%20to%20order%20${encodeURIComponent(product.nameEn)}`;
  if (hasPricing && currentPricing) {
    whatsappUrl = `https://wa.me/917905045552?text=${encodeURIComponent(`मुझे ${product.nameHi} (${currentPricing.weight} - ₹${currentPricing.price}) चाहिए`)}`;
  }

  const handleAddToCart = () => {
    if (!hasPricing || !currentPricing) {
      toast.error('Pricing not available yet.');
      return;
    }
    addToCart(product, currentPricing.weight, currentPricing.price);
    setIsJustAdded(true);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1200);
  };

  const handleIncrement = () => {
    if (!currentPricing) return;
    updateQuantity(product.id, currentPricing.weight, currentQuantity + 1);
  };

  const handleDecrement = () => {
    if (!currentPricing) return;
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentPricing.weight, currentQuantity - 1);
    } else {
      removeFromCart(product.id, currentPricing.weight);
    }
  };

  return (
    <motion.div 
      className="group relative bg-white rounded-[16px] md:rounded-[20px] overflow-hidden border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex flex-col h-full hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow duration-200"
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {product.preorder && (
        <div className="absolute top-3 right-3 z-10 bg-highlight text-on-surface text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
          <Tag className="w-3 h-3 mr-1" /> Preorder
        </div>
      )}
      
      {product.spicy && (
        <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
          Spicy
        </div>
      )}

      {/* Top: Image */}
      <div 
        className="relative aspect-w-4 aspect-h-3 w-full bg-stone-100 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <picture>
          <source srcSet={`/images/${product.image}.webp`} type="image/webp" />
          <motion.img 
            src={`/images/${product.image}.jpg`} 
            alt={product.nameEn}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ minHeight: '190px', maxHeight: '220px' }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
          />
        </picture>
      </div>

      {/* Card Body (Equal height flex container) */}
      <div className="p-4 md:p-5 flex flex-col flex-grow bg-white">
        {/* Hindi name */}
        <h3 
          className="font-heading font-bold text-lg md:text-xl text-primary mb-0.5 cursor-pointer hover:underline line-clamp-1"
          onClick={() => onOpenDetail(product)}
          title={product.nameHi}
        >
          {product.nameHi}
        </h3>

        {/* English name (muted) */}
        <p className="text-stone-500 text-xs md:text-sm mb-3 font-medium line-clamp-1" title={product.nameEn}>
          {product.nameEn}
        </p>
        
        {/* Weight chips: pill-shaped, 32px height, selected state = green fill, unselected = outlined */}
        {hasPricing ? (
          <div className="flex flex-wrap gap-2 mb-3 min-h-[32px] items-center">
            {product.pricing.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedWeightIdx(idx)}
                className={`h-[32px] px-3.5 rounded-full text-xs md:text-sm font-semibold transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  selectedWeightIdx === idx
                    ? 'bg-[#1B4D2E] text-white border border-[#1B4D2E]'
                    : 'bg-transparent text-stone-700 border border-stone-300 hover:border-[#1B4D2E]'
                }`}
              >
                {p.weight}
              </button>
            ))}
          </div>
        ) : (
          <div className="min-h-[32px] mb-3" />
        )}

        {/* Price (bold, prominent) or 'Price on request' */}
        {hasPricing && currentPricing ? (
          <div className="text-[#1B4D2E] font-bold text-xl md:text-2xl mb-4 leading-none">
            ₹{currentPricing.price}
          </div>
        ) : (
          <div className="text-stone-400 font-medium text-sm md:text-base mb-4 italic leading-none flex items-center h-[28px]">
            Price on request
          </div>
        )}

        {/* Button layout: vertically stacked, full card width, 8px gap, margin-top: auto */}
        <div 
          className="mt-auto flex flex-col gap-[8px] w-full pt-1"
          style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', width: '100%' }}
        >
          {/* Primary Action: "Add to Cart" or Stepper or Out of stock */}
          {!hasPricing || product.outOfStock ? (
            <button 
              type="button"
              disabled
              className="h-[44px] min-h-[44px] w-full rounded-[10px] bg-stone-200 text-stone-500 font-semibold text-[14px] md:text-[15px] px-[16px] whitespace-nowrap flex items-center justify-center cursor-not-allowed border-0 shadow-none select-none"
              style={{ height: '44px', borderRadius: '10px', whiteSpace: 'nowrap', paddingLeft: '16px', paddingRight: '16px' }}
            >
              Out of stock
            </button>
          ) : isJustAdded ? (
            <div 
              className="h-[44px] min-h-[44px] w-full rounded-[10px] bg-[#1B4D2E] text-[#FDFBF7] font-semibold text-[14px] md:text-[15px] px-[16px] whitespace-nowrap flex items-center justify-center gap-1.5 shadow-none select-none"
              style={{ height: '44px', borderRadius: '10px', whiteSpace: 'nowrap', paddingLeft: '16px', paddingRight: '16px' }}
            >
              <Check size={16} className="text-[#FDFBF7]" />
              <span>Added ✓</span>
            </div>
          ) : currentQuantity > 0 ? (
            <div 
              className="h-[44px] min-h-[44px] w-full rounded-[10px] bg-[#1B4D2E] text-[#FDFBF7] flex items-center justify-between px-3 select-none"
              style={{ height: '44px', borderRadius: '10px' }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement();
                }}
                aria-label="Decrease quantity"
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/20 active:scale-95 transition-all text-[#FDFBF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              >
                <Minus size={16} />
              </button>
              
              <span className="font-semibold text-[14px] md:text-[15px] tracking-wide select-none">
                {currentQuantity}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement();
                }}
                aria-label="Increase quantity"
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/20 active:scale-95 transition-all text-[#FDFBF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button 
              type="button"
              onClick={handleAddToCart}
              className="h-[44px] min-h-[44px] w-full rounded-[10px] bg-[#1B4D2E] hover:bg-[#153e24] active:scale-[0.98] transition-all duration-[120ms] ease-out text-[#FDFBF7] font-semibold text-[14px] md:text-[15px] px-[16px] whitespace-nowrap flex items-center justify-center gap-2 shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              style={{ height: '44px', borderRadius: '10px', whiteSpace: 'nowrap', paddingLeft: '16px', paddingRight: '16px' }}
            >
              <ShoppingCart size={16} className="text-[#FDFBF7] flex-shrink-0" />
              <span>Add to Cart</span>
            </button>
          )}

          {/* Secondary Action: "Order on WhatsApp" */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[44px] min-h-[44px] w-full rounded-[10px] border-[1.5px] border-[#1B4D2E] bg-transparent hover:bg-[#1B4D2E]/5 active:scale-[0.98] transition-all duration-[120ms] ease-out text-[#1B4D2E] font-semibold text-[14px] md:text-[15px] px-[16px] whitespace-nowrap flex items-center justify-center gap-2 shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            style={{ height: '44px', borderRadius: '10px', whiteSpace: 'nowrap', paddingLeft: '16px', paddingRight: '16px' }}
          >
            <WhatsAppIcon size={16} className="text-[#1B4D2E] flex-shrink-0" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Tertiary Action: "Preorder Batch" (only on cards that have it) */}
          {product.preorder && (
            <a 
              href="#preorder" 
              className="text-xs text-[#1B4D2E] hover:underline text-center mt-1 py-1 font-medium bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
            >
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
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
