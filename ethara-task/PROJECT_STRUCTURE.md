# Project Structure Overview

## Complete File Tree

```
Task/
│
├── 📄 README.md                 # Main documentation (start here!)
├── 📄 QUICK_START.md            # 5-minute quick start guide
├── 📄 SETUP.md                  # Detailed setup instructions
├── 📄 DEPLOYMENT.md             # Railway deployment guide
├── 📄 API.md                    # Complete API reference
├── 📄 .gitignore                # Git ignore file
│
├── server/                      # ⚙️ BACKEND (Node.js + Express)
│   │
│   ├── 📄 package.json          # Backend dependencies
│   ├── 📄 .env.example          # Environment variables template
│   ├── 📄 .gitignore            # Backend git ignore
│   │
│   ├── src/
│   │   ├── 📄 index.js          # Main server file
│   │   │
│   │   ├── config/
│   │   │   └── 📄 db.js         # MongoDB connection
│   │   │
│   │   ├── models/              # Database Schemas
│   │   │   ├── 📄 User.js       # User model with password hashing
│   │   │   ├── 📄 Project.js    # Project model with members
│   │   │   └── 📄 Task.js       # Task model with status
│   │   │
│   │   ├── controllers/         # Business Logic
│   │   │   ├── 📄 authController.js      # Login/Signup
│   │   │   ├── 📄 projectController.js   # Project CRUD
│   │   │   └── 📄 taskController.js      # Task CRUD & Stats
│   │   │
│   │   ├── routes/              # API Routes
│   │   │   ├── 📄 auth.js       # /api/auth routes
│   │   │   ├── 📄 projects.js   # /api/projects routes
│   │   │   └── 📄 tasks.js      # /api/tasks routes
│   │   │
│   │   └── middleware/          # Middleware Functions
│   │       └── 📄 auth.js       # JWT & Role-based auth
│   │
│   └── seeds/                   # Sample Data
│       └── 📄 seedData.js       # Seed script with demo users
│
└── client/                      # 🎨 FRONTEND (React + Vite)
    │
    ├── 📄 package.json          # Frontend dependencies
    ├── 📄 index.html            # HTML entry point
    ├── 📄 vite.config.js        # Vite configuration
    ├── 📄 tailwind.config.js    # Tailwind CSS config
    ├── 📄 postcss.config.js     # PostCSS config
    ├── 📄 .env.example          # Environment variables
    ├── 📄 .gitignore            # Frontend git ignore
    │
    ├── public/                  # Static assets
    │
    └── src/
        ├── 📄 main.jsx          # React entry point
        ├── 📄 App.jsx           # Main App component with routing
        ├── 📄 index.css         # Global styles + Tailwind
        │
        ├── pages/               # Page Components
        │   ├── 📄 Login.jsx          # Login page
        │   ├── 📄 Signup.jsx         # Signup page
        │   ├── 📄 Dashboard.jsx      # Dashboard with stats
        │   ├── 📄 Projects.jsx       # Projects list & create
        │   └── 📄 Tasks.jsx          # Tasks list with filters
        │
        ├── components/          # Reusable Components
        │   ├── 📄 Sidebar.jsx       # Navigation sidebar
        │   └── 📄 PrivateRoute.jsx  # Protected routes
        │
        ├── services/            # API Integration
        │   └── 📄 api.js        # Axios instance & API calls
        │
        └── utils/               # Utility Functions
            ├── 📄 auth.js       # Token & user management
            └── 📄 helpers.js    # Date formatting, status colors
```

---

## 📊 Data Flow

### Authentication Flow
```
User Input (Email, Password)
         ↓
Login Component
         ↓
api.js (axios POST)
         ↓
Server: /api/auth/login
         ↓
authController: compare passwords
         ↓
Generate JWT Token
         ↓
Return token to frontend
         ↓
localStorage.setItem('token')
         ↓
Redirect to Dashboard
```

### API Request Flow
```
React Component
         ↓
services/api.js (with JWT interceptor)
         ↓
Axios POST/GET/PUT/DELETE
         ↓
Server Route
         ↓
Middleware: auth.js (verify JWT)
         ↓
Controller (business logic)
         ↓
Models (database queries)
         ↓
MongoDB
         ↓
Response to frontend
         ↓
Component updates state
         ↓
UI re-renders
```

---

## 🔄 Component Architecture

### Pages (Main Views)
```
App.jsx (Router)
├── Login.jsx
├── Signup.jsx
└── Dashboard.jsx (with Sidebar)
    ├── Projects.jsx
    ├── Tasks.jsx
    └── Sidebar.jsx
        ├── Navigation Links
        ├── User Info
        └── Logout Button
```

### Component Relationships
```
App.jsx
├── Routes
│   ├── /login → Login.jsx
│   ├── /signup → Signup.jsx
│   ├── /dashboard → PrivateRoute → Dashboard.jsx
│   │                                    └── Sidebar.jsx
│   ├── /projects → PrivateRoute → Projects.jsx
│   │                                   └── Sidebar.jsx
│   └── /tasks → PrivateRoute → Tasks.jsx
│                                   └── Sidebar.jsx
└── PrivateRoute.jsx (protects routes)
```

