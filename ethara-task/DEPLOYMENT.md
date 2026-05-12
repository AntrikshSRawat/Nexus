# Railway Deployment Guide

Complete guide to deploy Task Manager application to Railway.

## Prerequisites
- Railway account (free tier available at railway.app)
- GitHub account with your code pushed
- MongoDB Atlas connection string

## Step 1: Prepare Backend for Railway

In `server` directory, ensure:

1. **package.json** has correct start script:
```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

2. **server/src/index.js** uses environment variable for PORT:
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. **.env.example** has all required variables (no actual values):
```
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=7d
NODE_ENV=production
```

4. **.gitignore** excludes .env and node_modules

## Step 2: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Task Manager app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git push -u origin main
```

## Step 3: Deploy Backend to Railway

### Option 1: Using Railway CLI

1. **Install Railway CLI:**
```bash
npm i -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Initialize Railway:**
```bash
cd server
railway init
```

4. **Add environment variables:**
```bash
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_production_secret_key_here
railway variables set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management
railway variables set JWT_EXPIRE=7d
```

5. **Deploy:**
```bash
railway up
```

### Option 2: Using Railway Dashboard

1. **Go to** railway.app
2. **Login** to your account
3. **Create New Project**
4. **Connect GitHub Repository**
5. **Select your repository** and branch (main)
6. **Choose Node.js environment**
7. **Add environment variables:**
   - Click "Variables"
   - Add each variable from .env.example
   - Provide production values

8. **Railway automatically:**
   - Detects Node.js
   - Runs `npm install`
   - Starts with `npm start`
   - Provides public URL

## Step 4: Configure Environment Variables on Railway

In Railway Dashboard for your deployment:

```
PORT = (Leave blank, Railway auto-assigns)
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/task-management
JWT_SECRET = your-very-secure-random-string-here
JWT_EXPIRE = 7d
NODE_ENV = production
```

**Generate secure JWT_SECRET:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Deploy Frontend (Optional)

### Option 1: Separate Railway Project

1. **Create new Railway project**
2. **Connect frontend GitHub** 
3. **Root directory:** /client
4. **Build command:** `npm run build`
5. **Start command:** `npm run preview`

### Option 2: Deploy with Backend

Build frontend and serve from same server:

```bash
# In server directory
npm install express-static-gzip
```

Then update server/src/index.js:
```javascript
import express from 'express';
import path from 'path';

// Serve static frontend
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
```

### Option 3: Deploy to Vercel (Recommended for Frontend)

1. Go to **vercel.com**
2. **Import project** from GitHub
3. **Select client directory**
4. **Build settings:**
   - Build command: `npm run build`
   - Output: `dist`

5. **Environment variables:**
   - `VITE_API_URL=https://your-railway-backend.up.railway.app`

6. **Deploy**

## Step 6: Update Frontend API URL

After backend is deployed, get the Railway URL:

1. Go to Railway dashboard
2. Find your backend project
3. Copy the generated URL (e.g., https://task-api-prod.up.railway.app)

Update frontend .env:
```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

Redeploy frontend.

## Step 7: Test Deployment

1. **Visit frontend URL:** https://your-app.vercel.app (or Railway URL)
2. **Test login:** With demo credentials
3. **Test features:** Create project, create task, update status
4. **Check logs:** Railway dashboard shows real-time logs

## Monitoring & Logs

**View logs on Railway:**
1. Go to Railway dashboard
2. Select your deployment
3. Click "Logs" tab
4. See real-time server logs

**Common issues in logs:**
- MongoDB connection errors
- Missing environment variables
- Port binding failures

## Updating Deployment

**Make changes locally:**
```bash
git add .
git commit -m "Fix: something"
git push
```

Railway automatically redeploys on push to main branch.

## Database Backups

**MongoDB Atlas backups:**
1. Go to MongoDB Atlas dashboard
2. Select cluster
3. Click "Backup" tab
4. Enable automatic daily backups
5. Manual backup available anytime

## Scaling & Performance

**Free Railway tier includes:**
- 5GB bandwidth/month
- 100 hours/month runtime
- Paid plans available for more

**Optimize performance:**
- Add indexes to MongoDB
- Enable caching
- Minify frontend assets
- Use CDN for static files

## Security Checklist

- ✅ JWT_SECRET is strong and random
- ✅ MongoDB password is secure
- ✅ IP whitelist on MongoDB Atlas
- ✅ HTTPS enabled (Railway provides)
- ✅ Environment variables not in code
- ✅ API routes protected with auth
- ✅ CORS configured properly

## Troubleshooting Deployment

### Application Crashes
1. Check Railway logs
2. Verify all env variables are set
3. Test locally with same env vars
4. Check MongoDB connection
5. Look for syntax errors in code

### Port Binding Error
- Railway provides PORT automatically
- Don't hardcode port in code
- Use `process.env.PORT || 5000`

### MongoDB Connection Timeout
- Check connection string format
- Verify IP whitelist includes 0.0.0.0
- Test connection with MongoDB Compass
- Check network connectivity

### Frontend Can't Reach Backend
- Verify VITE_API_URL is correct
- Check CORS is enabled in backend
- Verify backend is running
- Check browser console for errors

## Production Best Practices

1. **Update dependencies regularly:**
```bash
npm update
npm audit
npm audit fix
```

2. **Use secrets manager** for sensitive data

3. **Enable database backups**

4. **Monitor error logs** regularly

5. **Test before deploying** to production

6. **Keep Node.js updated** to latest LTS version

7. **Set up alerts** for downtime

## Cost Estimate

**Free Railway tier:**
- 5 GB bandwidth
- 100 GB storage
- $5/month pricing (pay as you go after free tier)

**MongoDB Atlas:**
- Free tier: 512 MB storage
- Paid tier: $9/month (10 GB storage)

---

## Support

For Railway issues: https://docs.railway.app
For MongoDB issues: https://docs.mongodb.com

**Deployment complete! 🚀**
