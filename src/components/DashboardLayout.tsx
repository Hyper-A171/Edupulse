import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarTrigger, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter 
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "librarian";
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const studentLinks = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/student-dashboard" },
    { icon: BookOpen, name: "Books", path: "/student-dashboard/books" },
    { icon: Calendar, name: "Seat Reservation", path: "/student-dashboard/reservations" },
    { icon: CreditCard, name: "Payments", path: "/student-dashboard/payments" },
    { icon: Settings, name: "Settings", path: "/student-dashboard/settings" },
  ];

  const librarianLinks = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/librarian-dashboard" },
    { icon: BookOpen, name: "Books Management", path: "/librarian-dashboard/books" },
    { icon: Users, name: "Students", path: "/librarian-dashboard/students" },
    { icon: Calendar, name: "Reservations", path: "/librarian-dashboard/reservations" },
    { icon: CreditCard, name: "Payments", path: "/librarian-dashboard/payments" },
    { icon: Settings, name: "Settings", path: "/librarian-dashboard/settings" },
  ];

  const notifications = [
    { id: 1, title: "New Book Request", description: "Priya Sharma requested 'Advanced Algorithms'", time: "10 minutes ago" },
    { id: 2, title: "Seat Reservation", description: "Raj Patel reserved seat A15", time: "30 minutes ago" },
    { id: 3, title: "Payment Received", description: "Ankit Kumar paid ₹150 for late fees", time: "1 hour ago" },
    { id: 4, title: "Book Return", description: "Meera Singh returned 'Data Structures'", time: "2 hours ago" },
  ];

  const links = userType === "student" ? studentLinks : librarianLinks;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-6 py-3">
            <Logo className="py-2" />
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === link.path}>
                    <Link to={link.path} className="flex items-center gap-3 px-3 py-2">
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            <div className="flex flex-col gap-2">
              <ThemeToggle />
              <Button 
                variant="destructive"
                onClick={handleLogout}
                className="w-full mt-2 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 border-b flex items-center px-6 gap-4">
            <SidebarTrigger />
            <h1 className="font-semibold flex-1">
              {links.find(link => location.pathname === link.path)?.name || "Dashboard"}
            </h1>
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {notifications.length}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 max-h-[60vh] overflow-auto" align="end">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-muted transition-colors cursor-pointer">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">{notification.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              {!isMobile && <ThemeToggle />}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
