import React from 'react';
import { Leaf, Ban, Utensils, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: <Leaf className="h-9 w-9 text-[#2E7D32]" />,
      title: '100% Pure & Natural',
    },
    {
      icon: <Ban className="h-9 w-9 text-accent" />,
      title: 'No Artificial Color/Preservative',
    },
    {
      icon: <Utensils className="h-9 w-9 text-highlight-dark" />,
      title: 'Traditional Recipe',
    },
    {
      icon: <Heart className="h-9 w-9 text-accent" />,
      title: "Taste You'll Crave Again",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#0f2b19] to-surface py-12 md:py-24 relative z-20 overflow-hidden">

      {/* Rhythm band - subtle repeating diamond pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0Z' fill='%231B4D2E' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx} 
              className="flex flex-col items-center text-center space-y-5"
              variants={itemVariants}
            >
              <div className="bg-white p-5 md:p-6 rounded-full shadow-glow-gold border border-highlight/20 relative group">
                <div className="absolute inset-0 bg-highlight/5 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100"></div>
                <div className="relative z-10">{badge.icon}</div>
              </div>
              <h3 className="font-heading font-bold text-on-surface text-base md:text-lg max-w-xs">
                {badge.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
