
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import NotFound from "./pages/NotFound";
import SeatReservation from "./pages/SeatReservation";
import PaymentPage from "./pages/PaymentPage";
import UserManagement from "./pages/UserManagement";
import BookListingPage from "./pages/BookListingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReservationShowcase from "./pages/ReservationShowcase";
import LibrarianBookManagement from "./pages/LibrarianBookManagement";
import StudentBookManagement from "./pages/StudentBookManagement";
import LibrarianReservations from "./pages/LibrarianReservations";
import LibrarianPayments from "./pages/LibrarianPayments";
import LibrarianSettings from "./pages/LibrarianSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/books" element={<BookListingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/reservations" element={<ReservationShowcase />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-dashboard/reservations" element={<SeatReservation />} />
            <Route path="/student-dashboard/payments" element={<PaymentPage />} />
            <Route path="/student-dashboard/books" element={<StudentBookManagement />} />
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            
            {/* Librarian Dashboard Routes */}
            <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
            <Route path="/librarian-dashboard/students" element={<UserManagement />} />
            <Route path="/librarian-dashboard/books" element={<LibrarianBookManagement />} />
            <Route path="/librarian-dashboard/reservations" element={<LibrarianReservations />} />
            <Route path="/librarian-dashboard/payments" element={<LibrarianPayments />} />
            <Route path="/librarian-dashboard/settings" element={<LibrarianSettings />} />
            <Route path="/librarian-dashboard/*" element={<LibrarianDashboard />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
