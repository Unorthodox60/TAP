import React from 'react';
import { motion, useScroll, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Process from './components/Process';
import Story from './components/Story';
import TrustBadges from './components/TrustBadges';
import PreorderForm from './components/PreorderForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col font-body bg-surface text-on-surface">
        {/* Sticky scroll-progress accent line */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-highlight origin-left z-[100]"
          style={{ scaleX: scrollYProgress }}
        />
        
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <ProductGrid />
          
          {/* Heritage & Trust Group */}
          <div className="relative">
            <Process />
            <Story />
            <TrustBadges />
          </div>
          
          <PreorderForm />
          <FAQ />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
