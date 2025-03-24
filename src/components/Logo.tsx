
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export function Logo({ className, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/9623b034-641f-46d0-8a04-2656bcbc32c1.png" 
        alt="EduPulse Logo" 
        className="w-10 h-10 md:w-12 md:h-12" 
      />
      <span className={cn("font-bold text-xl md:text-2xl hero-gradient", textClassName)}>
        EduPulse
      </span>
    </div>
  );
}
