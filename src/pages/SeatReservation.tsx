
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, CreditCard, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Seat status type
type SeatStatus = "available" | "reserved" | "selected" | "unavailable";

interface Seat {
  id: number;
  number: string;
  status: SeatStatus;
}

const SeatReservation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      number: `S${(i + 1).toString().padStart(2, "0")}`,
      status: Math.random() > 0.7 ? "reserved" : "available",
    }))
  );
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const totalAmount = selectedSeats.length * 5; // 5 rupees per seat

  const handleSeatClick = (seatId: number) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === "reserved" || seat.status === "unavailable") return;

    setSeats(
      seats.map((s) =>
        s.id === seatId
          ? {
              ...s,
              status: s.status === "selected" ? "available" : "selected",
            }
          : s
      )
    );

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleReservation = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to reserve",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const handlePayment = () => {
    // Simulate payment process
    toast({
      title: "Payment Successful",
      description: `You have successfully reserved ${selectedSeats.length} seat(s) for ₹${totalAmount}`,
    });

    // Update seats status
    setSeats(
      seats.map((seat) =>
        selectedSeats.includes(seat.id)
          ? { ...seat, status: "reserved" }
          : seat
      )
    );

    // Reset selected seats
    setSelectedSeats([]);
    setIsPaymentModalOpen(false);

    // Navigate to payment success page or show receipt
    navigate("/student-dashboard/payments/success");
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Seat Reservation</h1>
            <p className="text-muted-foreground">
              Reserve your seat in the library for focused study time
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal w-[240px]",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Library Seating Plan</CardTitle>
            <CardDescription>
              Select available seats for reservation. Each seat costs ₹5.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-muted rounded-lg w-full max-w-3xl">
                <div className="flex justify-center mb-8">
                  <div className="w-1/2 h-8 bg-primary/20 rounded-t-lg flex items-center justify-center text-sm font-medium">
                    Reading Area
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-2 mb-8">
                  {seats.slice(0, 30).map((seat) => (
                    <button
                      key={seat.id}
                      className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all",
                        seat.status === "available" && "bg-primary/20 hover:bg-primary/30 cursor-pointer",
                        seat.status === "reserved" && "bg-muted-foreground/30 cursor-not-allowed",
                        seat.status === "selected" && "bg-primary text-primary-foreground",
                        seat.status === "unavailable" && "bg-destructive/30 cursor-not-allowed"
                      )}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.status === "reserved" || seat.status === "unavailable"}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="text-center text-sm font-medium mb-4">Quiet Study Area</div>
                </div>

                <div className="grid grid-cols-10 gap-2">
                  {seats.slice(30, 50).map((seat) => (
                    <button
                      key={seat.id}
                      className={cn(
                        "w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all",
                        seat.status === "available" && "bg-primary/20 hover:bg-primary/30 cursor-pointer",
                        seat.status === "reserved" && "bg-muted-foreground/30 cursor-not-allowed",
                        seat.status === "selected" && "bg-primary text-primary-foreground",
                        seat.status === "unavailable" && "bg-destructive/30 cursor-not-allowed"
                      )}
                      onClick={() => handleSeatClick(seat.id)}
                      disabled={seat.status === "reserved" || seat.status === "unavailable"}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary/20 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted-foreground/30 rounded"></div>
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive/30 rounded"></div>
                <span className="text-sm">Unavailable</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center">
              <Label className="mr-2">Selected Seats:</Label>
              <span className="font-bold">{selectedSeats.length}</span>
              <Label className="mx-2">Total:</Label>
              <span className="font-bold">₹{totalAmount}</span>
            </div>
            <Button 
              className="gradient-button" 
              onClick={handleReservation}
              disabled={selectedSeats.length === 0}
            >
              Reserve Seats
            </Button>
          </CardFooter>
        </Card>

        {isPaymentModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Pay ₹{totalAmount} to reserve {selectedSeats.length} seat(s)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="flex justify-between mb-2">
                    <span>Selected Seats:</span>
                    <span className="font-medium">
                      {selectedSeats
                        .map((id) => seats.find((s) => s.id === id)?.number)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate ? format(selectedDate, "PPP") : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <Info className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    This is a demo payment. In a real application, UPI payment integration would be implemented here.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPaymentModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="gradient-button flex items-center gap-2" 
                    onClick={handlePayment}
                  >
                    <CreditCard className="h-4 w-4" />
                    Pay ₹{totalAmount}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SeatReservation;
