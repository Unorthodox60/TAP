import React from 'react';

const Logo = ({ dark = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        {/* Emblem Badge */}
        <circle cx="25" cy="22" r="20" fill={dark ? 'rgba(255,255,255,0.1)' : 'rgba(27,77,46,0.05)'} stroke="#FFB300" strokeWidth="1.5" />
        
        {/* Stylized Minimal Trishul (Trident) */}
        <path 
          d="M25 34 V12 M15 20 C15 27 18 29 25 29 C32 29 35 27 35 20 M20 18 L25 11 L30 18" 
          stroke="#FFB300" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Tricolor Ribbon Underline */}
        <path d="M15 46 H21" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round" /> {/* Saffron */}
        <path d="M22 46 H28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" /> {/* White */}
        <path d="M29 46 H35" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" /> {/* Green */}
      </svg>

      {/* Wordmark */}
      <div className={`font-heading font-bold text-3xl tracking-tight leading-none pt-1 ${dark ? 'text-surface' : 'text-primary'}`}>
        त्रिवेणी <span className="text-highlight">अचार</span>
      </div>
    </div>
  );
};

export default Logo;
