import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  UserPlus,
  Download,
  Filter,
  X as XIcon,
  Check,
} from "lucide-react";

// Types for user data
type Department = "AI ML" | "CO" | "EJ" | "CIVIL" | "ME";
type Year = "FYAN" | "FYCE" | "TYCO" | "SYEJ";
type Status = "Active" | "Inactive" | "Suspended";

interface User {
  id: number;
  name: string;
  rollNumber: string;
  email: string;
  department: Department;
  year: Year;
  phone: string;
  status: Status;
  booksBorrowed: number;
  fineAmount: number;
}

// Generate random mock data
const generateMockUsers = (count: number): User[] => {
  const departments: Department[] = ["AI ML", "CO", "EJ", "CIVIL", "ME"];
  const years: Year[] = ["FYAN", "FYCE", "TYCO", "SYEJ"];
  const statuses: Status[] = ["Active", "Inactive", "Suspended"];
  const users: User[] = [];

  const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Ayaan", "Atharva", 
    "Krishna", "Ishaan", "Shaurya", "Dhruv", "Kabir", "Aadvik", "Arnav", "Advaith", 
    "Sai", "Rudra", "Samarth", "Yug", "Yash", "Parth", "Aadit", "Rohan", "Aryan", 
    "Aahil", "Sachin", "Varun", "Virat", "Amar", "Darsh", "Dev", "Rahul", "Rishi", 
    "Shlok", "Veer", "Suraj", "Jay", "Pranav", "Abhinav", "Om", "Akshay", "Nikhil", 
    "Sidharth", "Vijay", "Tanay", "Tanish", "Utkarsh", "Pransh", "Ansh",
    "Aanya", "Aaradhya", "Ananya", "Aditi", "Aisha", "Anvi", "Diya", "Fatima", 
    "Ira", "Ishita", "Kiara", "Maryam", "Myra", "Navya", "Pari", "Riya", "Saanvi", 
    "Sana", "Sara", "Ahana", "Dia", "Disha", "Fiza", "Kashvi", "Khushi", "Maira", 
    "Misha", "Nisha", "Noor", "Prisha", "Rashi", "Samaira", "Shanaya", "Shravya", 
    "Sneha", "Tanvi", "Trisha", "Vanya", "Zoya", "Aarna", "Divya", "Kaia", "Minnal", 
    "Rewa", "Sia", "Tara", "Veda", "Maya"
  ];

  const lastNames = [
    "Sharma", "Verma", "Patel", "Singh", "Kumar", "Agarwal", "Gupta", "Jain", 
    "Shah", "Mehta", "Chopra", "Bose", "Kapoor", "Chatterjee", "Sen", "Roy", 
    "Das", "Banerjee", "Mukherjee", "Malhotra", "Khanna", "Kaur", "Chauhan", "Tiwari", 
    "Yadav", "Chowdhury", "Desai", "Patil", "Joshi", "Shekhawat", "Nair", "Reddy", 
    "Rao", "Menon", "Iyer", "Iyengar", "Pillai", "George", "Fernandes", "D'Souza", 
    "D'Silva", "Kulkarni", "Deshpande", "Mahajan", "Garg", "Saini", "Walia", "Bhatia", 
    "Bajaj", "Arora"
  ];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    const department = departments[Math.floor(Math.random() * departments.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate roll number with department and year prefix
    const deptCode = department.replace(" ", "").substring(0, 2);
    const yearCode = year.substring(0, 2);
    const rollNumber = `${yearCode}${deptCode}${Math.floor(1000 + Math.random() * 9000)}`;
    
    users.push({
      id: i,
      name,
      rollNumber,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@edupulse.edu`,
      department,
      year,
      phone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
      status,
      booksBorrowed: Math.floor(Math.random() * 4),
      fineAmount: Math.floor(Math.random() * 500),
    });
  }

  return users;
};

export default function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  
  useEffect(() => {
    // Generate 300 mock users
    const mockUsers = generateMockUsers(300);
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);
  
  useEffect(() => {
    let result = users;
    
    if (searchQuery) {
      result = result.filter(
        user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (departmentFilter && departmentFilter !== "all") {
      result = result.filter(user => user.department === departmentFilter);
    }
    
    if (yearFilter && yearFilter !== "all") {
      result = result.filter(user => user.year === yearFilter);
    }
    
    if (statusFilter && statusFilter !== "all") {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, departmentFilter, yearFilter, statusFilter, users]);
  
  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  const handleAddUser = () => {
    // In a real app, this would call an API
    const lastId = users.length ? Math.max(...users.map(user => user.id)) : 0;
    
    const newUserWithDefaults: User = {
      id: lastId + 1,
      name: newUser.name,
      rollNumber: newUser.rollNumber,
      email: newUser.email,
      department: newUser.department as Department,
      year: newUser.year as Year,
      phone: newUser.phone,
      status: "Active",
      booksBorrowed: 0,
      fineAmount: 0,
    };
    
    setUsers(prevUsers => [...prevUsers, newUserWithDefaults]);
    setIsAddUserDialogOpen(false);
    setNewUser({
      name: "",
      rollNumber: "",
      email: "",
      department: "",
      year: "",
      phone: "",
    });
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });
  };
  
  const handleChangeStatus = (userId: number, newStatus: Status) => {
    // In a real app, this would call an API
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    toast({
      title: "Status Updated",
      description: `User status has been updated to ${newStatus}.`,
    });
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setDepartmentFilter("all");
    setYearFilter("all");
    setStatusFilter("all");
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pagesToShow = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    
    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}
          
          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink 
                isActive={page === currentPage} 
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">
            Student Management
          </h2>
          <p className="text-muted-foreground">
            Manage student accounts, view borrowed books, and handle fines.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, roll number, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="AI ML">AI ML</SelectItem>
              <SelectItem value="CO">CO</SelectItem>
              <SelectItem value="EJ">EJ</SelectItem>
              <SelectItem value="CIVIL">CIVIL</SelectItem>
              <SelectItem value="ME">ME</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="FYAN">First Year</SelectItem>
              <SelectItem value="FYCE">Second Year</SelectItem>
              <SelectItem value="TYCO">Third Year</SelectItem>
              <SelectItem value="SYEJ">Final Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          
          {(departmentFilter !== "all" || yearFilter !== "all" || statusFilter !== "all") && (
            <Button variant="ghost" onClick={clearFilters} className="h-10 px-3">
              <XIcon className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Books Borrowed</TableHead>
                <TableHead>Fine Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.rollNumber}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.year}</TableCell>
                    <TableCell>{user.booksBorrowed}</TableCell>
                    <TableCell>
                      {user.fineAmount > 0 
                        ? <span className="text-red-600 dark:text-red-400">₹{user.fineAmount}</span>
                        : '₹0'
                      }
                    </TableCell>
                    <TableCell>
                      <div 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : user.status === 'Inactive'
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}
                      >
                        {user.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.status === 'Active' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleChangeStatus(user.id, 'Inactive')}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleChangeStatus(user.id, 'Active')}
                        >
                          Activate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} students
          </div>
          {renderPagination()}
        </div>
        
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details of the new student to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm">
                  Name
                </label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="rollNumber" className="text-right text-sm">
                  Roll Number
                </label>
                <Input
                  id="rollNumber"
                  value={newUser.rollNumber}
                  onChange={(e) => setNewUser({ ...newUser, rollNumber: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department" className="text-right text-sm">
                  Department
                </label>
                <Select
                  value={newUser.department}
                  onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI ML">AI ML</SelectItem>
                    <SelectItem value="CO">CO</SelectItem>
                    <SelectItem value="EJ">EJ</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                    <SelectItem value="ME">ME</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="year" className="text-right text-sm">
                  Year
                </label>
                <Select
                  value={newUser.year}
                  onValueChange={(value) => setNewUser({ ...newUser, year: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FYAN">First Year</SelectItem>
                    <SelectItem value="FYCE">Second Year</SelectItem>
                    <SelectItem value="TYCO">Third Year</SelectItem>
                    <SelectItem value="SYEJ">Final Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm">
                  Phone
                </label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