---

## 🗄️ Database Structure

### Collections (Tables)

**users**
```
_id: ObjectId
name: String
email: String (unique)
password: String (hashed)
role: String (Admin | Member)
createdAt: Date
updatedAt: Date
```

**projects**
```
_id: ObjectId
name: String
description: String
createdBy: ObjectId → users._id
members: [ObjectId] → users._id
createdAt: Date
updatedAt: Date
```

**tasks**
```
_id: ObjectId
title: String
description: String
projectId: ObjectId → projects._id
assignedTo: ObjectId → users._id
status: String (Todo | In Progress | Done)
dueDate: Date
createdAt: Date
updatedAt: Date
```

---

## 🔐 Authentication Flow

### JWT Token Structure
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "id": "user_id", "role": "Admin", "iat": 1234567890, "exp": 1234654290 }
Signature: HMACSHA256(base64(header) + "." + base64(payload), SECRET)
```

### Protected Route Middleware
```javascript
middleware/auth.js
├── protect() - Verify JWT token exists & is valid
└── authorize(...roles) - Check if user has required role
```

---

## 🚀 Deployment Architecture

### Local Development
```
Browser (localhost:5173)
    ↓
React Dev Server (Vite)
    ↓
Backend API (localhost:5000)
    ↓
MongoDB Atlas
```

### Production (Railway)
```
Browser
    ↓
Railway Frontend (Vercel/Railway)
    ↓
Railway Backend
    ↓
MongoDB Atlas
```

---

## 📋 File Purposes

### Server Files

| File | Purpose |
|------|---------|
| `index.js` | Express server setup, routes mounting |
| `config/db.js` | MongoDB connection function |
| `models/*.js` | Mongoose schemas with validation |
| `controllers/*.js` | Business logic & database operations |
| `routes/*.js` | REST API endpoint definitions |
| `middleware/auth.js` | JWT verification & role checking |
| `seeds/seedData.js` | Sample data creation |

### Client Files

| File | Purpose |
|------|---------|
| `main.jsx` | React app initialization |
| `App.jsx` | Router configuration |
| `index.css` | Global styles + Tailwind imports |
| `pages/*.jsx` | Full-page components |
| `components/*.jsx` | Reusable UI components |
| `services/api.js` | API calls & axios instance |
| `utils/auth.js` | Token/user storage functions |
| `utils/helpers.js` | Date/status formatting |

---

## 🔌 API Endpoints Summary

### Authentication
```
POST   /api/auth/signup          Public
POST   /api/auth/login           Public
```

### Projects
```
POST   /api/projects             Admin only
GET    /api/projects             Authenticated
GET    /api/projects/:id         Authenticated
PUT    /api/projects/:id         Admin/Owner
DELETE /api/projects/:id         Admin only
POST   /api/projects/:id/members Admin/Owner
DELETE /api/projects/:id/members Admin/Owner
```

### Tasks
```
POST   /api/tasks                    Admin only
GET    /api/tasks                    Authenticated
GET    /api/tasks/:id                Authenticated
PUT    /api/tasks/:id                Admin/Assignee
DELETE /api/tasks/:id                Admin only
GET    /api/tasks/stats/overview     Authenticated
```

---

## 🔄 State Management Pattern

### Backend (Server-side)
- No Redux needed
- Data stored in MongoDB
- Stateless API

### Frontend (Client-side)
- React useState for component state
- localStorage for persistent auth
- No external state management library (kept minimal)

---

## 🎨 Styling Architecture

### Tailwind CSS Setup
```
postcss.config.js → Runs PostCSS plugins
tailwind.config.js → Tailwind configuration
index.css → @tailwind directives
    ↓
Compiled to global styles
    ↓
Applied to all components
```

### Color Scheme
- **Primary:** Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Danger:** Red (#ef4444)
- **Warning:** Yellow (#f59e0b)
- **Neutral:** Gray (#6b7280)

---

## 📦 Dependencies Overview

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT tokens
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **tailwindcss** - CSS utility framework
- **vite** - Build tool

---

## 🔄 Development Workflow

```
1. Edit code in local editor
2. Hot-reload detects changes
3. Component/module re-compiles
4. Browser auto-refreshes
5. See changes immediately
6. Commit & push to GitHub
7. Railway auto-deploys
```

---

## ✅ Verification Checklist

- [x] All files created
- [x] Folder structure complete
- [x] Backend models configured
- [x] API routes implemented
- [x] Authentication working
- [x] Frontend pages created
- [x] Styling with Tailwind
- [x] Protected routes working
- [x] Seeding script ready
- [x] Documentation complete
- [x] Ready for production

---

**Now you have a complete, production-ready application! 🎉**
