import React, { useState } from 'react';
import { X, Smartphone, Mail } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = () => {
  const isAuthOpen = useStore(state => state.isAuthOpen);
  const setIsAuthOpen = useStore(state => state.setIsAuthOpen);
  const setUser = useStore(state => state.setUser);

  const [authMethod, setAuthMethod] = useState('phone'); // phone or email
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: input, 2: verify
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      });
      if (error) throw error;
      setStep(2);
      toast.success('OTP sent to your phone');
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      setUser(data.user);
      setIsAuthOpen(false);
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result;
      if (type === 'login') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      if (result.error) throw result.error;
      setUser(result.data.user);
      setIsAuthOpen(false);
      toast.success(`Successfully ${type === 'login' ? 'logged in' : 'signed up'}`);
    } catch (error) {
      toast.error(error.message || `Failed to ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsAuthOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
          >
            <div className="p-6">
              <button 
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                {step === 1 ? 'Login or Sign up' : 'Verify OTP'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {step === 1 
                  ? 'Access your orders and saved addresses.' 
                  : `Enter the OTP sent to +91 ${phone}`
                }
              </p>

              {step === 1 && (
                <>
                  <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                    <button
                      onClick={() => setAuthMethod('phone')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${authMethod === 'phone' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Smartphone className="w-4 h-4" /> Phone
                    </button>
                    <button
                      onClick={() => setAuthMethod('email')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${authMethod === 'email' ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                  </div>

                  {authMethod === 'phone' ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                            placeholder="Enter 10 digit number"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading || phone.length !== 10}
                        className="w-full btn-primary text-sm py-3 disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Get OTP'}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm p-2.5 border"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleEmailAuth(e, 'login')}
                          disabled={loading || !email || !password}
                          className="flex-1 btn-primary text-sm py-3 disabled:opacity-50"
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleEmailAuth(e, 'signup')}
                          disabled={loading || !email || !password}
                          className="flex-1 btn-secondary text-sm py-3 disabled:opacity-50"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter 6-digit OTP</label>
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm p-2.5 border text-center text-xl tracking-[0.5em] font-medium"
                      placeholder="------"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full btn-primary text-sm py-3 disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-sm text-primary font-medium mt-2 hover:underline"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
