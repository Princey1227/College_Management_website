// ============================================================
// ATHARVA TECHNOLOGICAL UNIVERSITY - CLIENT STORAGE BACKEND
// Full REST-style LocalStorage persistence engine with seed data
// ============================================================

export interface SubjectGrade {
  code: string;
  name: string;
  credits: number;
  internal: number;
  external: number;
  total: number;
  grade: string;
}

export interface StudentResult {
  rollNo: string;
  studentName: string;
  course: string;
  branch: string;
  institute: string;
  semester: string;
  examSession: string;
  declarationDate: string;
  sgpa: number;
  cgpa: number;
  status: "PASS" | "FAIL";
  subjects: SubjectGrade[];
}

export interface UserSession {
  id: string;
  username: string;
  name: string;
  role: "student" | "faculty" | "admin";
  email: string;
  avatar?: string;
  rollNo?: string;
  branch?: string;
  semester?: string;
}

export interface AdmissionApplication {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  course: string;
  score: string;
  status: "Pending" | "Under Review" | "Accepted" | "Rejected";
  submittedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  message: string;
  status: "Open" | "In Progress" | "Resolved";
  submittedAt: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  copiesAvailable: number;
  category: string;
  callNo: string;
}

export interface BookReservation {
  id: string;
  bookId: string;
  bookTitle: string;
  userRoll: string;
  reservedAt: string;
  status: "Active" | "Returned";
}

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  type: "urgent" | "academic" | "event";
  date: string;
  link?: string;
  active: boolean;
}

// STORAGE KEYS
const STORAGE_KEYS = {
  USERS: "atu_db_users",
  RESULTS: "atu_db_results",
  ADMISSIONS: "atu_db_admissions",
  INQUIRIES: "atu_db_inquiries",
  BOOKS: "atu_db_books",
  RESERVATIONS: "atu_db_reservations",
  ANNOUNCEMENTS: "atu_db_announcements",
  SESSION: "atu_db_session",
};

// INITIAL SEED DATA
const SEED_USERS: UserSession[] = [
  {
    id: "u-1",
    username: "210010116001",
    name: "Aarav Patel",
    role: "student",
    email: "aarav.p@gec.edu.in",
    rollNo: "210010116001",
    branch: "Computer Science & Engineering",
    semester: "Semester 6",
  },
  {
    id: "u-2",
    username: "220020119042",
    name: "Priya Sharma",
    role: "student",
    email: "priya.s@ldce.ac.in",
    rollNo: "220020119042",
    branch: "Information Technology",
    semester: "Semester 4",
  },
  {
    id: "u-3",
    username: "FAC-CS-104",
    name: "Prof. R. K. Varma",
    role: "faculty",
    email: "rkvarma@atharva.edu.in",
    branch: "Computer Science",
  },
  {
    id: "u-4",
    username: "ADMIN-DIR-01",
    name: "Dr. K. N. Sheth (Registrar)",
    role: "admin",
    email: "registrar@atharva.edu.in",
  },
];

const SEED_RESULTS: StudentResult[] = [
  {
    rollNo: "210010116001",
    studentName: "AARAV PATEL",
    course: "Bachelor of Technology",
    branch: "Computer Science & Engineering",
    institute: "Government Engineering College, Sector 28",
    semester: "Semester 6",
    examSession: "Summer 2024 Examination",
    declarationDate: "August 24, 2024",
    sgpa: 8.84,
    cgpa: 8.62,
    status: "PASS",
    subjects: [
      { code: "3160704", name: "Data Science with Python", credits: 4, internal: 28, external: 64, total: 92, grade: "AA" },
      { code: "3160712", name: "Cloud Computing & DevOps", credits: 4, internal: 26, external: 60, total: 86, grade: "AB" },
      { code: "3160713", name: "Web Technology & Full Stack", credits: 4, internal: 29, external: 65, total: 94, grade: "AA" },
      { code: "3160714", name: "Cyber Security & Forensics", credits: 3, internal: 25, external: 58, total: 83, grade: "BB" },
      { code: "3160002", name: "Contributor Personality Dev.", credits: 2, internal: 27, external: 62, total: 89, grade: "AB" },
      { code: "3160715", name: "Design Engineering - II B", credits: 3, internal: 30, external: 68, total: 98, grade: "AA" },
    ],
  },
  {
    rollNo: "220020119042",
    studentName: "PRIYA SHARMA",
    course: "Bachelor of Technology",
    branch: "Information Technology",
    institute: "L.D. College of Engineering, Ahmedabad",
    semester: "Semester 4",
    examSession: "Summer 2024 Examination",
    declarationDate: "August 20, 2024",
    sgpa: 9.15,
    cgpa: 9.02,
    status: "PASS",
    subjects: [
      { code: "3140705", name: "Object Oriented Programming", credits: 4, internal: 29, external: 67, total: 96, grade: "AA" },
      { code: "3140707", name: "Computer Organization", credits: 4, internal: 28, external: 62, total: 90, grade: "AA" },
      { code: "3140708", name: "Discrete Mathematics", credits: 4, internal: 27, external: 64, total: 91, grade: "AA" },
      { code: "3140709", name: "Operating Systems", credits: 4, internal: 26, external: 61, total: 87, grade: "AB" },
      { code: "3140005", name: "Design Engineering - I B", credits: 3, internal: 28, external: 65, total: 93, grade: "AA" },
    ],
  },
];

