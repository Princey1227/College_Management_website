# EduPortal Pro — Enterprise College Management System (ERP)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-22c55e)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **EduPortal Pro** is a modern, responsive, enterprise-grade College & University Management System. Built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, it features role-based access control (RBAC), interactive grade progression analytics, digital marksheet export with QR verification, and a zero-dependency LocalStorage mock REST persistence layer.

---

## 📸 Key Features at a Glance

- 🛡️ **Role-Based Protected Routes (RBAC)**: Secure access walls for `STUDENT`, `FACULTY`, and `ADMIN` personas with automatic redirection and route guard barriers.
- 📊 **Visual Academic Analytics**: Real-time SGPA/CGPA progression curves and subject grade distributions powered by **Recharts** with responsive dark-mode tooltips.
- 🖨️ **Printable E-Marksheet & PDF Generation**: University-compliant statements of marks with tamper-evident digital verification tokens, QR code placeholder, official seal, and signature block formatted for crisp A4 print layout.
- ⚡ **Route-Level Code Splitting**: All pages dynamically loaded on demand with `React.lazy()` and `<Suspense>` wrapped around a custom university-branded loader, slashing the initial bundle footprint.
- 💾 **Mock REST & LocalStorage Persistence Engine**: Fully working client-side mock backend simulating database latency, session tokens, user authentication, admissions inquiry indexing, and library reservations.
- 📚 **Digital Library & Resource Portal**: Searchable catalog with category filtering, real-time availability badges, and one-click book reservations.
- 📝 **Admissions & Eligibility Pipeline**: Interactive admission inquiry submission with auto-indexing, merit calculator, and status tracking.

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       Browser Client                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌───────────────────────────┐ ┌───────────────────────────┐
   │    App.tsx (Suspense)     │ │   Protected Route Guard   │
   │  Code-Split Dynamic Pages │ │   (Role & Token Check)    │
   └────────────┬──────────────┘ └────────────┬──────────────┘
                │                             │
                └──────────────┬──────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│         Mock REST Service Layer (src/services)              │
│  • Auth API (login, logout, session check)                  │
│  • Results & Transcripts API                                │
│  • Library & Reservations API                               │
│  • Admissions & Queries Pipeline API                        │
└──────────────────────────────┬──────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          Persistent Storage Engine (LocalStorage)           │
│  • auth_user        • college_library_books                 │
│  • college_results  • college_admissions_inquiries          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Demo Access Credentials

The application is pre-seeded with sample user accounts across multiple administrative and academic tiers. You can log in using either the credentials below or quick-fill buttons on the login portal:

| Role | Username / ID | Password | Access Rights & Views |
| :--- | :--- | :--- | :--- |
| **Student** | `210010116001` | `student123` | Personal ERP Dashboard, SGPA Progression Analytics, Attendance & Fee Invoices, Marks Statement |
| **Director / Admin** | `ADMIN-DIR-01` | `admin123` | Institutional Administration, Admission Inquiries Pipeline, System Metrics, Staff Directory |
| **Faculty Member** | `FAC-CS-104` | `faculty123` | Faculty Portal, Course Syllabus Management, Student Assessments |

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### 1. Clone the Repository
```bash
git clone https://github.com/Princey1227/College_Management_website.git
cd College_Management_website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Create Production Build
```bash
npm run build
```
Vite will generate production-optimized, code-split bundles inside the `dist/` directory.

### 5. Preview Production Bundle
```bash
npm run preview
```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable Radix UI & Shadcn components (Button, Card, Tabs, etc.)
│   │   ├── Header.tsx             # Responsive global navigation with auth status & quick links
│   │   ├── Footer.tsx             # University footer with contact details & sitemap
│   │   ├── PageLoader.tsx         # Branded loading fallback for React.lazy() Suspense
│   │   └── ProtectedRoute.tsx     # RBAC Route Guard with login redirection
│   ├── pages/
│   │   ├── Index.tsx              # University homepage, news notices, virtual tour & highlights
│   │   ├── Login.tsx              # Unified multi-role authentication portal
│   │   ├── Results.tsx            # Result verification, PDF export & timetable schedules
│   │   ├── StudentDashboard.tsx   # Student portal with Recharts analytics & course tracker
│   │   ├── AdminDashboard.tsx     # Institutional management, inquiries list & admission pipeline
│   │   ├── Academics.tsx          # Curriculum, degree departments & faculty roster
│   │   ├── Library.tsx            # Digital OPAC catalog & reservation workflow
│   │   ├── Admissions.tsx         # Admission intake, eligibility checker & inquiry form
│   │   ├── Innovation.tsx         # Research centers, patent registry & student startups
│   │   ├── Contact.tsx            # Campus directory, helpdesk & interactive inquiry forms
│   │   └── NotFound.tsx           # Branded 404 error page with navigation shortcuts
│   ├── services/
│   │   └── mockBackend.ts         # Mock REST API engine with LocalStorage auto-seeding
│   ├── lib/
│   │   └── utils.ts               # Class merging utilities (clsx & tailwind-merge)
│   ├── App.tsx                    # Code-split routing table with Suspense & ProtectedRoutes
│   ├── main.tsx                   # React root entry point
│   └── index.css                  # Tailwind styles, color tokens & @media print stylesheet
├── public/                        # Static assets & favicon icons
├── tailwind.config.ts             # Tailwind configuration with university brand colors
├── vite.config.ts                 # Vite bundle configuration & alias paths
├── tsconfig.json                  # Strict TypeScript compiler configuration
└── package.json                   # Project metadata and dependencies
```

---

## 📊 Modules & Functional Walkthrough

### 1. Student ERP Portal (`/dashboard/student`)
- **Performance Analytics**: Visualized semester-by-semester SGPA and CGPA trends with interactive tooltips.
- **Subject Grade Breakdown**: Subject-wise credit and score distribution charts.
- **Attendance & Fees**: Track current attendance percentage and upcoming semester fee due dates.

### 2. Administrator Command Console (`/dashboard/admin`)
- **Admission Inquiries Management**: Real-time feed of submitted inquiries with one-click status transitions (`Pending` ➔ `Reviewed` ➔ `Contacted`).
- **Institutional Metrics**: Live counters for total enrollments, active applications, and research publications.

### 3. Examination & Marksheet Verification (`/results`)
- **Instant Roll Lookup**: Search verified marksheets by enrollment number (e.g., `210010116001` or `220020119042`).
- **Official Print & PDF Export**: Clean, high-resolution printable layout stripping away web chrome and presenting university seals, security hashes, and sign-off blocks.

### 4. Digital Library Catalog (`/library`)
- **Real-Time OPAC**: Filter by departments (Computer Science, Electronics, Mechanical, Applied Sciences).
- **Borrow & Reserve**: Reserve copies directly into local storage with automated availability updates.

---

## 🛠️ Technology Stack & Libraries

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing throughout)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with CSS variables
- **Charts & Graphs**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Notifications**: [Sonner Toaster](https://sonner.emilkowal.ski/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

---

## 📈 Production Optimization

- **Chunk Splitting**: Page routes are code-split using dynamic `import()` statements, ensuring fast initial page loads (FP/FCP).
- **Print Stylesheet**: Dedicated `@media print` layout isolates academic credentials and marksheets for standard letter and A4 exports.
- **Clean Fallbacks**: Custom pulse loader prevents layout shifts during asynchronous route chunks resolution.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for educational or commercial purposes.
