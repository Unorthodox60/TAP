import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion';

const steps = [
  {
    id: 1,
    titleHi: "चुनाव",
    titleEn: "Selection",
    desc: "Hand-picking raw mangoes at peak ripeness",
    image: "process_1"
  },
  {
    id: 2,
    titleHi: "धुलाई और सुखाई",
    titleEn: "Wash & Sun-dry",
    desc: "Cleaning, then sun-drying on cloth",
    image: "process_2"
  },
  {
    id: 3,
    titleHi: "कटाई",
    titleEn: "Cutting",
    desc: "Hand-cutting into traditional pieces",
    image: "process_3"
  },
  {
    id: 4,
    titleHi: "मसाला मिश्रण",
    titleEn: "Spice Blending",
    desc: "Mixing spices & mustard oil by hand",
    image: "process_4"
  },
  {
    id: 5,
    titleHi: "भराई",
    titleEn: "Jar-filling",
    desc: "Packing tightly into sterilized jars",
    image: "process_5"
  },
  {
    id: 6,
    titleHi: "पकना",
    titleEn: "Maturing",
    desc: "Resting in sunlight over days to mature",
    image: "process_6"
  }
];

const Marker = ({ inView, num }) => (
  <motion.div
    className={`w-full h-full rounded-full border-[2px] flex items-center justify-center font-bold text-lg transition-colors duration-300 z-20 relative ${
      inView ? 'border-highlight bg-highlight text-surface' : 'border-highlight bg-surface text-highlight'
    }`}
    animate={{ scale: inView ? [1, 1.15, 1] : 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {num}
  </motion.div>
);

const Photo = ({ step, photoY }) => (
  <motion.div 
    style={{ y: photoY }}
    className="w-full lg:w-[320px] aspect-[4/3] lg:aspect-square lg:rounded-full rounded-2xl overflow-hidden shadow-soft border-4 border-white z-10 shrink-0 bg-surface"
  >
    <picture>
      <source srcSet={`/images/${step.image}.webp`} type="image/webp" />
      <img 
        src={`/images/${step.image}.jpg`} 
        alt={step.titleEn}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </picture>
  </motion.div>
);

const Text = ({ step, align = "left" }) => (
  <div className={`relative z-10 flex flex-col justify-center w-full lg:max-w-md ${align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
    {/* Decorative Number */}
    <div 
      className={`absolute top-1/2 -translate-y-1/2 text-[160px] font-heading font-extrabold text-transparent pointer-events-none z-0
        ${align === 'right' ? 'lg:right-0 lg:-mr-12' : 'lg:left-0 lg:-ml-12'} left-0 -ml-4
      `} 
      style={{ WebkitTextStroke: '2px rgba(27, 77, 46, 0.06)' }}
    >
      0{step.id}
    </div>
    
    <div className="relative z-10">
      <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{step.titleHi}</h3>
      <h4 className="text-sm font-semibold text-highlight-dark tracking-widest uppercase mb-4">{step.titleEn}</h4>
      <p className="text-on-surface/80 text-lg leading-relaxed">{step.desc}</p>
    </div>
  </div>
);

const Step = ({ step, index, shouldReduceMotion }) => {
  const isRightSidePhoto = index % 2 === 1; // 0-indexed: 0 is left photo, 1 is right photo
  const markerRef = useRef(null);
  
  // Triggers when top of marker enters top 60% of screen. 
  // 1000px top margin keeps it in-view even if you scroll past it.
  const inView = useInView(markerRef, { margin: "1000px 0px -40% 0px" });
  
  // Very subtle parallax
  const { scrollYProgress } = useScroll({
    target: markerRef,
    offset: ["start end", "end start"]
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  const isFirst = index === 0;
  
  // Animation Definitions
  const photoInitial = shouldReduceMotion || isFirst ? { opacity: 1, x: 0 } : { opacity: 0, x: isRightSidePhoto ? 40 : -40 };
  const photoAnimate = { opacity: 1, x: 0 };
  
  const textInitial = shouldReduceMotion || isFirst ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const textAnimate = { opacity: 1, y: 0 };

  return (
    <div className="relative w-full flex flex-col lg:grid lg:grid-cols-[1fr_44px_1fr] lg:gap-12 items-start lg:items-center group">
      
      {/* Unified Marker for both Mobile and Desktop */}
      <div 
        ref={markerRef}
        className="absolute left-[24px] lg:left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-[44px] h-[44px] z-20 flex items-center justify-center"
      >
         <Marker inView={inView} num={step.id} />
      </div>

      {/* Mobile Layout (flex-col, visible below lg) */}
      <div className="lg:hidden pl-[56px] w-full flex flex-col gap-6">
        <motion.div 
          initial={photoInitial}
          whileInView={photoAnimate}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Photo step={step} photoY={shouldReduceMotion ? 0 : photoY} />
        </motion.div>
        
        <motion.div
          initial={textInitial}
          whileInView={textAnimate}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: shouldReduceMotion || isFirst ? 0 : 0.08 }}
        >
          <Text step={step} />
        </motion.div>
      </div>

      {/* Desktop Layout (grid, visible lg and up) */}
      <div className="hidden lg:contents">
        {!isRightSidePhoto ? (
          <>
            {/* Photo Left */}
            <motion.div 
              className="flex justify-end w-full"
              initial={photoInitial}
              whileInView={photoAnimate}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Photo step={step} photoY={shouldReduceMotion ? 0 : photoY} />
            </motion.div>
            
            <div /> {/* Space for center marker */}
            
            {/* Text Right */}
            <motion.div 
              className="flex justify-start w-full relative"
              initial={textInitial}
              whileInView={textAnimate}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: shouldReduceMotion || isFirst ? 0 : 0.08 }}
            >
              <Text step={step} align="left" />
            </motion.div>
          </>
        ) : (
          <>
            {/* Text Left */}
            <motion.div 
              className="flex justify-end w-full relative"
              initial={textInitial}
              whileInView={textAnimate}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: shouldReduceMotion || isFirst ? 0 : 0.08 }}
            >
              <Text step={step} align="right" />
            </motion.div>
            
            <div /> {/* Space for center marker */}
            
            {/* Photo Right */}
            <motion.div 
              className="flex justify-start w-full"
              initial={photoInitial}
              whileInView={photoAnimate}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Photo step={step} photoY={shouldReduceMotion ? 0 : photoY} />
            </motion.div>
          </>
        )}
      </div>

    </div>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"]
  });

  return (
    <section 
      id="process"
      ref={sectionRef} 
      className="relative bg-surface text-on-surface py-16 md:py-24 overflow-hidden"
    >
      {/* Background Watermark (Top Right) */}
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none z-0 w-[40%] max-w-[400px]">
        <svg viewBox="0 0 40 40" className="w-full h-auto text-primary" fill="currentColor">
          <path d="M20 32 V12 M12 18 C12 24 14 26 20 26 C26 26 28 24 28 18 M16 16 L20 10 L24 16" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 lg:mb-24 text-left lg:text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">How It's Made</h2>
        <p className="text-xl text-on-surface/70">No shortcuts. Just tradition.</p>
      </div>

      <div className="relative max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Continuous Timeline Line */}
        <div 
          ref={timelineRef}
          className="absolute top-0 bottom-0 left-[24px] lg:left-1/2 w-[2px] bg-primary/10 -translate-x-1/2 z-0"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-highlight origin-top"
            style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress }}
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-16 lg:gap-24 relative z-10 w-full">
          {steps.map((step, index) => (
            <Step 
              key={step.id} 
              step={step} 
              index={index} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="mt-24 lg:mt-32 text-center relative z-10">
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8">Taste the tradition</h3>
        <a 
          href="#preorder" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-highlight text-surface hover:bg-highlight-dark transition-colors shadow-soft"
        >
          Preorder Now
        </a>
      </div>
    </section>
  );
};

export default Process;
