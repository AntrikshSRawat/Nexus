# 🚀 Ethera Task Manager

A full-stack project and task management application with role-based access control, built for the Team Task Manager assignment. Features a modern React frontend with an Express.js backend and MongoDB database.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality

- **User Authentication**: Secure signup/login with JWT tokens
- **Role-Based Access Control**: Admin and Member roles with different permissions
- **Project Management**: Create, view, and manage projects
- **Task Management**: Full CRUD operations with kanban board view
- **Dashboard**: Real-time statistics and task overview
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features

- **RESTful APIs**: Well-structured backend endpoints
- **Database Relationships**: Proper data modeling with MongoDB
- **Input Validation**: Server-side validation for all forms
- **Error Handling**: Comprehensive error management
- **Security**: Password hashing, JWT authentication, CORS

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Deployment

- **Railway** - Cloud platform for deployment
- **MongoDB Atlas** - Cloud database service

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas)
- Git

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ethera-task.git
   cd ethera-task
   ```

2. **Install dependencies for both frontend and backend**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install

   # Return to root
   cd ..
   ```

## 🔧 Environment Setup

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### For Production (Railway + MongoDB Atlas)

1. **MongoDB Atlas Setup:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a free cluster
   - Create database user and whitelist IP
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-management`

2. **Railway Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
   JWT_SECRET=your_production_jwt_secret_here
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

## ▶️ Running the Application

### Development Mode

1. **Start MongoDB** (if using local MongoDB)

   ```bash
   mongod
   ```

2. **Start Backend Server**

   ```bash
   cd server
   npm run dev
   ```

   Server runs on `http://localhost:5000`

3. **Start Frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Production Mode

```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint           | Description       | Access |
| ------ | ------------------ | ----------------- | ------ |
| POST   | `/api/auth/signup` | User registration | Public |
| POST   | `/api/auth/login`  | User login        | Public |

### Project Endpoints

| Method | Endpoint            | Description        | Access        |
| ------ | ------------------- | ------------------ | ------------- |
| GET    | `/api/projects`     | Get all projects   | Authenticated |
| POST   | `/api/projects`     | Create new project | Admin only    |
| DELETE | `/api/projects/:id` | Delete project     | Admin only    |

### Task Endpoints

| Method | Endpoint         | Description     | Access                   |
| ------ | ---------------- | --------------- | ------------------------ |
| GET    | `/api/tasks`     | Get all tasks   | Authenticated            |
| POST   | `/api/tasks`     | Create new task | Admin only               |
| PUT    | `/api/tasks/:id` | Update task     | Admin/Member (own tasks) |
| DELETE | `/api/tasks/:id` | Delete task     | Admin only               |

### Request/Response Examples

**Login Request:**

```json
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Create Project:**

```json
POST /api/projects
Authorization: Bearer <jwt_token>
{
  "name": "New Project",
  "description": "Project description"
}
```

## 🚢 Deployment

### Railway Deployment

1. **Connect Repository:**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect the project structure

2. **Environment Variables:**
   - Add all environment variables from `.env` file
   - Use MongoDB Atlas connection string for `MONGODB_URI`

3. **Build Settings:**
   - Build Command: `npm run build` (for client) + `npm start` (for server)
   - Install Command: `npm install`
   - Root Directory: `./server`

4. **Database:**
   - Railway provides PostgreSQL by default
   - For MongoDB, use MongoDB Atlas (external database)

### Live Demo

