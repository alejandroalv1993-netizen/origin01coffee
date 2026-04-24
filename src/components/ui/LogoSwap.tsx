import { cn } from "@/lib/utils";

interface LogoSwapProps {
  className?: string;
  alt?: string;
}

export function LogoSwap({ className, alt = "Origin 01 mascot" }: LogoSwapProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Default logo */}
      <img
        src="/assets/definitivelogo.png"
        alt={alt}
        className="w-full h-full object-contain transition-opacity duration-200 group-hover:opacity-0"
        draggable={false}
      />
      {/* Surprised logo — fades in on hover */}
      <img
        src="/assets/logosurprised.png"
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        draggable={false}
      />
    </div>
  );
}
