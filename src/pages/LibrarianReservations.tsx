import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Clock, User, Check, X, Download, Filter, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { exportToExcel } from '@/utils/exportUtils';

// Define types
interface SeatReservation {
  id: number;
  studentName: string;
  studentId: string;
  seatNumber: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'approved' | 'rejected';
  purpose: string;
}

export default function LibrarianReservations() {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<SeatReservation[]>([
    {
      id: 1,
      studentName: 'Raj Patel',
      studentId: 'S12345',
      seatNumber: 'A15',
      date: '2025-03-20',
      timeSlot: '09:00 AM - 11:00 AM',
      status: 'pending',
      purpose: 'Study for exams',
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      studentId: 'S23456',
      seatNumber: 'B22',
      date: '2025-03-20',
      timeSlot: '01:00 PM - 03:00 PM',
      status: 'pending',
      purpose: 'Group discussion',
    },
    {
      id: 3,
      studentName: 'Ankit Kumar',
      studentId: 'S34567',
      seatNumber: 'C08',
      date: '2025-03-21',
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'approved',
      purpose: 'Research work',
    },
    {
      id: 4,
      studentName: 'Meera Singh',
      studentId: 'S45678',
      seatNumber: 'D12',
      date: '2025-03-19',
      timeSlot: '02:00 PM - 04:00 PM',
      status: 'rejected',
      purpose: 'Project meeting',
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState<SeatReservation | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const handleApprove = (id: number) => {
    const updatedReservations = reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status: 'approved' as const } : reservation
    );
    setReservations(updatedReservations);
    
    const reservation = reservations.find(r => r.id === id);
    
    toast({
      title: "Reservation Approved",
      description: `You've approved ${reservation?.studentName}'s reservation for seat ${reservation?.seatNumber}.`,
    });
  };

  const handleDecline = (id: number) => {
    const updatedReservations = reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status: 'rejected' as const } : reservation
    );
    setReservations(updatedReservations);
    
    const reservation = reservations.find(r => r.id === id);
    
    toast({
      title: "Reservation Declined",
      description: `You've declined ${reservation?.studentName}'s reservation for seat ${reservation?.seatNumber}.`,
    });
  };

  const handleExport = () => {
    try {
      const exportData = reservations.map(reservation => ({
        ID: reservation.id,
        'Student Name': reservation.studentName,
        'Student ID': reservation.studentId,
        'Seat Number': reservation.seatNumber,
        'Date': format(new Date(reservation.date), 'PPP'),
        'Time Slot': reservation.timeSlot,
        'Status': reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1),
        'Purpose': reservation.purpose
      }));
      
      exportToExcel(exportData, 'Library_Reservations');
      
      toast({
        title: "Export Successful",
        description: "Reservation data has been exported to Excel.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting the data.",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (reservation: SeatReservation) => {
    setSelectedReservation(reservation);
    setDetailsDialogOpen(true);
  };

  const pendingReservations = reservations.filter(reservation => reservation.status === 'pending');
  const approvedReservations = reservations.filter(reservation => reservation.status === 'approved');
  const rejectedReservations = reservations.filter(reservation => reservation.status === 'rejected');

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Seat Reservations
          </h2>
          <p className="text-muted-foreground">
            Manage student seat reservations for the library study areas. Library operating hours are 8:00 AM to 4:00 PM, Monday to Friday.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Showing all reservations</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending
              {pendingReservations.length > 0 && (
                <span className="ml-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 text-xs">
                  {pendingReservations.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Reservations</TabsTrigger>
          </TabsList>

          {/* Pending Reservations Tab */}
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Reservations</CardTitle>
                <CardDescription>
                  Reservation requests that need your approval
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No pending reservations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.studentName}</TableCell>
                          <TableCell>{reservation.studentId}</TableCell>
                          <TableCell>{reservation.seatNumber}</TableCell>
                          <TableCell>{format(new Date(reservation.date), 'PPP')}</TableCell>
                          <TableCell>{reservation.timeSlot}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 h-8"
                                onClick={() => handleViewDetails(reservation)}
                              >
                                <Info className="h-3.5 w-3.5" />
                                Details
                              </Button>
                              <Button
                                size="sm"
                                className="gradient-button flex items-center gap-1 h-8"
                                onClick={() => handleApprove(reservation.id)}
                              >
                                <Check className="h-3.5 w-3.5" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-1 h-8"
                                onClick={() => handleDecline(reservation.id)}
                              >
                                <X className="h-3.5 w-3.5" />
                                Decline
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approved Reservations Tab */}
          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Approved Reservations</CardTitle>
                <CardDescription>
                  Reservation requests that have been approved
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No approved reservations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      approvedReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.studentName}</TableCell>
                          <TableCell>{reservation.studentId}</TableCell>
                          <TableCell>{reservation.seatNumber}</TableCell>
                          <TableCell>{format(new Date(reservation.date), 'PPP')}</TableCell>
                          <TableCell>{reservation.timeSlot}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 h-8"
                              onClick={() => handleViewDetails(reservation)}
                            >
                              <Info className="h-3.5 w-3.5" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rejected Reservations Tab */}
          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rejected Reservations</CardTitle>
                <CardDescription>
                  Reservation requests that have been declined
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No rejected reservations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rejectedReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.studentName}</TableCell>
                          <TableCell>{reservation.studentId}</TableCell>
                          <TableCell>{reservation.seatNumber}</TableCell>
                          <TableCell>{format(new Date(reservation.date), 'PPP')}</TableCell>
                          <TableCell>{reservation.timeSlot}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 h-8"
                              onClick={() => handleViewDetails(reservation)}
                            >
                              <Info className="h-3.5 w-3.5" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Reservations Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Reservations</CardTitle>
                <CardDescription>
                  Complete list of all seat reservations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No reservations found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.studentName}</TableCell>
                          <TableCell>{reservation.studentId}</TableCell>
                          <TableCell>{reservation.seatNumber}</TableCell>
                          <TableCell>{format(new Date(reservation.date), 'PPP')}</TableCell>
                          <TableCell>{reservation.timeSlot}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                reservation.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : reservation.status === 'approved'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >
                              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-1 h-8"
                              onClick={() => handleViewDetails(reservation)}
                            >
                              <Info className="h-3.5 w-3.5" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reservation Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogDescription>
              Detailed information about this seat reservation
            </DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedReservation.studentName} ({selectedReservation.studentId})
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Reservation Status</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedReservation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : selectedReservation.status === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {selectedReservation.status.charAt(0).toUpperCase() +
                      selectedReservation.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Seat Information</h4>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p>Seat Number: <span className="font-medium">{selectedReservation.seatNumber}</span></p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Date & Time</h4>
                <div className="bg-muted/50 p-3 rounded-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(selectedReservation.date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedReservation.timeSlot}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Purpose</h4>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p>{selectedReservation.purpose}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedReservation && selectedReservation.status === 'pending' ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handleDecline(selectedReservation.id)}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Decline
                </Button>
                <Button 
                  className="gradient-button"
                  onClick={() => handleApprove(selectedReservation.id)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            ) : (
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
