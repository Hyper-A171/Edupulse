
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  Check,
  X,
  Download,
  BookOpen,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

// Define types
interface Book {
  id: number;
  title: string;
  author: string;
  department: string;
  publicationYear: string;
  isbn: string;
  copies: number;
  availableCopies: number;
  coverImage: string;
  description: string;
}

type BookRequestStatus = "pending" | "approved" | "rejected";

interface BookRequest {
  id: number;
  bookId: number;
  bookTitle: string;
  studentName: string;
  studentId: string;
  requestDate: string;
  status: BookRequestStatus;
}

export default function LibrarianBookManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookRequests, setBookRequests] = useState<BookRequest[]>([]);

  // New book form state
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    department: '',
    publicationYear: '',
    isbn: '',
    copies: 1,
    availableCopies: 1,
    coverImage: '',
    description: '',
  });

  // Mock data initialization
  useEffect(() => {
    // Sample book data
    const sampleBooks: Book[] = [
      {
        id: 1,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        department: 'Computer',
        publicationYear: '2009',
        isbn: '978-0262033848',
        copies: 5,
        availableCopies: 3,
        coverImage: 'https://m.media-amazon.com/images/I/41T0iBxY8FL._SX440_BO1,204,203,200_.jpg',
        description: 'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms.',
      },
      {
        id: 2,
        title: 'Artificial Intelligence: A Modern Approach',
        author: 'Stuart Russell, Peter Norvig',
        department: 'AIML',
        publicationYear: '2020',
        isbn: '978-0134610993',
        copies: 3,
        availableCopies: 1,
        coverImage: 'https://m.media-amazon.com/images/I/51xwccJOOCL._SX440_BO1,204,203,200_.jpg',
        description: 'The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.',
      },
      {
        id: 3,
        title: 'Digital Design and Computer Architecture',
        author: 'David Harris, Sarah Harris',
        department: 'Electronics',
        publicationYear: '2015',
        isbn: '978-0128000564',
        copies: 4,
        availableCopies: 4,
        coverImage: 'https://m.media-amazon.com/images/I/51RKh3TE8QL._SX440_BO1,204,203,200_.jpg',
        description: 'Digital Design and Computer Architecture takes a unique and modern approach to digital design.',
      },
      {
        id: 4,
        title: 'Mechanics of Materials',
        author: 'Ferdinand Beer, E. Russell Johnston Jr.',
        department: 'Mechanical',
        publicationYear: '2019',
        isbn: '978-1260113273',
        copies: 2,
        availableCopies: 0,
        coverImage: 'https://m.media-amazon.com/images/I/51KaUGP2-rL._SX430_BO1,204,203,200_.jpg',
        description: 'The uncontested leader for the teaching of solid mechanics.',
      },
      {
        id: 5,
        title: 'Fundamentals of Building Construction',
        author: 'Edward Allen, Joseph Iano',
        department: 'Civil',
        publicationYear: '2013',
        isbn: '978-1118138915',
        copies: 3,
        availableCopies: 2,
        coverImage: 'https://m.media-amazon.com/images/I/41l4pSwPNZL._SX430_BO1,204,203,200_.jpg',
        description: 'An illustrated guide to building construction fundamentals for students and professionals.',
      },
    ];

    // Sample book request data
    const sampleBookRequests: BookRequest[] = [
      {
        id: 1,
        bookId: 1,
        bookTitle: 'Introduction to Algorithms',
        studentName: 'Raj Patel',
        studentId: 'S12345',
        requestDate: '2025-03-18',
        status: 'pending',
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: 'Artificial Intelligence: A Modern Approach',
        studentName: 'Priya Sharma',
        studentId: 'S23456',
        requestDate: '2025-03-17',
        status: 'pending',
      },
      {
        id: 3,
        bookId: 4,
        bookTitle: 'Mechanics of Materials',
        studentName: 'Ankit Kumar',
        studentId: 'S34567',
        requestDate: '2025-03-16',
        status: 'approved',
      },
    ];

    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
    setBookRequests(sampleBookRequests);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  // Add new book
  const handleAddBook = () => {
    const bookId = books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
    const addedBook = {
      id: bookId,
      ...newBook,
    };

    setBooks([...books, addedBook]);
    setIsAddDialogOpen(false);

    toast({
      title: 'Book Added',
      description: `${newBook.title} has been added to the library.`,
    });

    // Reset form
    setNewBook({
      title: '',
      author: '',
      department: '',
      publicationYear: '',
      isbn: '',
      copies: 1,
      availableCopies: 1,
      coverImage: '',
      description: '',
    });
  };

  // Edit book
  const handleEditBook = () => {
    if (!selectedBook) return;

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id ? selectedBook : book
    );

    setBooks(updatedBooks);
    setIsEditDialogOpen(false);

    toast({
      title: 'Book Updated',
      description: `${selectedBook.title} has been updated.`,
    });
  };

  // Delete book
  const handleDeleteBook = () => {
    if (!selectedBook) return;

    const updatedBooks = books.filter((book) => book.id !== selectedBook.id);
    setBooks(updatedBooks);
    setIsDeleteDialogOpen(false);

    toast({
      title: 'Book Deleted',
      description: `${selectedBook.title} has been removed from the library.`,
    });
  };

  // Approve book request
  const handleApproveRequest = (requestId: number) => {
    const updatedRequests = bookRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'approved' as BookRequestStatus } : request
    );

    // Find the book associated with this request
    const request = bookRequests.find((req) => req.id === requestId);
    if (request) {
      // Update available copies
      const updatedBooks = books.map((book) => {
        if (book.id === request.bookId && book.availableCopies > 0) {
          return { ...book, availableCopies: book.availableCopies - 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
    }

    setBookRequests(updatedRequests);

    toast({
      title: 'Request Approved',
      description: `Book request has been approved.`,
    });
  };

  // Reject book request
  const handleRejectRequest = (requestId: number) => {
    const updatedRequests = bookRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'rejected' as BookRequestStatus } : request
    );

    setBookRequests(updatedRequests);

    toast({
      title: 'Request Rejected',
      description: `Book request has been rejected.`,
    });
  };

  // Export books data
  const handleExportBooks = () => {
    toast({
      title: 'Export Started',
      description: 'Books data is being exported to Excel.',
    });
  };

  // Export requests data
  const handleExportRequests = () => {
    toast({
      title: 'Export Started',
      description: 'Book requests data is being exported to Excel.',
    });
  };

  return (
    <DashboardLayout userType="librarian">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight hero-gradient">Book Management</h2>
          <p className="text-muted-foreground">
            Add, edit, and manage the library's book collection and student book requests.
          </p>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="books">Books Collection</TabsTrigger>
            <TabsTrigger value="requests">Book Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search books by title, author, or department..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  className="gradient-button flex items-center gap-2"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add New Book
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleExportBooks}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Publication Year</TableHead>
                      <TableHead className="text-center">Copies</TableHead>
                      <TableHead className="text-center">Available</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No books found. Try a different search or add a new book.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.department}</TableCell>
                          <TableCell>{book.publicationYear}</TableCell>
                          <TableCell className="text-center">{book.copies}</TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                book.availableCopies === 0
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}
                            >
                              {book.availableCopies}
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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedBook(book);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedBook(book);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
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
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Student Book Requests</h3>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleExportRequests}
              >
                <Download className="h-4 w-4" />
                Export Requests
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Book</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No book requests found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      bookRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.studentName}</TableCell>
                          <TableCell>{request.studentId}</TableCell>
                          <TableCell>{request.bookTitle}</TableCell>
                          <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                request.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : request.status === 'approved'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {request.status === 'pending' ? (
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  className="gradient-button flex items-center gap-1"
                                  onClick={() => handleApproveRequest(request.id)}
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={() => handleRejectRequest(request.id)}
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground px-4">-</span>
                            )}
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

      {/* Add Book Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the book details below to add it to the library collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newBook.department}
                  onChange={(e) => setNewBook({ ...newBook, department: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicationYear">Publication Year</Label>
                <Input
                  id="publicationYear"
                  value={newBook.publicationYear}
                  onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="copies">Total Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  min="1"
                  value={newBook.copies}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      copies: parseInt(e.target.value),
                      availableCopies: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={newBook.coverImage}
                  onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                className="h-20"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="gradient-button" onClick={handleAddBook}>
              Add Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle>Edit Book Details</DialogTitle>
            <DialogDescription>
              Update the book information in the library collection.
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={selectedBook.title}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={selectedBook.author}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, author: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={selectedBook.department}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, department: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-publicationYear">Publication Year</Label>
                  <Input
                    id="edit-publicationYear"
                    value={selectedBook.publicationYear}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, publicationYear: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-isbn">ISBN</Label>
                <Input
                  id="edit-isbn"
                  value={selectedBook.isbn}
                  onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-copies">Total Copies</Label>
                  <Input
                    id="edit-copies"
                    type="number"
                    min="1"
                    value={selectedBook.copies}
                    onChange={(e) =>
                      setSelectedBook({ ...selectedBook, copies: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-availableCopies">Available Copies</Label>
                  <Input
                    id="edit-availableCopies"
                    type="number"
                    min="0"
                    max={selectedBook.copies}
                    value={selectedBook.availableCopies}
                    onChange={(e) =>
                      setSelectedBook({
                        ...selectedBook,
                        availableCopies: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-coverImage">Cover Image URL</Label>
                <Input
                  id="edit-coverImage"
                  value={selectedBook.coverImage}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, coverImage: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  className="h-20"
                  value={selectedBook.description}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBook}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Book Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book from the library collection? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="flex items-center gap-4 py-4">
              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                {selectedBook.coverImage ? (
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium">{selectedBook.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              Delete Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
