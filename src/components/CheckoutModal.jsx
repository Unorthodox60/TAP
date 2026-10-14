import React, { useState, useEffect } from 'react';
import { X, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Add Razorpay script to head if not present
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CheckoutModal = ({ isOpen, onClose }) => {
  const cart = useStore(state => state.cart);
  const clearCart = useStore(state => state.clearCart);
  const user = useStore(state => state.user);

  const [step, setStep] = useState(1); // 1: address, 2: processing/payment, 3: success
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    pincode: '',
    landmark: ''
  });
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  // Free delivery above ₹999, else ₹50 flat rate
  const deliveryCharge = subtotal >= 999 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  // Simulate payment flow
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    // Usually you'd call your backend to create an order here.
    // We are simulating this for the frontend integration.
    
    const options = {
      key: 'rzp_test_placeholder_key', // Enter the Key ID generated from the Dashboard
      amount: total * 100, // Amount is in currency subunits. Default currency is INR.
      currency: 'INR',
      name: 'Triveni Achar',
      description: 'Order Payment',
      image: '/images/logo.png', // Assuming we have a logo
      handler: async function (response) {
        // Payment successful
        try {
          // Save order to supabase (assuming we have an orders table)
          /* 
          await supabase.from('orders').insert([{
            user_id: user.id,
            total_amount: total,
            delivery_address: address,
            items: cart,
            payment_id: response.razorpay_payment_id,
            status: 'Placed'
          }]);
          */
          
          setStep(3);
          clearCart();
          toast.success('Order placed successfully!');
        } catch (err) {
          toast.error('Failed to save order details.');
        }
      },
      prefill: {
        name: address.name,
        contact: address.phone,
      },
      theme: {
        color: '#D4A017' // highlight color
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      toast.error(response.error.description || 'Payment Failed');
    });
    paymentObject.open();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[110] px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-full"
        >
          <div className="p-4 border-b flex justify-between items-center bg-surface">
            <h2 className="text-xl font-heading font-bold text-primary">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 3 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-primary mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                Thank you for your order. We have sent a confirmation to your WhatsApp. You can track your order status in 'My Orders'.
              </p>
              <button 
                onClick={onClose}
                className="btn-primary py-3 px-8"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left Column: Address Form */}
              <div className="w-full md:w-3/5 p-6 overflow-y-auto border-r border-gray-100">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-primary" /> Delivery Details
                </h3>
                
                <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        required type="text" 
                        value={address.name} onChange={e => setAddress({...address, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="Arjun Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        required type="tel" pattern="[0-9]{10}"
                        value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="10 digit mobile number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <textarea 
                      required rows={3}
                      value={address.street} onChange={e => setAddress({...address, street: e.target.value})}
                      className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                      placeholder="House No., Building Name, Street Area"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input 
                        required type="text" pattern="[0-9]{6}"
                        value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="e.g. 110001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                      <input 
                        type="text" 
                        value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                        placeholder="Near hospital, temple, etc."
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Summary */}
              <div className="w-full md:w-2/5 bg-gray-50 p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
                <div className="flex-1 overflow-y-auto mb-4 pr-2">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.weight}`} className="flex justify-between text-sm">
                        <div className="flex gap-2">
                          <span className="text-gray-500">{item.quantity}x</span>
                          <span className="font-medium text-gray-800 line-clamp-1">{item.nameHi}</span>
                          <span className="text-gray-500">({item.weight})</span>
                        </div>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-xs text-green-600">Add ₹{999 - subtotal} more for FREE delivery!</p>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                >
                  <CreditCard className="w-5 h-5" />
                  {loading ? 'Processing...' : `Pay ₹${total}`}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
