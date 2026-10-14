import React, { useState } from 'react';
import { X, Star, ShoppingCart, MessageSquare } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  const user = useStore(state => state.user);
  const addToCart = useStore(state => state.addToCart);
  const setIsCartOpen = useStore(state => state.setIsCartOpen);

  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Priya S.', rating: 5, text: 'Absolutely authentic taste! Reminds me of home.', date: '2023-10-12' },
    { id: 2, user: 'Rohan M.', rating: 4, text: 'Very good quality, will order again.', date: '2023-09-28' },
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!isOpen || !product) return null;

  const hasPricing = product.pricing && product.pricing.length > 0;
  const currentPricing = hasPricing ? product.pricing[selectedWeightIdx] : null;

  const handleAddToCart = () => {
    if (!hasPricing) {
      toast.error('Pricing not available yet.');
      return;
    }
    addToCart(product, currentPricing.weight, currentPricing.price);
    toast.success(`${product.nameEn} added to cart`);
    setIsCartOpen(true);
    onClose();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    // Simulate API call
    const newR = {
      id: Date.now(),
      user: user.email || user.phone || 'Verified User',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newR, ...reviews]);
    setNewReview({ rating: 5, text: '' });
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
  };

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
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl relative z-10 overflow-hidden flex flex-col max-h-full"
        >
          <div className="p-4 border-b flex justify-between items-center bg-surface sticky top-0 z-20">
            <h2 className="text-xl font-heading font-bold text-primary">{product.nameHi}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto">
            <div className="flex flex-col md:flex-row p-6 gap-8 border-b">
              <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={`/images/${product.image}.jpg`} 
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-3xl font-heading font-bold text-primary mb-1">{product.nameHi}</h3>
                <p className="text-gray-500 mb-4">{product.nameEn}</p>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">5.0</span>
                  <span className="text-gray-400">({reviews.length} reviews)</span>
                </div>

                {hasPricing && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Select Weight:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.pricing.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedWeightIdx(idx)}
                          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                            selectedWeightIdx === idx
                              ? 'bg-primary text-white border-primary'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                          }`}
                        >
                          {p.weight}
                        </button>
                      ))}
                    </div>
                    <div className="text-3xl font-bold text-[#D4A017]">
                      ₹{currentPricing.price}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-gray-100">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" /> Customer Reviews
                </h3>
                {user && (
                  <button 
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-primary font-medium hover:underline text-sm"
                  >
                    Write a Review
                  </button>
                )}
              </div>

              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className={`p-1 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea 
                      required
                      rows={3}
                      value={newReview.text}
                      onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                      className="w-full border border-gray-300 rounded-md p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="Tell us what you think..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-800">{review.user}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
