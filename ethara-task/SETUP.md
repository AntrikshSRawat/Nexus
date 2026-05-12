# Setup Instructions

## Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free tier available)
- Git (optional)

## Step 1: MongoDB Setup

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project
4. Create a new cluster (free tier)
5. Create a database user with username and password
6. Add your IP to IP whitelist (or 0.0.0.0 for development)
7. Click "Connect" and copy the connection string
8. Replace `<username>`, `<password>`, and database name

## Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your MongoDB URI
echo "PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/task-management
JWT_SECRET=dev_secret_key_change_in_prod
JWT_EXPIRE=7d
NODE_ENV=development" > .env

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

## Step 3: Frontend Setup

```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start frontend dev server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

## Step 4: Login

1. Open `http://localhost:5173` in your browser
2. Use demo credentials:
   - **Admin:** admin@task.com / password123
   - **Member:** john@task.com / password123

## Step 5: Test Features

### As Admin:
- ✅ Create a new project
- ✅ Create tasks and assign to members
- ✅ View all projects and tasks
- ✅ Update project and task details
- ✅ Delete projects and tasks

### As Member:
- ✅ View assigned projects
- ✅ View assigned tasks
- ✅ Update task status (Todo → In Progress → Done)
- ✅ View dashboard with your task stats

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001

# Or kill process using port
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Failed
- Check connection string in .env
- Verify MongoDB cluster is running
- Check IP whitelist allows your IP
- Try connecting with MongoDB Compass to test

### CORS Errors
- Ensure backend is running on correct port
- Verify VITE_API_URL in frontend .env matches backend URL
- Check CORS middleware is enabled in Express

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

## Development Tips

1. **Use two terminals:** One for backend, one for frontend
2. **Hot reload enabled:** Changes automatically refresh
3. **Check Console:** Browser console shows frontend errors
4. **Check Terminal:** Backend terminal shows server errors
5. **Network Tab:** DevTools shows API requests/responses

## Running in Production

See README.md for Railway deployment instructions.
