"use client"; // Required for state and event handlers

import * as React from "react";
import { cn } from "@/lib/utils";

// --- PROPS INTERFACE ---
interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  price: string;
}

// --- COMPONENT DEFINITION ---
export function InteractiveProductCard({
  className,
  imageUrl,
  logoUrl,
  title,
  description,
  price,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  // --- MOUSE MOVE HANDLER ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / (height / 2) * -8; // Max rotation 8deg
    const rotateY = (x - width / 2) / (width / 2) * 8;   // Max rotation 8deg

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    });
  };

  // --- MOUSE LEAVE HANDLER ---
  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        "relative w-full max-w-[340px] aspect-[9/12] rounded-3xl bg-card shadow-lg cursor-pointer overflow-hidden group",
        "transform-style-3d", // Enables 3D transformations for children
        className
      )}
      {...props}
    >
      {/* Background Image - scales slightly to avoid showing edges on tilt */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-300"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl" />

      {/* Main Content with 3D effect */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-end"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Top Branding / Category */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          <div className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
            Specialty Coffee
          </div>
          <img src={logoUrl} alt="Brand Logo" className="h-6 w-auto opacity-80" />
        </div>

        {/* Glassmorphism Content Area */}
        <div className="relative rounded-2xl border border-white/20 bg-black/30 p-5 backdrop-blur-xl transition-all duration-300 group-hover:bg-black/40">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white leading-tight font-heading italic uppercase tracking-tighter">
                {title}
              </h3>
              <span className="text-lg font-bold text-[#043cd5] drop-shadow-[0_0_8px_rgba(4,60,213,0.5)]">
                {price}
              </span>
            </div>
            <p className="text-sm text-white/70 line-clamp-2 font-body leading-relaxed mb-4">
              {description}
            </p>
            
            <button className="w-full rounded-xl bg-[#043cd5] py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0334b5] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(4,60,213,0.3)]">
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Interactive Dots */}
        <div className="mt-4 flex w-full justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 w-4 rounded-full transition-all duration-300",
                index === 0 ? "bg-[#043cd5] w-8" : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