const SEED_BOOKS: BookItem[] = [
  {
    id: "b-1",
    title: "Artificial Intelligence: A Modern Approach (4th Ed)",
    author: "Stuart Russell & Peter Norvig",
    isbn: "978-0134610993",
    totalCopies: 15,
    copiesAvailable: 14,
    category: "Computer Science",
    callNo: "006.3 RUS",
  },
  {
    id: "b-2",
    title: "Introduction to Algorithms (4th Ed)",
    author: "Thomas H. Cormen, Charles E. Leiserson",
    isbn: "978-0262046305",
    totalCopies: 25,
    copiesAvailable: 22,
    category: "Algorithms",
    callNo: "005.1 COR",
  },
  {
    id: "b-3",
    title: "Operating System Concepts (10th Ed)",
    author: "Abraham Silberschatz, Peter B. Galvin",
    isbn: "978-1119456339",
    totalCopies: 20,
    copiesAvailable: 18,
    category: "System Software",
    callNo: "005.43 SIL",
  },
  {
    id: "b-4",
    title: "Machine Learning: An Algorithmic Perspective",
    author: "Stephen Marsland",
    isbn: "978-1466583283",
    totalCopies: 10,
    copiesAvailable: 9,
    category: "Data Science",
    callNo: "006.31 MAR",
  },
];

const SEED_ADMISSIONS: AdmissionApplication[] = [
  {
    id: "adm-101",
    candidateName: "Yashika Patel",
    email: "yashika.p@gmail.com",
    phone: "+91 9876543210",
    course: "B.Tech Computer Science & AI",
    score: "GUJCET 94.5 Percentile",
    status: "Under Review",
    submittedAt: "2024-09-12 14:32",
  },
  {
    id: "adm-102",
    candidateName: "Kunal Varma",
    email: "kunal.v@outlook.com",
    phone: "+91 9825123456",
    course: "M.Tech Data Science & AI",
    score: "GATE Score 640",
    status: "Accepted",
    submittedAt: "2024-09-10 11:15",
  },
];

const SEED_INQUIRIES: ContactInquiry[] = [
  {
    id: "inq-501",
    name: "Rohan Trivedi",
    email: "rohan@yahoo.com",
    phone: "+91 9426011223",
    department: "Examination / Transcript Cell",
    message: "Requesting provisional migration certificate and degree verification for overseas university application.",
    status: "In Progress",
    submittedAt: "2024-09-14 09:40",
  },
  {
    id: "inq-502",
    name: "Dr. Meena Shah (Parent)",
    email: "meena.shah@health.gov.in",
    department: "Hostel & Welfare Cell",
    message: "Query regarding girls hostel allotment schedule and mess facility timings.",
    status: "Resolved",
    submittedAt: "2024-09-08 16:20",
  },
];

const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Summer 2024 Exam Results Live",
    description: "Results for B.Tech Sem 4 and Sem 6 regular sessions declared. Verification portal active.",
    type: "urgent",
    date: "August 24, 2024",
    link: "/results",
    active: true,
  },
  {
    id: "ann-2",
    title: "Winter 2024 Exam Registration Window",
    description: "Last date to fill examination forms without late fee is November 15, 2024.",
    type: "academic",
    date: "September 05, 2024",
    link: "/results",
    active: true,
  },
  {
    id: "ann-3",
    title: "National Smart India Hackathon Shortlist",
    description: "12 university innovation teams shortlisted for Grand Finale across AI and Robotics tracks.",
    type: "event",
    date: "September 11, 2024",
    link: "/innovation",
    active: true,
  },
];

// HELPER: Simulated network latency
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

// INITIALIZATION
const initStorage = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(SEED_RESULTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(SEED_BOOKS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(SEED_ADMISSIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SEED_INQUIRIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(SEED_ANNOUNCEMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify([]));
  }
};

// AUTO RUN ON IMPORT
initStorage();

// UTILITY JSON READ/WRITE
const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

const writeStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
};