**Application URL:** [Deployed on Railway](https://your-app-name.railway.app)

**Test Credentials:**

- **Admin:** admin@example.com / admin123
- **Member:** member@example.com / member123

## 📁 Project Structure

```
ethera-task/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Helper functions
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry point
│   ├── package.json
│   └── .env               # Environment variables
├── README.md
└── package.json           # Root package.json (optional)
```

## 🎯 Key Features Implemented

### ✅ Assignment Requirements Met

- [x] **Authentication (Signup/Login)** - JWT-based auth with role management
- [x] **Project & Team Management** - Full CRUD with member assignment
- [x] **Task Creation & Assignment** - Kanban board with status tracking
- [x] **Dashboard** - Statistics, overdue tasks, progress tracking
- [x] **REST APIs + Database** - Express.js + MongoDB with proper relationships
- [x] **Validations & Relationships** - Server-side validation, data integrity
- [x] **Role-Based Access Control** - Admin/Member permissions
- [x] **Railway Deployment** - Live application URL
- [x] **GitHub Repository** - Version controlled codebase
- [x] **README Documentation** - Comprehensive setup guide
- [x] **Demo Video** - Feature walkthrough (2-5 minutes)

### 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with orange/green theme
- **Responsive**: Mobile-friendly design
- **Interactive**: Hover effects, animations, loading states
- **Accessible**: Proper form labels, keyboard navigation
- **Intuitive**: Easy-to-use kanban board and navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the Team Task Manager Assignment**

```bash
cd client
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:5000
```

**Start Frontend:**

```bash
npm run dev
```

App runs on `http://localhost:5173`

---

## 🔐 Demo Credentials

### Admin Account

- **Email:** admin@task.com
- **Password:** password123

### Member Account

- **Email:** john@task.com
- **Password:** password123

---

## 📋 Features

### Authentication

- ✅ User signup with role selection
- ✅ JWT-based login
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Role-based access control

### Admin Features

- ✅ Create/edit/delete projects
- ✅ Create/edit/delete tasks
- ✅ Assign tasks to members
- ✅ Add/remove project members
- ✅ View all tasks and projects

### Member Features

- ✅ View assigned projects
- ✅ View assigned tasks
- ✅ Update task status
- ✅ View dashboard with task statistics

### Dashboard

- Total tasks count
- Completed tasks count
- Pending tasks count
- Overdue tasks count
- Completion rate percentage

---

## 📁 Project Structure

```
Task/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── projects.js
│   │   │   └── tasks.js
│   │   └── index.js
│   ├── seeds/
│   │   └── seedData.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Projects.jsx
    │   │   └── Tasks.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── auth.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.example
    └── .gitignore
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint           | Description                 | Auth |
| ------ | ------------------ | --------------------------- | ---- |
| POST   | `/api/auth/signup` | Create new account          | ❌   |
| POST   | `/api/auth/login`  | Login with email & password | ❌   |

### Projects

| Method | Endpoint                    | Description                | Auth | Role        |
| ------ | --------------------------- | -------------------------- | ---- | ----------- |
| POST   | `/api/projects`             | Create project             | ✅   | Admin       |
| GET    | `/api/projects`             | Get user's projects        | ✅   | All         |
| GET    | `/api/projects/:id`         | Get project details        | ✅   | All         |
| PUT    | `/api/projects/:id`         | Update project             | ✅   | Admin/Owner |
| DELETE | `/api/projects/:id`         | Delete project             | ✅   | Admin       |
| POST   | `/api/projects/:id/members` | Add member to project      | ✅   | Admin/Owner |
| DELETE | `/api/projects/:id/members` | Remove member from project | ✅   | Admin/Owner |

### Tasks

| Method | Endpoint                    | Description         | Auth | Role           |
| ------ | --------------------------- | ------------------- | ---- | -------------- |
| POST   | `/api/tasks`                | Create task         | ✅   | Admin          |
| GET    | `/api/tasks`                | Get user's tasks    | ✅   | All            |
| GET    | `/api/tasks/:id`            | Get task details    | ✅   | All            |
| PUT    | `/api/tasks/:id`            | Update task         | ✅   | Admin/Assignee |
| DELETE | `/api/tasks/:id`            | Delete task         | ✅   | Admin          |
| GET    | `/api/tasks/stats/overview` | Get task statistics | ✅   | All            |

---

## 🗄️ Database Models

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['Admin', 'Member'], default: 'Member'),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Schema

```javascript
{
  name: String (required),
  description: String,
  createdBy: ObjectId (ref: User, required),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema

```javascript
{
  title: String (required),
  description: String,
  projectId: ObjectId (ref: Project, required),
  assignedTo: ObjectId (ref: User, required),
  status: String (enum: ['Todo', 'In Progress', 'Done'], default: 'Todo'),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment on Railway

### Step 1: Prepare Backend

Make sure `.env` is configured:

```env
PORT=5000  # Railway assigns a PORT env var
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
JWT_SECRET=your_production_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
```

### Step 2: Prepare Frontend (Optional)

If hosting frontend separately:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app
```

### Step 3: Deploy Backend to Railway

1. Push code to GitHub
2. Connect GitHub repo to Railway
3. Select `server` directory as root
4. Add environment variables in Railway dashboard
5. Railway auto-detects Node.js and starts with `npm start`

### Step 4: Deploy Frontend (Optional)

**Option A: Build and serve from same server**

```bash
cd server
npm install
npm run build  # if you have a build script
```

**Option B: Deploy to separate Railway project or Vercel**

1. Push frontend to GitHub
2. Connect to Railway/Vercel
3. Build command: `npm run build`
4. Start command: `npm run preview`
5. Set `VITE_API_URL` environment variable

### Step 5: Connect MongoDB Atlas

1. Create MongoDB Atlas account
2. Get connection string
3. Add to Railway environment variables as `MONGODB_URI`

---

## 📝 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Testing the API

### Using cURL

**Signup:**

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "Member"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@task.com",
    "password": "password123"
  }'
```

**Get Projects (with JWT):**

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🛠️ Technology Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend

- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool

---

## 📊 Sample Data

The seed script creates:

- 1 Admin user
- 2 Member users
- 2 Projects
- 4 Tasks with various statuses

Run `npm run seed` in server directory to load sample data.

---

## 🔒 Security Considerations

- ✅ JWT token stored in localStorage
- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ Protected routes with authentication middleware
- ✅ Role-based access control
- ✅ CORS enabled for frontend origin
- ✅ Environment variables for secrets

**⚠️ For Production:**

- Use HTTPS only
- Set secure JWT_SECRET
- Enable CORS only for your domain
- Use secure cookie storage instead of localStorage
- Implement rate limiting
- Add request validation
- Enable HTTPS on MongoDB Atlas

---

## 📞 Troubleshooting

### MongoDB Connection Error

- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure database exists

### CORS Error

- Frontend and backend must be on same origin or CORS enabled
- Check `cors()` middleware in server

### JWT Token Issues

- Clear localStorage and login again
- Check JWT_SECRET matches between requests
- Verify token format: `Bearer TOKEN`

### Build Errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (16+)

---

## 📄 Scripts

### Backend

```bash
npm run dev     # Start development server with nodemon
npm run start   # Start production server
npm run seed    # Seed database with sample data
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm start       # Serve production build
```

---

## 🎯 Next Steps

1. **Setup & Run:**
   - Install dependencies
   - Configure MongoDB
   - Seed database
   - Run backend and frontend

2. **Test the App:**
   - Login with demo credentials
   - Create projects and tasks
   - Update task statuses
   - View dashboard

3. **Deploy:**
   - Push to GitHub
   - Connect to Railway
   - Set environment variables
   - Deploy

---

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 🤝 Support

For issues or questions, check the troubleshooting section or review the code comments.

**Happy Project Managing! 🎉**
