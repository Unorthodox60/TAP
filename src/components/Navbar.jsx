import React, { useState, useRef, useEffect } from 'react';
import { Phone, Menu, X, ShoppingCart, User, LogOut, Package, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '../store/useStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const user = useStore(state => state.user);
  const cart = useStore(state => state.cart);
  const setIsCartOpen = useStore(state => state.setIsCartOpen);
  const setIsAuthOpen = useStore(state => state.setIsAuthOpen);
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Pickles', href: '#pickles' },
    { name: 'Dry Fruit Pickles', href: '#dry-fruit' },
    { name: 'Preorder', href: '#preorder' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
              <Logo />
            </a>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-on-surface hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-2 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
                >
                  <User className="h-6 w-6" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl py-2 z-50">
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Package className="mr-2 h-4 w-4" /> My Orders
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <MapPin className="mr-2 h-4 w-4" /> My Addresses
                    </button>
                    <div className="border-t my-1"></div>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="Login"
              >
                <User className="h-6 w-6" />
              </button>
            )}
            
            <a 
              href="tel:+917905045552" 
              className={`text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] ${user ? 'hidden' : ''}`}
              aria-label="Call Us"
            >
              <Phone className="h-6 w-6" />
            </a>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-highlight text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-1">
            {user ? (
              <button
                className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              >
                <User className="h-5 w-5" />
              </button>
            ) : (
              <a 
                href="tel:+917905045552" 
                className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
                aria-label="Call Us"
              >
                <Phone className="h-5 w-5" />
              </a>
            )}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-highlight text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-on-surface hover:text-primary p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] focus-visible"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-on-surface hover:text-primary hover:bg-primary/5 min-h-[44px]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
