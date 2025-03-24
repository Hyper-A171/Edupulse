
import { useState } from "react";
import { Menu, X, BookOpen, Users, CalendarCheck, CreditCard, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books", icon: BookOpen },
  { name: "Reservation", path: "/reservations", icon: CalendarCheck },
  { name: "About", path: "/about", icon: Users },
  { name: "Contact", path: "/contact", icon: Layers },
];

export function NavbarWithoutRouter() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const currentPath = window.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" onClick={toggleMenu} size="icon">
            {isOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                currentPath === link.path
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-edupulse"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </a>
          <a href="/signup">
            <Button size="sm" className="gradient-button">
              Sign up
            </Button>
          </a>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-1 md:hidden bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "flex items-center gap-2 py-2 text-base font-medium border-b",
                    currentPath === link.path
                      ? "text-foreground border-primary"
                      : "text-muted-foreground border-transparent"
                  )}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <a 
                  href="/login" 
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </a>
                <a 
                  href="/signup" 
                  className="w-full"
                >
                  <Button className="w-full gradient-button">
                    Sign up
                  </Button>
                </a>
                <div className="flex justify-end mt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
