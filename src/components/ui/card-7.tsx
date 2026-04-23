import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  price: string;
}

export function InteractiveProductCard({
  className,
  imageUrl,
  title,
  description,
  price,
  ...props
}: InteractiveProductCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col w-full max-w-[340px] rounded-2xl overflow-hidden",
        "bg-[#FAF8F4] border border-[#D4C4AD]/60",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(44,31,20,0.12)]",
        className
      )}
      {...props}
    >
      {/* Product image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#F0EAE0]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Title + price */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg font-black uppercase leading-tight text-[#2C1F14] tracking-tight"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {title}
          </h3>
          <span className="shrink-0 text-base font-bold text-[#043cd5] mt-0.5">
            {price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#2C1F14]/55 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-[#D4C4AD]/50" />

        {/* CTA */}
        <button className="w-full rounded-xl bg-[#043cd5] py-3 text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:bg-[#0334b5] active:scale-[0.98]">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
