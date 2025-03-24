
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const [userType, setUserType] = useState<"student" | "librarian">("student");

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
          <div className="mb-6 flex justify-center space-x-2">
            <Button
              variant={userType === "student" ? "default" : "outline"}
              onClick={() => setUserType("student")}
              className={userType === "student" ? "gradient-button" : ""}
            >
              Student Login
            </Button>
            <Button
              variant={userType === "librarian" ? "default" : "outline"}
              onClick={() => setUserType("librarian")}
              className={userType === "librarian" ? "gradient-button" : ""}
            >
              Librarian Login
            </Button>
          </div>
          <AuthForm type="login" userType={userType} />
        </div>
        
        {/* Background gradient effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-edupulse-blue/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-edupulse-orange/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
      </main>
    </div>
  );
}
