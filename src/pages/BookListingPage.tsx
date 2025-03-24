import { useState, useEffect } from "react";
import { Book, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

// Book types and mock data
type Department = "AI ML" | "CO" | "EJ" | "CIVIL" | "ME";
type Year = "FY" | "SY" | "TY";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  department: Department;
  year: Year;
  available: boolean;
  coverUrl: string;
}

export default function BookListingPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    // Realistic polytechnic books data
    const polytechnicBooks: Book[] = [
      // Computer Engineering (CO) Books
      {
        id: 1,
        title: "Programming in C",
        author: "E. Balagurusamy",
        description: "A comprehensive guide to C programming for polytechnic students",
        department: "CO",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 2,
        title: "Database Management Systems",
        author: "Dr. S.S. Sane",
        description: "An introduction to database concepts and SQL for computer engineering students",
        department: "CO",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 3,
        title: "Web Development Technologies",
        author: "V.K. Jain",
        description: "HTML, CSS, JavaScript and modern frameworks for web development",
        department: "CO",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 4,
        title: "Data Structures Using C++",
        author: "D.S. Malik",
        description: "Implementation of advanced data structures in C++ with applications",
        department: "CO",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      
      // Electronics Engineering (EJ) Books
      {
        id: 5,
        title: "Digital Electronics",
        author: "Morris Mano",
        description: "Principles and applications of digital circuits and systems",
        department: "EJ",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1563770557287-ea346329d7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 6,
        title: "Microprocessors and Microcontrollers",
        author: "Ramesh Gaonkar",
        description: "Architecture and programming of microprocessors with practical applications",
        department: "EJ",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 7,
        title: "Communication Systems",
        author: "Simon Haykin",
        description: "Principles of analog and digital communication with modern techniques",
        department: "EJ",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 8,
        title: "Electronic Devices and Circuits",
        author: "J.B. Gupta",
        description: "Fundamentals of electronic components and circuit design",
        department: "EJ",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1611175694989-4c05c0945e—-s6Dw?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      
      // Mechanical Engineering (ME) Books
      {
        id: 9,
        title: "Thermodynamics",
        author: "P.K. Nag",
        description: "Principles of thermal energy and its applications in engineering",
        department: "ME",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 10,
        title: "Machine Design",
        author: "V.B. Bhandari",
        description: "Design principles for mechanical components and systems",
        department: "ME",
        year: "TY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 11,
        title: "Fluid Mechanics",
        author: "R.K. Bansal",
        description: "Principles of fluid behavior and its engineering applications",
        department: "ME",
        year: "FY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1501159599894-155982264a55?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 12,
        title: "Strength of Materials",
        author: "R.S. Khurmi",
        description: "Analysis of material properties and structural behavior under loads",
        department: "ME",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      
      // Civil Engineering (CIVIL) Books
      {
        id: 13,
        title: "Surveying",
        author: "B.C. Punmia",
        description: "Principles and methods of land surveying for civil engineers",
        department: "CIVIL",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 14,
        title: "Structural Analysis",
        author: "S.S. Bhavikatti",
        description: "Analysis techniques for civil engineering structures",
        department: "CIVIL",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1494412519320-aa613df58c24?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 15,
        title: "Concrete Technology",
        author: "M.S. Shetty",
        description: "Properties, testing, and applications of concrete in construction",
        department: "CIVIL",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1564419571004-c25b5f9e3365?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 16,
        title: "Highway Engineering",
        author: "S.K. Khanna",
        description: "Planning, design, and construction of highways and transportation systems",
        department: "CIVIL",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1523633589114-88eaf4b4f1a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      
      // AI and ML (AI ML) Books
      {
        id: 17,
        title: "Introduction to Artificial Intelligence",
        author: "Stuart Russell",
        description: "Fundamental concepts and applications of AI for beginners",
        department: "AI ML",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1532522750741-628fba798a31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 18,
        title: "Machine Learning for Beginners",
        author: "Ethem Alpaydin",
        description: "Basic algorithms and techniques in machine learning",
        department: "AI ML",
        year: "SY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 19,
        title: "Deep Learning Fundamentals",
        author: "Yoshua Bengio",
        description: "Neural networks and advanced deep learning techniques",
        department: "AI ML",
        year: "TY",
        available: false,
        coverUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      {
        id: 20,
        title: "Python for Data Science",
        author: "Jake VanderPlas",
        description: "Programming with Python for data analysis and visualization",
        department: "AI ML",
        year: "FY",
        available: true,
        coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      }
    ];

    setBooks(polytechnicBooks);
    setFilteredBooks(polytechnicBooks);
  }, []);

  useEffect(() => {
    let result = books;

    if (searchQuery) {
      result = result.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter && departmentFilter !== "all") {
      result = result.filter(book => book.department === departmentFilter);
    }

    if (yearFilter && yearFilter !== "all") {
      result = result.filter(book => book.year === yearFilter);
    }

    setFilteredBooks(result);
  }, [searchQuery, departmentFilter, yearFilter, books]);

  const handleViewDetails = () => {
    navigate("/student-dashboard/books");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight hero-gradient mb-4">
            MSBTE Library Books
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of books for all departments and years. Sign in as a student to issue books.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
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
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="FY">First Year</SelectItem>
                  <SelectItem value="SY">Second Year</SelectItem>
                  <SelectItem value="TY">Third Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setDepartmentFilter("all");
                setYearFilter("all");
              }}>
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Book Display Tabs */}
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredBooks.length} Books Found
            </h2>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="flex flex-col overflow-hidden h-full bg-card">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
                      book.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                    }`}>
                      {book.available ? 'Available' : 'Issued'}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 text-sm text-muted-foreground flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {book.department}
                      </span>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {book.year}
                      </span>
                    </div>
                    <p className="line-clamp-2">{book.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleViewDetails}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden bg-card">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-[120px] h-[180px] overflow-hidden">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <h3 className="font-bold">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium self-start rounded-full ${
                          book.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {book.available ? 'Available' : 'Issued'}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 my-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {book.department}
                        </span>
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                          {book.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex-1 mb-3">{book.description}</p>
                      <Button 
                        variant="outline" 
                        className="self-end"
                        size="sm"
                        onClick={handleViewDetails}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
