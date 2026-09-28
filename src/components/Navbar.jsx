import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          
          <div className="hidden md:flex items-center">
            <a 
              href="tel:+919696771100" 
              className="text-primary hover:text-highlight transition-colors p-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label="Call Us"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <a 
              href="tel:+919696771100" 
              className="text-primary hover:text-highlight transition-colors p-2 mr-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label="Call Us"
            >
              <Phone className="h-6 w-6" />
            </a>
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
