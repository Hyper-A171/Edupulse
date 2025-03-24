
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Receipt, Search, ArrowRightLeft, Check, X } from "lucide-react";

// Sample payment history data
const paymentHistoryData = [
  {
    id: 1,
    type: "Book Fine",
    bookName: "Advanced Data Structures",
    amount: 45,
    date: "2025-03-15",
    status: "Paid",
  },
  {
    id: 2,
    type: "Seat Reservation",
    seatNumber: "S12",
    amount: 5,
    date: "2025-03-10",
    status: "Paid",
  },
  {
    id: 3,
    type: "Book Fine",
    bookName: "Machine Learning Fundamentals",
    amount: 60,
    date: "2025-02-28",
    status: "Pending",
  },
  {
    id: 4,
    type: "Seat Reservation",
    seatNumber: "S05",
    amount: 5,
    date: "2025-02-15",
    status: "Paid",
  },
  {
    id: 5,
    type: "Book Fine",
    bookName: "Introduction to Algorithms",
    amount: 30,
    date: "2025-02-05",
    status: "Paid",
  },
];

// Sample pending payments data
const pendingPaymentsData = [
  {
    id: 101,
    type: "Book Fine",
    bookName: "Machine Learning Fundamentals",
    dueDate: "2025-02-28",
    amount: 60,
  },
  {
    id: 102,
    type: "Book Fine",
    bookName: "Database Management Systems",
    dueDate: "2025-03-18",
    amount: 25,
  },
];

const PaymentPage = () => {
  const { toast } = useToast();
  const [paymentHistory, setPaymentHistory] = useState(paymentHistoryData);
  const [pendingPayments, setPendingPayments] = useState(pendingPaymentsData);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Update pending payments list
      setPendingPayments(pendingPayments.filter(p => p.id !== selectedPayment.id));
      
      // Add to payment history
      const newPayment = {
        id: Date.now(),
        type: selectedPayment.type,
        bookName: selectedPayment.bookName,
        amount: selectedPayment.amount,
        date: new Date().toISOString().slice(0, 10),
        status: "Paid"
      };
      
      setPaymentHistory([newPayment, ...paymentHistory]);
      
      // Close modal and show success message
      setIsPaymentModalOpen(false);
      toast({
        title: "Payment Successful",
        description: `You have successfully paid ₹${selectedPayment.amount}`,
      });
      setSelectedPayment(null);
    }, 1500);
  };

  const filteredPaymentHistory = paymentHistory.filter(
    payment => 
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.bookName && payment.bookName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage your library payments and view payment history
          </p>
        </div>

        {pendingPayments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Pending Payments
              </CardTitle>
              <CardDescription>
                You have {pendingPayments.length} pending payment(s) to complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {pendingPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4"
                  >
                    <div>
                      <h3 className="font-medium">{payment.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {payment.bookName} • Due: {payment.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">₹{payment.amount}</p>
                      <Button 
                        size="sm" 
                        className="gradient-button"
                        onClick={() => handlePayNow(payment)}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" /> Payment History
            </CardTitle>
            <CardDescription>
              View all your past payments and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaymentHistory.length > 0 ? (
                    filteredPaymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>
                          {payment.bookName && payment.bookName}
                          {payment.seatNumber && `Seat ${payment.seatNumber}`}
                        </TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'Paid' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No payment records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPaymentHistory.length} of {paymentHistory.length} entries
            </div>
            {/* Add pagination if needed */}
          </CardFooter>
        </Card>

        {isPaymentModalOpen && selectedPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Pay ₹{selectedPayment.amount} for {selectedPayment.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="flex justify-between mb-2">
                    <span>Payment Type:</span>
                    <span className="font-medium">{selectedPayment.type}</span>
                  </div>
                  {selectedPayment.bookName && (
                    <div className="flex justify-between mb-2">
                      <span>Book:</span>
                      <span className="font-medium">{selectedPayment.bookName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-bold">₹{selectedPayment.amount}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20 border-primary">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" 
                           alt="UPI" 
                           className="h-10 object-contain mb-1" />
                      <span className="text-xs">UPI</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <CreditCard className="h-10 w-10 mb-1" />
                      <span className="text-xs">Card</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                      <ArrowRightLeft className="h-10 w-10 mb-1" />
                      <span className="text-xs">Net Banking</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="sm:flex-1"
                  onClick={() => {
                    setIsPaymentModalOpen(false);
                    setSelectedPayment(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="gradient-button sm:flex-1"
                  onClick={processPayment}
                >
                  Pay ₹{selectedPayment.amount}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentPage;
