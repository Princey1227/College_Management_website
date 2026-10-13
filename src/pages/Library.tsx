import { useState, useEffect } from "react";
import { backendApi, BookItem } from "@/services/mockBackend";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  BookMarked, 
  FileCheck, 
  Download, 
  CheckCircle,
  Database,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const eDatabases = [
  {
    name: "IEEE Xplore Digital Library",
    category: "Engineering & Computing",
    description: "Access over 5 million peer-reviewed journal papers, conference proceedings, and technical standards.",
    badge: "Full Campus Access",
    action: "Access IEEE"
  },
  {
    name: "ScienceDirect (Elsevier)",
    category: "Multidisciplinary Research",
    description: "World-leading scientific database covering physical sciences, engineering, and artificial intelligence.",
    badge: "Subscribed",
    action: "Launch Elsevier"
  },
  {
    name: "SpringerLink",
    category: "Science & Technology",
    description: "Browse 3,000+ peer-reviewed journals and 100,000+ e-books in computer science and applied mathematics.",
    badge: "E-Books Included",
    action: "Browse Springer"
  },
  {
    name: "ProQuest Dissertations",
    category: "Doctoral Theses",
    description: "Comprehensive repository of global PhD dissertations and master's theses across all technical disciplines.",
    badge: "Global Repo",
    action: "Open ProQuest"
  },
  {
    name: "Turnitin Plagiarism Portal",
    category: "Academic Integrity",
    description: "Similarity index checking tool for research papers, project reports, and M.Tech thesis submissions.",
    badge: "Faculty / PG",
    action: "Run Similarity Check"
  },
  {
    name: "National Digital Library of India (NDLI)",
    category: "Open Access",
    description: "Ministry of Education repository with over 70 million multidisciplinary digital learning resources.",
    badge: "Free Access",
    action: "Open NDLI"
  }
];

const Library = () => {
  const [bookQuery, setBookQuery] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [reservingId, setReservingId] = useState<string | null>(null);

  const fetchBooks = async () => {
    const data = await backendApi.library.getBooks(bookQuery);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, [bookQuery]);

  const handleReserve = async (book: BookItem) => {
    const user = backendApi.auth.getCurrentUser();
    const roll = user?.rollNo || "Guest Student";
    setReservingId(book.id);
    const res = await backendApi.library.reserveBook(book.id, roll);
    setReservingId(null);
    if (res.success) {
      toast.success(res.message);
      fetchBooks();
    } else {
      toast.error(res.message);
    }
  };

  const filteredBooks = books;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4">
            <BookMarked className="h-4 w-4 text-gtu-orange" />
            <span>CENTRAL KNOWLEDGE REPOSITORY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Digital E-Library & Research Archives
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Access 2.5 million+ digital books, international peer-reviewed journals, and technical standards 24/7 through remote campus proxy.
          </p>

          <div className="max-w-xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="flex gap-2">
              <Input
                value={bookQuery}
                onChange={(e) => setBookQuery(e.target.value)}
                placeholder="Search OPAC Catalog by Book Title, Author or Keyword..."
                className="bg-white text-slate-900 placeholder:text-slate-500 h-11"
              />
              <Button variant="cta" className="h-11 px-5 shrink-0" onClick={() => toast.success(`Filtering library catalog for "${bookQuery}"`)}>
                <Search className="h-4 w-4 mr-1.5" /> Find
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1 space-y-14">
        {/* OPAC Search Results */}
        <section className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Library OPAC Book Catalog</h2>
              <p className="text-xs text-muted-foreground">Real-time availability across central university library stacks</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {filteredBooks.length} titles matched
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredBooks.map((book, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow border-border">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Badge variant="secondary" className="text-[11px] font-semibold">
                        {book.category}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">{book.callNo}</span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mt-2">{book.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Author: {book.author}</p>
                    <p className="text-[11px] text-muted-foreground/80 font-mono">ISBN: {book.isbn}</p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                      <CheckCircle className="h-4 w-4" />
                      <span>{book.copiesAvailable} copies currently on shelf</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={book.copiesAvailable <= 0 || reservingId === book.id}
                      onClick={() => handleReserve(book)}
                    >
                      {book.copiesAvailable <= 0 ? "Out of Stock" : reservingId === book.id ? "Reserving..." : "Reserve Book"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* E-Databases Grid */}
        <section className="space-y-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-gtu-blue/10 text-gtu-blue text-xs font-semibold mb-2">
              REMOTE ACCESS PORTAL
            </div>
            <h2 className="text-2xl font-bold text-foreground">Subscribed E-Journals & Research Databases</h2>
            <p className="text-sm text-muted-foreground">Authorized access for students, researchers, and university faculty.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eDatabases.map((db, idx) => (
              <Card key={idx} className="hover:shadow-elevated transition-all border-border flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">{db.category}</span>
                    <Badge variant="outline" className="text-[11px] bg-primary/5 text-primary border-primary/20">
                      {db.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground mt-2">{db.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">{db.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full text-xs hover:bg-gtu-blue hover:text-white transition-colors"
                    onClick={() => toast.info(`Connecting to ${db.name} via University EZproxy gateway...`)}
                  >
                    <span>{db.action}</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Library Info Card */}
        <Card className="bg-gradient-to-r from-gtu-blue to-blue-900 text-white p-8 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold">Library Hours</h4>
              <p className="text-xs text-white/80 mt-1">Monday – Saturday: 08:00 AM – 10:00 PM</p>
              <p className="text-xs text-white/80">Reading Hall during Exams: 24/7 Open</p>
            </div>
            <div>
              <h4 className="text-xl font-bold">Lending Rules</h4>
              <p className="text-xs text-white/80 mt-1">Undergraduate: 4 Books / 15 Days</p>
              <p className="text-xs text-white/80">Postgraduate / Research: 8 Books / 30 Days</p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Button 
                variant="cta" 
                onClick={() => toast.success("Library Member Registration Form opened")}
              >
                Apply for Digital Library Card
              </Button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Library;
