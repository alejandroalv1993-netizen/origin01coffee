import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'primary' | 'outline';
}

export function FlowButton({ 
  text = "Modern Button", 
  className, 
  variant = 'primary',
  ...props 
}: FlowButtonProps) {
  // Use brand blue if primary, dark if outline (matching user's request)
  const mainColor = variant === 'primary' ? '#043cd5' : '#111111';
  const borderColor = variant === 'primary' ? 'rgba(4, 60, 213, 0.4)' : '#333333/40';

  return (
    <button 
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] bg-transparent px-6 py-2 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]",
        variant === 'primary' ? "border-[#043cd5]/40 text-[#043cd5]" : "border-[#333333]/40 text-[#111111]",
        className
      )}
      {...props}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-3 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          variant === 'primary' ? "stroke-[#043cd5]" : "stroke-[#111111]"
        )}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-2 group-hover:translate-x-2 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle bg expansion */}
      <span 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
          variant === 'primary' ? "bg-[#043cd5]" : "bg-[#111111]"
        )}
      ></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 right-3 fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          variant === 'primary' ? "stroke-[#043cd5]" : "stroke-[#111111]"
        )}
      />
    </button>
  );
}
