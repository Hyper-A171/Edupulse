
import { useState } from "react";
import { NavbarWithoutRouter } from "@/components/NavbarWithoutRouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";

// Seat status type
type SeatStatus = "available" | "reserved" | "unavailable";

const ReservationShowcase = () => {
  const navigate = useNavigate();
  const [seats] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      number: `S${(i + 1).toString().padStart(2, "0")}`,
      status: Math.random() > 0.7 ? "reserved" : 
              Math.random() > 0.8 ? "unavailable" : "available",
    }))
  );

  // Mock data for charts
  const weeklyReservations = [
    { name: "Week 1", reservations: 45 },
    { name: "Week 2", reservations: 65 },
    { name: "Week 3", reservations: 52 },
    { name: "Week 4", reservations: 78 },
  ];

  const departmentReservations = [
    { name: "Computer", students: 45 },
    { name: "Electronics", students: 35 },
    { name: "Civil", students: 25 },
    { name: "Mechanical", students: 30 },
    { name: "AI ML", students: 40 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithoutRouter />
      
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight hero-gradient">
              Library Seat Reservations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reserve your seat in our library for focused study time. Each seat costs only ₹5.
              Login to your student account to make a reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Reservation Statistics</CardTitle>
                <CardDescription>Weekly seat reservation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyReservations}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar
                        dataKey="reservations"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Usage</CardTitle>
                <CardDescription>Students per department using library seats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={departmentReservations}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="students"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Library Seating Plan</CardTitle>
              <CardDescription>
                View our library seating arrangement. Login to reserve an available seat.
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
                      <div
                        key={seat.id}
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium",
                          seat.status === "available" && "bg-primary/20",
                          seat.status === "reserved" && "bg-muted-foreground/30",
                          seat.status === "unavailable" && "bg-destructive/30"
                        )}
                      >
                        {seat.number}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <div className="text-center text-sm font-medium mb-4">Quiet Study Area</div>
                  </div>

                  <div className="grid grid-cols-10 gap-2">
                    {seats.slice(30, 50).map((seat) => (
                      <div
                        key={seat.id}
                        className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium",
                          seat.status === "available" && "bg-primary/20",
                          seat.status === "reserved" && "bg-muted-foreground/30",
                          seat.status === "unavailable" && "bg-destructive/30"
                        )}
                      >
                        {seat.number}
                      </div>
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
                  <div className="w-4 h-4 bg-muted-foreground/30 rounded"></div>
                  <span className="text-sm">Reserved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-destructive/30 rounded"></div>
                  <span className="text-sm">Unavailable</span>
                </div>
              </div>

              <div className="flex items-center p-3 mt-6 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <Info className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Each seat costs ₹5 per reservation. Login to your student account to make a reservation.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                className="gradient-button"
                onClick={() => navigate("/login")}
              >
                Login to Reserve a Seat
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 EduPulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReservationShowcase;
