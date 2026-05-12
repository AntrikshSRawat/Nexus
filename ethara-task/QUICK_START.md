# Task Manager - Quick Reference

## 🚀 Quick Start (5 minutes)

### 1. Clone & Navigate
```bash
cd Task
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env with MongoDB URI
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
JWT_SECRET=dev_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
EOF

npm run seed
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup (New Terminal)
```bash
cd client
npm install

# Create .env
cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000
EOF

npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### 4. Login
- **Admin:** admin@task.com / password123
- **Member:** john@task.com / password123

---

## 📁 What Each Folder Contains

### `/server` - Backend API
- `src/models/` - MongoDB schemas (User, Project, Task)
- `src/routes/` - API routes (auth, projects, tasks)
- `src/controllers/` - Business logic
- `src/middleware/` - Authentication & authorization
- `src/config/` - Database connection
- `seeds/` - Sample data
- `package.json` - Dependencies
- `.env.example` - Environment variables template

### `/client` - Frontend React App
- `src/pages/` - Page components (Login, Dashboard, etc.)
- `src/components/` - Reusable components (Sidebar, etc.)
- `src/services/` - API calls
- `src/utils/` - Helper functions
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

---

## 🔑 Key Features

| Feature | Admin | Member |
|---------|-------|--------|
| Create Project | ✅ | ❌ |
| Create Task | ✅ | ❌ |
| View Projects | ✅ | My Projects |
| View Tasks | ✅ | My Tasks |
| Update Status | ✅ | My Tasks |
| Delete Project | ✅ | ❌ |
| Delete Task | ✅ | ❌ |

---

## 🧪 Test Features

### Admin Tasks
1. Go to Projects → Create Project
2. Go to Tasks → Create Task → Assign to member
3. View Dashboard → See all statistics

### Member Tasks
1. Go to Dashboard → See your stats
2. Go to Tasks → Update task status
3. Go to Projects → View assigned projects

---

## 📊 Database Models

**User:** name, email, password (hashed), role
**Project:** name, description, createdBy, members[]
**Task:** title, description, projectId, assignedTo, status, dueDate

---

## 🔗 Important Endpoints

```
POST   /api/auth/signup          - Create account
POST   /api/auth/login           - Login
POST   /api/projects             - Create project (Admin)
GET    /api/projects             - Get projects
POST   /api/tasks                - Create task (Admin)
GET    /api/tasks                - Get tasks
PUT    /api/tasks/:id            - Update task
GET    /api/tasks/stats/overview - Get stats
```

---

## 🛠️ Common Commands

### Backend
```bash
cd server
npm install      # Install dependencies
npm run dev      # Start with auto-reload
npm start        # Start production
npm run seed     # Load sample data
```

### Frontend
```bash
cd client
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| MongoDB error | Check connection string in .env |
| CORS error | Check VITE_API_URL in frontend .env |
| Login fails | Verify MongoDB has seed data |
| Blank page | Check browser console for errors |

---

## 🚀 Deploy to Railway

1. Push code to GitHub
2. Connect GitHub repo to Railway.app
3. Add environment variables
4. Deploy (auto-detected and runs)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed steps.

---

## 📚 Full Documentation

- [README.md](README.md) - Complete project overview
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Railway deployment guide
- [API.md](API.md) - Complete API documentation

---

## 💡 Next Steps

- [ ] Setup MongoDB Atlas account
- [ ] Clone or extract project
- [ ] Run backend setup
- [ ] Run frontend setup
- [ ] Test with demo credentials
- [ ] Create your own project/tasks
- [ ] Deploy to Railway

---

## ✅ Checklist Before Deployment

- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] MongoDB Atlas cluster created
- [ ] Sample data seeded
- [ ] Login works with demo account
- [ ] Can create project (admin)
- [ ] Can view tasks (member)
- [ ] Dashboard loads correctly
- [ ] No errors in console
- [ ] Ready to deploy!

---

## 📞 Need Help?

1. Check [SETUP.md](SETUP.md) Troubleshooting section
2. Verify all environment variables are set
3. Check browser console (F12) for errors
4. Check terminal for backend errors
5. See [README.md](README.md) for full documentation

---

**You're all set! 🎉 Happy managing tasks!**
