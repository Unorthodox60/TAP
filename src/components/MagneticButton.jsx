import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MagneticButton = ({ children, className, href, target, rel, as = "a", onClick }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create motion values for x and y
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to the motion values (Emil Kowalski recommended spring settings)
  const springConfig = { stiffness: 300, damping: 30, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Rotate slightly based on x movement
  const rotate = useTransform(springX, [-50, 50], [-2, 2]);

  const handleMouseMove = (e) => {
    // Disable effect on touch devices (often indicated by fine pointer support)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (dampen the movement)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] || motion.a;

  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        rotate: isHovered ? rotate : 0,
        zIndex: isHovered ? 10 : 1,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
