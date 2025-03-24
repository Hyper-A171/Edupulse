
import { Navbar } from "@/components/Navbar";
import { Book, BookOpen, CalendarCheck, CreditCard, Users, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter hero-gradient mb-6">
                About EduPulse Library
              </h1>
              <p className="text-lg text-muted-foreground">
                Revolutionizing library management for the digital age
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto prose dark:prose-invert mb-16">
              <p>
                EduPulse Library is a comprehensive digital library management system designed specifically for educational institutions. 
                Our platform bridges the gap between traditional library management and modern digital solutions, creating 
                a seamless experience for both students and librarians.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Our mission is to transform library experiences by providing an intuitive, efficient, and user-friendly 
                platform that addresses the specific needs of academic institutions. We aim to streamline library operations, 
                enhance resource accessibility, and foster a culture of knowledge sharing and academic excellence.
              </p>
              
              <h2>Our Vision</h2>
              <p>
                We envision a future where digital library systems become an integral part of educational ecosystems, 
                empowering students with unlimited access to knowledge resources and equipping librarians with powerful 
                tools to manage and curate these resources effectively.
              </p>
              
              <h2>Library Hours</h2>
              <div className="not-prose bg-card p-6 rounded-lg border shadow-sm mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-edupulse flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Operating Hours</h3>
                <p className="text-muted-foreground mb-2">
                  Our library is open during the following hours:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Days</h4>
                    <p>Monday to Friday</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p>8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
              
              <h2>Core Values</h2>
              <ul>
                <li><strong>Innovation:</strong> Constantly exploring new technologies and approaches to improve library management</li>
                <li><strong>Accessibility:</strong> Making library resources available to all students regardless of physical limitations</li>
                <li><strong>Efficiency:</strong> Streamlining processes to save time for both students and librarians</li>
                <li><strong>User-Centric Design:</strong> Creating intuitive interfaces that prioritize user experience</li>
                <li><strong>Data Security:</strong> Ensuring all user data and transactions are secure and private</li>
              </ul>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-gradient-edupulse flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Digital Library</h3>
                <p className="text-muted-foreground">
                  Access thousands of books, journals, and research papers with just a few clicks
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-gradient-edupulse flex items-center justify-center mb-4">
                  <CalendarCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Seat Reservation</h3>
                <p className="text-muted-foreground">
                  Book your spot in advance to ensure a quiet place to study when you need it
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-gradient-edupulse flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Online Payments</h3>
                <p className="text-muted-foreground">
                  Conveniently pay fines, fees, and reservations through our secure payment gateway
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-gradient-edupulse flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">User Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive tools for administrators to manage students, resources, and operations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
