import React, { useState } from 'react';
import { Loader2, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData, dryFruitsData } from './ProductGrid';

const allProducts = [...productsData, ...dryFruitsData];

const PreorderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickle: 'Mango Pickle',
    weight: '',
    quantity: '1',
    delivery: 'Next Week',
    notes: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Simulate API delay for UX
    setTimeout(() => {
      setStatus('success');
      
      let pickleDetails = formData.pickle;
      const product = allProducts.find(p => p.nameEn === formData.pickle);
      if (product && product.pricing && product.pricing.length > 0) {
        const pricing = product.pricing.find(p => p.weight === formData.weight) || product.pricing[0];
        pickleDetails = `${product.nameHi} (${pricing.weight} - ₹${pricing.price})`;
      }
      
      const message = `*New Preorder*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Pickle:* ${pickleDetails} (${formData.quantity} jar)\n*Delivery:* ${formData.delivery}\n*Notes:* ${formData.notes || 'None'}`;
      
      const encodedMessage = encodeURIComponent(message);
      
      // Open whatsapp after a tiny delay so the success state is visible
      setTimeout(() => {
        window.open(`https://wa.me/919696771100?text=${encodedMessage}`, '_blank');
      }, 800);
      
      // Reset form after a few seconds
      setTimeout(() => {
        setStatus('idle');
        setFormData({ ...formData, notes: '' }); // keep some details, clear notes
      }, 5000);
      
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'pickle') {
      const product = allProducts.find(p => p.nameEn === value);
      let defaultWeight = '';
      if (product && product.pricing && product.pricing.length > 0) {
        defaultWeight = product.pricing[0].weight;
      }
      setFormData(prev => ({ ...prev, [name]: value, weight: defaultWeight }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = (error) => 
    `w-full px-4 py-3 rounded-button border border-gray-300 bg-white min-h-[44px] transition-all duration-300 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${error ? 'border-accent focus:border-accent focus:ring-accent/20' : ''}`;

  return (
    <section id="preorder" className="py-24 bg-surface border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Secure Your Fresh Batch</h2>
          <p className="text-on-surface/80 text-lg">
            Our traditional pickles are made in small, artisanal batches to guarantee freshness and authentic taste. 
            Preorder now to reserve jars from our upcoming seasonal batches.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-[32px] shadow-glow-primary p-6 md:p-10 border border-primary/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          
          <div className="bg-gradient-to-r from-highlight/10 to-transparent border-l-4 border-highlight rounded-r-xl p-5 mb-8 flex items-start">
            <Info className="w-6 h-6 text-highlight-dark mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-on-surface/80 leading-relaxed">
              <strong className="text-on-surface font-bold block mb-1">Why Preorder?</strong>
              Mango and festive dry-fruit pickles sell out fast! Preordering secures your stock and ensures you receive the freshest batch as soon as it's cured.
            </p>
          </div>

          <div className="relative min-h-[450px]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-heading font-bold text-primary mb-3">आपका प्रीऑर्डर मिल गया है!</h3>
                  <p className="text-on-surface/80 text-lg max-w-sm mx-auto">
                    We will contact you shortly to confirm your order details. 
                    <br/><br/>You should be redirected to WhatsApp momentarily.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-on-surface mb-2">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses(errors.name)}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="mt-2 text-sm text-accent">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-on-surface mb-2">
                        Phone Number (WhatsApp) <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses(errors.phone)}
                        placeholder="e.g. 9876543210"
                        inputMode="tel"
                      />
                      {errors.phone && <p className="mt-2 text-sm text-accent">{errors.phone}</p>}
                    </div>
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="pickle" className="block text-sm font-semibold text-on-surface mb-2">
                          Select Pickle <span className="text-accent">*</span>
                        </label>
                        <select
                          id="pickle"
                          name="pickle"
                          value={formData.pickle}
                          onChange={handleChange}
                          className={inputClasses(false)}
                        >
                          {allProducts.map(p => (
                            <option key={p.id} value={p.nameEn}>{p.nameHi} ({p.nameEn})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-on-surface mb-2">
                          Quantity <span className="text-accent">*</span>
                        </label>
                        <select
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={inputClasses(false)}
                        >
                          <option value="1">1 Jar</option>
                          <option value="2">2 Jars</option>
                          <option value="3">3 Jars</option>
                          <option value="4+">4+ Jars</option>
                        </select>
                      </div>
                    </div>

                    {(() => {
                      const selectedProduct = allProducts.find(p => p.nameEn === formData.pickle);
                      const hasPricing = selectedProduct && selectedProduct.pricing && selectedProduct.pricing.length > 0;
                      if (!hasPricing) return null;
                      
                      const currentPricing = selectedProduct.pricing.find(p => p.weight === formData.weight) || selectedProduct.pricing[0];

                      return (
                        <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                          <label className="block text-sm font-semibold text-on-surface mb-3">
                            Select Variant <span className="text-accent">*</span>
                          </label>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                            {selectedProduct.pricing.length > 1 ? (
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.pricing.map((p, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, weight: p.weight }))}
                                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                                      formData.weight === p.weight
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-on-surface border-gray-300 hover:border-primary'
                                    }`}
                                  >
                                    {p.weight}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="text-on-surface/80 font-medium">
                                {currentPricing.weight}
                              </div>
                            )}
                            <div className="text-[#D4A017] font-bold text-2xl">
                              ₹{currentPricing.price}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                  <div>
                    <label htmlFor="delivery" className="block text-sm font-semibold text-on-surface mb-2">
                      Preferred Delivery Window
                    </label>
                    <select
                      id="delivery"
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleChange}
                      className={inputClasses(false)}
                    >
                      <option value="As soon as ready">As soon as ready</option>
                      <option value="Next Week">Next Week</option>
                      <option value="End of Month">End of Month</option>
                      <option value="Upcoming Festival">Upcoming Festival</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-on-surface mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className={`${inputClasses(false)} resize-none`}
                      placeholder="Any special requests or gifting instructions?"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary w-full md:w-auto px-10 text-lg flex justify-center items-center gap-2 overflow-hidden relative"
                    >
                      {status === 'submitting' ? (
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Loader2 className="animate-spin w-5 h-5" /> Sending...
                        </motion.div>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Place Preorder via WhatsApp
                        </motion.span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreorderForm;