// ============================================================
// BACKEND API CLIENT (SERVICE LAYER)
// ============================================================
export const backendApi = {
  // 1. AUTHENTICATION & SESSIONS
  auth: {
    async login(role: "student" | "faculty" | "admin", username: string, password?: string): Promise<{ success: boolean; user?: UserSession; message?: string }> {
      await delay(200);
      initStorage();
      const users = readStorage<UserSession[]>(STORAGE_KEYS.USERS, SEED_USERS);

      const found = users.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.role === role
      );

      if (found) {
        writeStorage(STORAGE_KEYS.SESSION, found);
        return { success: true, user: found };
      }

      // Allow fallback login with demo student roll if not explicitly listed
      if (role === "student" && username.trim().length >= 6) {
        const dynamicUser: UserSession = {
          id: `u-${Date.now()}`,
          username: username.trim(),
          name: `Student (${username.trim()})`,
          role: "student",
          email: `${username.trim()}@atharva.edu.in`,
          rollNo: username.trim(),
          branch: "Engineering & Technology",
          semester: "Semester 6",
        };
        writeStorage(STORAGE_KEYS.SESSION, dynamicUser);
        return { success: true, user: dynamicUser };
      }

      return { success: false, message: "Invalid credentials or role specified." };
    },

    getCurrentUser(): UserSession | null {
      return readStorage<UserSession | null>(STORAGE_KEYS.SESSION, null);
    },

    logout(): void {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    },
  },

  // 2. EXAMINATION RESULTS
  results: {
    async getByRoll(rollNo: string): Promise<StudentResult | null> {
      await delay(180);
      const results = readStorage<StudentResult[]>(STORAGE_KEYS.RESULTS, SEED_RESULTS);
      const cleanRoll = rollNo.trim().toUpperCase();
      return results.find((r) => r.rollNo.toUpperCase() === cleanRoll) || null;
    },

    async getAll(): Promise<StudentResult[]> {
      await delay(100);
      return readStorage<StudentResult[]>(STORAGE_KEYS.RESULTS, SEED_RESULTS);
    },

    async saveResult(result: StudentResult): Promise<{ success: boolean; data: StudentResult }> {
      await delay(150);
      const results = readStorage<StudentResult[]>(STORAGE_KEYS.RESULTS, SEED_RESULTS);
      const index = results.findIndex((r) => r.rollNo.toUpperCase() === result.rollNo.toUpperCase());

      if (index >= 0) {
        results[index] = result;
      } else {
        results.unshift(result);
      }

      writeStorage(STORAGE_KEYS.RESULTS, results);
      return { success: true, data: result };
    },

    async deleteResult(rollNo: string): Promise<boolean> {
      await delay(100);
      const results = readStorage<StudentResult[]>(STORAGE_KEYS.RESULTS, SEED_RESULTS);
      const filtered = results.filter((r) => r.rollNo.toUpperCase() !== rollNo.toUpperCase());
      writeStorage(STORAGE_KEYS.RESULTS, filtered);
      return true;
    },
  },

  // 3. ADMISSION INQUIRIES & APPLICATIONS
  admissions: {
    async submit(data: Omit<AdmissionApplication, "id" | "status" | "submittedAt">): Promise<AdmissionApplication> {
      await delay(180);
      const apps = readStorage<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, SEED_ADMISSIONS);
      const newApp: AdmissionApplication = {
        ...data,
        id: `adm-${Date.now().toString().slice(-4)}`,
        status: "Pending",
        submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      };
      apps.unshift(newApp);
      writeStorage(STORAGE_KEYS.ADMISSIONS, apps);
      return newApp;
    },

    async getAll(): Promise<AdmissionApplication[]> {
      await delay(100);
      return readStorage<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, SEED_ADMISSIONS);
    },

    async updateStatus(id: string, status: AdmissionApplication["status"]): Promise<boolean> {
      await delay(100);
      const apps = readStorage<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, SEED_ADMISSIONS);
      const found = apps.find((a) => a.id === id);
      if (found) {
        found.status = status;
        writeStorage(STORAGE_KEYS.ADMISSIONS, apps);
        return true;
      }
      return false;
    },
  },

  // 4. CONTACT INQUIRIES & GRIEVANCES
  inquiries: {
    async submit(data: Omit<ContactInquiry, "id" | "status" | "submittedAt">): Promise<ContactInquiry> {
      await delay(180);
      const inqs = readStorage<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, SEED_INQUIRIES);
      const newInq: ContactInquiry = {
        ...data,
        id: `inq-${Date.now().toString().slice(-4)}`,
        status: "Open",
        submittedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      };
      inqs.unshift(newInq);
      writeStorage(STORAGE_KEYS.INQUIRIES, inqs);
      return newInq;
    },

    async getAll(): Promise<ContactInquiry[]> {
      await delay(100);
      return readStorage<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, SEED_INQUIRIES);
    },

    async updateStatus(id: string, status: ContactInquiry["status"]): Promise<boolean> {
      await delay(100);
      const inqs = readStorage<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, SEED_INQUIRIES);
      const found = inqs.find((i) => i.id === id);
      if (found) {
        found.status = status;
        writeStorage(STORAGE_KEYS.INQUIRIES, inqs);
        return true;
      }
      return false;
    },
  },

  // 5. LIBRARY CATALOG & BOOK RESERVATION
  library: {
    async getBooks(query = ""): Promise<BookItem[]> {
      await delay(100);
      const books = readStorage<BookItem[]>(STORAGE_KEYS.BOOKS, SEED_BOOKS);
      if (!query.trim()) return books;
      const q = query.toLowerCase();
      return books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.isbn.includes(q)
      );
    },

    async reserveBook(bookId: string, userRoll: string): Promise<{ success: boolean; message: string; remainingCopies?: number }> {
      await delay(180);
      const books = readStorage<BookItem[]>(STORAGE_KEYS.BOOKS, SEED_BOOKS);
      const book = books.find((b) => b.id === bookId);

      if (!book) {
        return { success: false, message: "Book not found in database." };
      }

      if (book.copiesAvailable <= 0) {
        return { success: false, message: "Sorry, all copies of this book are currently checked out." };
      }

      // Decrement available copies
      book.copiesAvailable -= 1;
      writeStorage(STORAGE_KEYS.BOOKS, books);

      // Record reservation
      const reservations = readStorage<BookReservation[]>(STORAGE_KEYS.RESERVATIONS, []);
      reservations.unshift({
        id: `res-${Date.now().toString().slice(-4)}`,
        bookId: book.id,
        bookTitle: book.title,
        userRoll: userRoll || "Guest",
        reservedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
        status: "Active",
      });
      writeStorage(STORAGE_KEYS.RESERVATIONS, reservations);

      return {
        success: true,
        message: `Book "${book.title}" successfully reserved. Collect from Main Counter within 48 hours.`,
        remainingCopies: book.copiesAvailable,
      };
    },

    async getReservations(): Promise<BookReservation[]> {
      await delay(100);
      return readStorage<BookReservation[]>(STORAGE_KEYS.RESERVATIONS, []);
    },
  },

  // 6. ANNOUNCEMENTS & NOTICES
  announcements: {
    async getAll(): Promise<AnnouncementItem[]> {
      await delay(100);
      return readStorage<AnnouncementItem[]>(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
    },

    async create(data: Omit<AnnouncementItem, "id">): Promise<AnnouncementItem> {
      await delay(150);
      const list = readStorage<AnnouncementItem[]>(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
      const newItem: AnnouncementItem = {
        ...data,
        id: `ann-${Date.now().toString().slice(-4)}`,
      };
      list.unshift(newItem);
      writeStorage(STORAGE_KEYS.ANNOUNCEMENTS, list);
      return newItem;
    },

    async delete(id: string): Promise<boolean> {
      await delay(100);
      const list = readStorage<AnnouncementItem[]>(STORAGE_KEYS.ANNOUNCEMENTS, SEED_ANNOUNCEMENTS);
      const filtered = list.filter((a) => a.id !== id);
      writeStorage(STORAGE_KEYS.ANNOUNCEMENTS, filtered);
      return true;
    },
  },

  // 7. SYSTEM DATABASE MAINTENANCE
  system: {
    resetToDemoData(): void {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(SEED_RESULTS));
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(SEED_BOOKS));
      localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(SEED_ADMISSIONS));
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SEED_INQUIRIES));
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(SEED_ANNOUNCEMENTS));
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify([]));
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    },

    getDatabaseStats(): {
      resultsCount: number;
      admissionsCount: number;
      inquiriesCount: number;
      booksCount: number;
      reservationsCount: number;
      announcementsCount: number;
    } {
      return {
        resultsCount: readStorage<any[]>(STORAGE_KEYS.RESULTS, []).length,
        admissionsCount: readStorage<any[]>(STORAGE_KEYS.ADMISSIONS, []).length,
        inquiriesCount: readStorage<any[]>(STORAGE_KEYS.INQUIRIES, []).length,
        booksCount: readStorage<any[]>(STORAGE_KEYS.BOOKS, []).length,
        reservationsCount: readStorage<any[]>(STORAGE_KEYS.RESERVATIONS, []).length,
        announcementsCount: readStorage<any[]>(STORAGE_KEYS.ANNOUNCEMENTS, []).length,
      };
    },
  },
};
