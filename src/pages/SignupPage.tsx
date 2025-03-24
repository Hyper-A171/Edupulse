
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 relative">
        <div className="w-full max-w-md mx-auto">
          <AuthForm type="signup" />
        </div>
        
        {/* Background gradient effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-edupulse-blue/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-edupulse-orange/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
      </main>
    </div>
  );
}
