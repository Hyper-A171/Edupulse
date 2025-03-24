
import { useState } from "react";
import { BookOpen, BookOpenCheck, Clock, MoreHorizontal } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [borrowedBooks, setBorrowedBooks] = useState([
    { 
      id: 1, 
      title: "Data Structures and Algorithms", 
      author: "Thomas H. Cormen", 
      dueDate: "2025-04-15", 
      imgUrl: "https://picsum.photos/seed/book1/300/400" 
    },
    { 
      id: 2, 
      title: "Machine Learning Fundamentals", 
      author: "Andrew Ng", 
      dueDate: "2025-04-20", 
      imgUrl: "https://picsum.photos/seed/book2/300/400" 
    },
  ]);

  const [upcomingReservations, setUpcomingReservations] = useState([
    { id: 1, date: "2025-03-20", seatNumber: "A12", time: "10:00 AM - 12:00 PM", status: "Confirmed" },
    { id: 2, date: "2025-03-22", seatNumber: "B08", time: "2:00 PM - 4:00 PM", status: "Pending" },
  ]);

  const renewBook = (bookId: number) => {
    // In a real app, this would call an API
    setBorrowedBooks(books => books.map(book => 
      book.id === bookId 
        ? { ...book, dueDate: new Date(new Date(book.dueDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] } 
        : book
    ));
    
    toast({
      title: "Book Renewed",
      description: "Your book has been renewed for 7 more days.",
    });
  };

  const returnBook = (bookId: number) => {
    // In a real app, this would call an API
    setBorrowedBooks(books => books.filter(book => book.id !== bookId));
    
    toast({
      title: "Book Returned",
      description: "Your book has been marked for return. Please drop it at the library.",
    });
  };

  const cancelReservation = (reservationId: number) => {
    // In a real app, this would call an API
    setUpcomingReservations(reservations => reservations.filter(res => res.id !== reservationId));
    
    toast({
      title: "Reservation Cancelled",
      description: "Your seat reservation has been cancelled.",
    });
  };
  
  const browseBooks = () => {
    navigate("/student-dashboard/books");
  };
  
  const makeReservation = () => {
    navigate("/student-dashboard/reservations");
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Student Dashboard
          </h2>
          <p className="text-muted-foreground">
            View your borrowed books, upcoming reservations, and make payments.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-edupulse flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Borrowed Books</p>
                    <p className="text-xl font-bold">{borrowedBooks.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-edupulse flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Reservations</p>
                    <p className="text-xl font-bold">{upcomingReservations.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-edupulse flex items-center justify-center">
                    <BookOpenCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Books</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Borrowed Books</CardTitle>
              <CardDescription>Books you currently have checked out from the library</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => (
                    <div 
                      key={book.id} 
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                    >
                      <img 
                        src={book.imgUrl} 
                        alt={book.title} 
                        className="h-20 w-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium truncate">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <p className="text-sm mt-1">
                          Due: <span className="font-medium">{new Date(book.dueDate).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => renewBook(book.id)}>
                            Renew Book
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => returnBook(book.id)}>
                            Return Book
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    You don't have any borrowed books
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={browseBooks}>
                Browse Books
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Seat Reservations</CardTitle>
            <CardDescription>Your scheduled library seat reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {upcomingReservations.length > 0 ? (
                upcomingReservations.map((reservation) => (
                  <div 
                    key={reservation.id} 
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div>
                      <p className="font-medium">Seat {reservation.seatNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reservation.date).toLocaleDateString()} • {reservation.time}
                      </p>
                      <div 
                        className={`inline-flex items-center mt-2 px-2 py-1 rounded text-xs ${
                          reservation.status === "Confirmed" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {reservation.status}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => cancelReservation(reservation.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">
                  You don't have any upcoming reservations
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gradient-button" onClick={makeReservation}>
              Make Reservation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
