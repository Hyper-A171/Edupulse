
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CreditCard,
  Download,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  User,
  FileSearch,
  Receipt,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

// Define types
interface Payment {
  id: number;
  studentName: string;
  studentId: string;
  amount: number;
  date: string;
  paymentType: 'Late Fee' | 'Reservation Fee' | 'Membership Fee' | 'Lost Book';
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'UPI';
  status: 'completed' | 'pending' | 'failed';
  receiptNumber: string;
}

export default function LibrarianPayments() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    studentName: '',
    studentId: '',
    amount: 0,
    paymentType: 'Late Fee',
    paymentMethod: 'Cash',
  });

  // Sample payment data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      studentName: 'Raj Patel',
      studentId: 'S12345',
      amount: 150,
      date: '2025-03-18',
      paymentType: 'Late Fee',
      paymentMethod: 'Credit Card',
      status: 'completed',
      receiptNumber: 'REC-001234',
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      studentId: 'S23456',
      amount: 500,
      date: '2025-03-17',
      paymentType: 'Reservation Fee',
      paymentMethod: 'UPI',
      status: 'completed',
      receiptNumber: 'REC-001235',
    },
    {
      id: 3,
      studentName: 'Ankit Kumar',
      studentId: 'S34567',
      amount: 1200,
      date: '2025-03-16',
      paymentType: 'Lost Book',
      paymentMethod: 'Debit Card',
      status: 'pending',
      receiptNumber: 'REC-001236',
    },
    {
      id: 4,
      studentName: 'Meera Singh',
      studentId: 'S45678',
      amount: 800,
      date: '2025-03-15',
      paymentType: 'Membership Fee',
      paymentMethod: 'Cash',
      status: 'completed',
      receiptNumber: 'REC-001237',
    },
    {
      id: 5,
      studentName: 'Arjun Reddy',
      studentId: 'S56789',
      amount: 250,
      date: '2025-03-14',
      paymentType: 'Late Fee',
      paymentMethod: 'UPI',
      status: 'failed',
      receiptNumber: 'REC-001238',
    },
  ]);

  // Filter payments based on search query and type filter
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType ? payment.paymentType === filterType : true;

    return matchesSearch && matchesType;
  });

  // Handle view payment details
  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailsDialogOpen(true);
  };

  // Handle export data
  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Payment data is being exported to Excel format.',
    });
  };

  // Handle adding a new payment
  const handleAddPayment = () => {
    const now = new Date();
    const newId = payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1;
    const receiptNumber = `REC-${String(100000 + newId).slice(1)}`;
    
    const paymentToAdd: Payment = {
      id: newId,
      studentName: newPayment.studentName,
      studentId: newPayment.studentId,
      amount: newPayment.amount,
      date: now.toISOString().split('T')[0],
      paymentType: newPayment.paymentType as any,
      paymentMethod: newPayment.paymentMethod as any,
      status: 'completed',
      receiptNumber,
    };
    
    setPayments([paymentToAdd, ...payments]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewPayment({
      studentName: '',
      studentId: '',
      amount: 0,
      paymentType: 'Late Fee',
      paymentMethod: 'Cash',
    });
    
    toast({
      title: 'Payment Added',
      description: `Payment of ₹${newPayment.amount} from ${newPayment.studentName} has been recorded.`,
    });
  };

  // Calculate total revenue
  const totalRevenue = payments
    .filter((payment) => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Data for payment type distribution chart
  const paymentTypeData = [
    { name: 'Late Fee', value: 0 },
    { name: 'Reservation Fee', value: 0 },
    { name: 'Membership Fee', value: 0 },
    { name: 'Lost Book', value: 0 },
  ];

  payments.forEach((payment) => {
    if (payment.status === 'completed') {
      const typeIndex = paymentTypeData.findIndex((item) => item.name === payment.paymentType);
      if (typeIndex !== -1) {
        paymentTypeData[typeIndex].value += payment.amount;
      }
    }
  });

  // Data for weekly payments chart
  const weeklyData = [
    { name: 'Week 1', amount: 1200 },
    { name: 'Week 2', amount: 1800 },
    { name: 'Week 3', amount: 2200 },
    { name: 'Week 4', amount: 1500 },
  ];

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">Payment Management</h2>
          <p className="text-muted-foreground">
            Track, manage, and analyze all payments from students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-500 mt-1">+₹2,500 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {payments.filter((p) => p.status === 'completed').length}
              </div>
              <p className="text-xs text-green-500 mt-1">+8 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {payments.filter((p) => p.status === 'pending').length}
              </div>
              <p className="text-xs text-yellow-500 mt-1">2 need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Payment Trends</CardTitle>
              <CardDescription>Total payments collected by week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: any) => [`₹${value}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Type Distribution</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {paymentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`₹${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by student name, ID, or receipt number..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={filterType || "all"} onValueChange={(value) => setFilterType(value === "all" ? null : value)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Late Fee">Late Fee</SelectItem>
                <SelectItem value="Reservation Fee">Reservation Fee</SelectItem>
                <SelectItem value="Membership Fee">Membership Fee</SelectItem>
                <SelectItem value="Lost Book">Lost Book</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>

            <Button
              className="gradient-button flex items-center gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Payment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>
              Complete history of all student payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt No.</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No payment records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.receiptNumber}</TableCell>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell>{format(new Date(payment.date), 'PPP')}</TableCell>
                      <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.paymentType}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                              <FileSearch className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Detailed information about this payment
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Receipt #{selectedPayment.receiptNumber}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedPayment.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : selectedPayment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-2">₹{selectedPayment.amount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(selectedPayment.date), 'PPP')}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-medium">Student Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedPayment.studentName} ({selectedPayment.studentId})
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Payment Type</h4>
                  <p>{selectedPayment.paymentType}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Payment Method</h4>
                  <p>{selectedPayment.paymentMethod}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Payment</DialogTitle>
            <DialogDescription>
              Record a new payment from a student
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={newPayment.studentName}
                  onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={newPayment.studentId}
                  onChange={(e) => setNewPayment({ ...newPayment, studentId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={newPayment.amount}
                onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select
                  defaultValue={newPayment.paymentType}
                  onValueChange={(value) => setNewPayment({ ...newPayment, paymentType: value })}
                >
                  <SelectTrigger id="paymentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Late Fee">Late Fee</SelectItem>
                    <SelectItem value="Reservation Fee">Reservation Fee</SelectItem>
                    <SelectItem value="Membership Fee">Membership Fee</SelectItem>
                    <SelectItem value="Lost Book">Lost Book</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  defaultValue={newPayment.paymentMethod}
                  onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="gradient-button" onClick={handleAddPayment}>
              Add Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
