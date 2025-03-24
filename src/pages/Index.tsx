import { useNavigate } from "react-router-dom";
import { Book, CreditCard, CalendarCheck, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarWithoutRouter } from "@/components/NavbarWithoutRouter";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/FeatureCard";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithoutRouter />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 xl:py-36 px-4 relative overflow-hidden">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4 md:space-y-6 lg:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter hero-gradient animate-fade-in">
            Welcome to EduPulse Library
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mx-auto animate-fade-in">
            A modern digital library platform that helps students access resources and librarians manage collections effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 animate-fade-in">
            <Button
              size="lg"
              className="gradient-button"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/books")}
            >
              Browse Books
            </Button>
          </div>
        </div>
        
        {/* Background gradient effects */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-edupulse-blue/10 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-edupulse-orange/10 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 relative" id="features">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl hero-gradient">
              Library Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Streamlined library operations for both students and librarians
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Book}
              title="Book Management"
              description="Librarians can efficiently catalog, issue, and track the entire book collection."
              className="md:transform md:hover:-translate-y-1 transition-transform"
            />
            <FeatureCard
              icon={CreditCard}
              title="Online Payments"
              description="Students can pay overdue fines and return books online via UPI payment system."
              className="md:transform md:hover:-translate-y-1 transition-transform"
            />
            <FeatureCard
              icon={CalendarCheck}
              title="Seat Reservation"
              description="Reserve library seats in advance with just a 5 rupees payment to secure your spot."
              className="md:transform md:hover:-translate-y-1 transition-transform"
            />
            <FeatureCard
              icon={User}
              title="Librarian Dashboard"
              description="Centralized system for librarians to manage all aspects of the library efficiently."
              className="md:transform md:hover:-translate-y-1 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container px-4 md:px-6">
          <div className="glass-card p-8 md:p-12 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-edupulse opacity-10"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight hero-gradient">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground mb-8">
                Join EduPulse library system today and revolutionize your library experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="gradient-button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground text-center">
              © 2025 EduPulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
