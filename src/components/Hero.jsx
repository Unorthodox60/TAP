import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const containerRef = useRef(null);
  
  // Track scroll position relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax the background image (moves down slightly as you scroll down)
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Scale the jar image slightly as you scroll down
  const scaleJar = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const yJar = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="home" ref={containerRef} className="relative pt-12 pb-16 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 md:order-1 flex flex-col space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out
              className="drop-shadow-sm"
            >
              <span className="text-gradient-mango">त्रिवेणी</span> अचार <br/>
              <span className="text-3xl md:text-4xl text-on-surface/90 block mt-3 font-medium tracking-normal">घर जैसा स्वाद, हर भोजन के साथ</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-on-surface/80 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Handcrafted in the sacred city of Prayagraj. Experience the purity of Sangam in every bite of our traditional, homemade pickles.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton 
                href="https://wa.me/919696771100?text=Hello%20Triveni%20Achar,%20I%20would%20like%20to%20order" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp Order
              </MagneticButton>
              <MagneticButton 
                href="#preorder" 
                className="btn-secondary"
              >
                Preorder Now
              </MagneticButton>
            </motion.div>
          </div>
          
          <div className="order-1 md:order-2 relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-glow-primary border-4 border-white/50 transform-gpu">
            <motion.div 
              className="w-full h-full will-change-transform"
              style={{ y: yParallax, scale: scaleJar }}
            >
              <picture>
                <source srcSet="/images/hero_image.webp" type="image/webp" />
                <img 
                  src="/images/hero_image.jpg" 
                  alt="Triveni Achar jar near the Sangam ghats of Prayagraj at sunset" 
                  className="w-full h-full object-cover scale-[1.15]" 
                  loading="eager"
                />
              </picture>
            </motion.div>
          </div>
          
        </div>
      </div>
      
      {/* Smooth Organic Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 transform-gpu translate-y-px pointer-events-none text-primary/5">
        <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,160 Q360,260 720,160 T1440,160 L1440,320 L0,320 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
