
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use try-catch to handle the case when the component is not within Router context
  let locationPathname = '/';
  let navigate = (path: string) => {
    window.location.href = path;
  };
  
  try {
    // This will throw an error if not in Router context
    const location = useLocation();
    locationPathname = location.pathname;
    
    const routerNavigate = useNavigate();
    navigate = routerNavigate;
  } catch (error) {
    console.warn('Navbar used outside Router context, fallback to regular links');
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

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
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                locationPathname === link.path
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-edupulse"
                  : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-button">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-1 md:hidden bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 py-2 text-base font-medium border-b",
                    locationPathname === link.path
                      ? "text-foreground border-primary"
                      : "text-muted-foreground border-transparent"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full gradient-button">
                    Sign up
                  </Button>
                </Link>
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
