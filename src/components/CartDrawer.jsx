import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const isCartOpen = useStore(state => state.isCartOpen);
  const setIsCartOpen = useStore(state => state.setIsCartOpen);
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const user = useStore(state => state.user);
  const setIsAuthOpen = useStore(state => state.setIsAuthOpen);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsAuthOpen(true);
    } else {
      // Proceed to checkout modal or page
      // We will create CheckoutModal shortly
      window.dispatchEvent(new CustomEvent('open-checkout'));
      setIsCartOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center bg-surface">
              <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="flex gap-4 border-b pb-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={`/images/${item.image}.jpg`} 
                          alt={item.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800">{item.nameHi}</h3>
                            <p className="text-sm text-gray-500">{item.nameEn}</p>
                            <p className="text-sm text-primary font-medium mt-1">{item.weight}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.weight)}
                            className="text-red-400 hover:text-red-600 p-1 h-fit"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-[#D4A017]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Subtotal</span>
                  <span className="text-[#D4A017]">₹{subtotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl font-bold transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
