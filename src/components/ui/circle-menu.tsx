'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
  itemSize: 64,
  containerSize: 64, // Reduced from 320 to match trigger size
  openStagger: 0.02,
  closeStagger: 0.07,
  dropdownRadius: 180,
  dropdownArcRange: [Math.PI * 0.15, Math.PI * 0.85] // From bottom-leftish to bottom-rightish
};

const STYLES: Record<string, Record<string, string>> = {
  trigger: {
    container:
      'rounded-full flex items-center justify-center cursor-pointer outline-none ring-0 hover:scale-110 transition-all duration-200 z-50',
    active: 'bg-[#043cd5] shadow-xl'
  },
  item: {
    container:
      'rounded-full flex items-center justify-center absolute bg-[#043cd5] hover:bg-[#0334b5] cursor-pointer shadow-lg group pointer-events-auto z-10',
    label: 'whitespace-nowrap rounded-md bg-[#2C1F14] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-2xl relative'
  }
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
  const theta = (2 * Math.PI * i) / n - Math.PI / 2;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

const pointOnArc = (i: number, n: number, r: number, start: number, end: number) => {
  const theta = n > 1 ? start + (i / (n - 1)) * (end - start) : (start + end) / 2;
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return { x, y };
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  totalItems: number;
  isOpen: boolean;
  mode?: 'circle' | 'dropdown';
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, mode = 'circle' }: MenuItemProps) => {
  const { x, y } = mode === 'dropdown' 
    ? pointOnArc(index, totalItems, CONSTANTS.dropdownRadius, CONSTANTS.dropdownArcRange[0], CONSTANTS.dropdownArcRange[1])
    : pointOnCircle(index, totalItems, CONSTANTS.containerSize / 2);
  const [hovering, setHovering] = useState(false);
  return (
    <motion.a 
      href={href} 
      initial={false}
      animate={{
        x: isOpen ? x : 0,
        y: isOpen ? y : 0,
        opacity: isOpen ? 1 : 0,
        scale: isOpen ? 1 : 0
      }}
      transition={{
        delay: isOpen ? index * CONSTANTS.openStagger : index * CONSTANTS.closeStagger,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      className={cn(STYLES.item.container, !isOpen && "!pointer-events-none")}
      style={{
        height: CONSTANTS.itemSize,
        width: CONSTANTS.itemSize,
        zIndex: hovering ? 100 : 10
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {icon}
      </div>
      
      <AnimatePresence>
        {isOpen && hovering && (
          <div className="absolute inset-x-0 top-full flex justify-center mt-4 pointer-events-none z-[110]">
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.8 }}
              className={STYLES.item.label}
            >
              <span className="relative z-10">{label}</span>
              {/* Small arrow */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#2C1F14]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon
}: MenuTriggerProps) => {
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.15;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop'
      }
    });
    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        width: Math.min(
          CONSTANTS.itemSize * scaleTransition[i],
          CONSTANTS.itemSize + CONSTANTS.itemSize / 2
        ),
        backgroundColor: openIcon 
          ? `color-mix(in srgb, #043cd5 ${Math.max(100 - i * 20, 0)}%, transparent)`
          : `color-mix(in srgb, var(--foreground) ${Math.max(100 - i * 10, 40)}%, var(--background))`,
        transition: {
          duration: CONSTANTS.closeStagger / 2,
          ease: 'linear'
        }
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({
      translateX: 0,
      transition: {
        duration: 0
      }
    });

    animate.start({
      height: CONSTANTS.itemSize,
      width: CONSTANTS.itemSize,
      backgroundColor: openIcon ? 'transparent' : 'var(--foreground)',
      transition: {
        duration: 0.1,
        ease: 'backInOut'
      }
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50">
      <motion.button
        animate={animate}
        style={{
          height: CONSTANTS.itemSize,
          width: CONSTANTS.itemSize
        }}
        className={cn(
          STYLES.trigger.container, 
          isOpen ? STYLES.trigger.active : (!openIcon ? "bg-[#043cd5] shadow-xl" : "bg-transparent")
        )}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{
                opacity: 0,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                filter: 'blur(10px)'
              }}
              transition={{
                duration: 0.2
              }}
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{
                opacity: 0,
                filter: 'blur(10px)'
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)'
              }}
              exit={{
                opacity: 0,
                filter: 'blur(10px)'
              }}
              transition={{
                duration: 0.2
              }}
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const CircleMenu = ({
  items,
  mode = 'circle',
  openIcon,
  closeIcon
}: {
  items: Array<{ label: string; icon: React.ReactNode; href: string }>;
  mode?: 'circle' | 'dropdown';
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animate = useAnimationControls();

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: 'blur(1px)',
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: 'linear'
      }
    });
    await animate.start({
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0
      }
    });
  };

  return (
    <div
      style={{
        width: CONSTANTS.itemSize,
        height: CONSTANTS.itemSize
      }}
      className={cn(
        "relative flex items-center justify-center",
        "place-self-center"
      )}
    >
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon || <Menu size={28} className="text-white" />}
        closeIcon={closeIcon || <X size={28} className="text-white" />}
      />
      <motion.div
        animate={animate}
        className={cn('absolute inset-0 z-0 flex items-center justify-center pointer-events-none')}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              icon={item.icon}
              label={item.label}
              href={item.href}
              index={index}
              totalItems={items.length}
              isOpen={isOpen}
              mode={mode}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export { CircleMenu };
