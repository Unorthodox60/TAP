import React from 'react';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Story = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary to-[#0f2b19] text-surface py-24 md:py-32">
      {/* Rhythm band - subtle repeating diamond pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0Z' fill='%23FDF6E9' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="space-y-10"
        >
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-highlight mb-4"
          >
            संगम की शुद्धता, घर का स्वाद
          </motion.h2>
          
          <div className="space-y-8 text-xl md:text-2xl text-surface/90 font-body leading-relaxed max-w-3xl mx-auto font-light">
            <motion.p variants={textVariants}>
              At Triveni Achar, every jar is a tribute to the rich heritage of Prayagraj. Just like the confluence of the sacred rivers at Sangam, our pickles are a perfect harmony of hand-picked ingredients, sun-dried spices, and pure cold-pressed mustard oil.
            </motion.p>
            
            <motion.p variants={textVariants}>
              We don't use factories or machines. Our pickles are crafted by experienced hands in small batches, exactly the way our grandmothers made them. No artificial colors, no synthetic preservatives—just the honest, tangy goodness of a true homemade recipe.
            </motion.p>
            
            <motion.p 
              variants={textVariants}
              className="font-semibold text-highlight pt-6 text-2xl md:text-3xl"
            >
              From our family's kitchen to your dining table, taste the tradition you'll crave again.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Story;
