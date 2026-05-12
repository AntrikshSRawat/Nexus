# API Documentation

Complete API reference for Task Manager application.

## Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-railway-url.up.railway.app/api`

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Get token from `/auth/login` response.

---

## Auth Endpoints

### Signup
Create a new user account.

```
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "Member"  // "Admin" or "Member"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Member"
  }
}
```

**Errors:**
- `400` - Missing required fields or invalid email
- `400` - Email already exists

---

### Login
Authenticate user and get JWT token.

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@task.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@task.com",
    "role": "Admin"
  }
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

## Projects Endpoints

### Create Project
Create a new project. **Admin only**

```
POST /projects
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "createdBy": "507f1f77bcf86cd799439010",
  "members": ["507f1f77bcf86cd799439010"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Get All Projects
Get projects user is member of. Admins see all projects.

```
GET /projects
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign",
    "description": "Redesign the company website",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439010",
      "name": "Admin User",
      "email": "admin@task.com"
    },
    "members": [
      {
        "_id": "507f1f77bcf86cd799439010",
        "name": "Admin User",
        "email": "admin@task.com",
        "role": "Admin"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Project by ID
Get specific project details.

```
GET /projects/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Website Redesign",
  "description": "Redesign the company website",
  "createdBy": {...},
  "members": [...]
}
```

**Errors:**
- `404` - Project not found

---

### Update Project
Update project details. Admin or project creator only.

```
PUT /projects/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Website Redesign v2",
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Website Redesign v2",
  "description": "Updated description",
  ...
}
```

---

### Delete Project
Delete a project and all associated tasks. **Admin only**

```
DELETE /projects/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "message": "Project deleted"
}
```

---

### Add Project Member
Add a member to project. Admin or project creator only.

```
POST /projects/:id/members
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439012"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "members": [
    {...},
    {...}
  ]
}
```

---

### Remove Project Member
Remove a member from project. Admin or project creator only.

```
DELETE /projects/:id/members
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439012"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "members": [...]
}
```

---

## Tasks Endpoints

### Create Task
Create a new task. **Admin only**

```
POST /tasks
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Design UI mockups",
  "description": "Create mockups for new design",
  "projectId": "507f1f77bcf86cd799439011",
  "assignedTo": "507f1f77bcf86cd799439012",
  "status": "Todo",
  "dueDate": "2024-02-15T00:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "title": "Design UI mockups",
  "description": "Create mockups for new design",
  "projectId": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Website Redesign"
  },
  "assignedTo": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@task.com"
  },
  "status": "Todo",
  "dueDate": "2024-02-15T00:00:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Get All Tasks
Get tasks (members see only assigned, admins see all).

```
GET /tasks
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Design UI mockups",
    "description": "Create mockups for new design",
    "projectId": {...},
    "assignedTo": {...},
    "status": "Todo",
    "dueDate": "2024-02-15T00:00:00Z"
  }
]
```

---

### Get Task by ID
Get specific task details.

```
GET /tasks/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  ...
}
```

---

### Update Task
Update task (members can update assigned tasks, admins can update any).

```
PUT /tasks/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body (Example - Status Update):**
```json
{
  "status": "In Progress"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "status": "In Progress",
  ...
}
```

---

### Delete Task
Delete a task. **Admin only**

```
DELETE /tasks/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "message": "Task deleted"
}
```

---

### Get Task Statistics
Get task statistics (members see their stats, admins see all).

```
GET /tasks/stats/overview
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "total": 10,
  "completed": 4,
  "pending": 5,
  "overdue": 1
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Error Response Format

```json
{
  "message": "Error description"
}
```

Example:
```json
{
  "message": "Not authorized to access this route"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. For production, consider adding:
```bash
npm install express-rate-limit
```

---

## Testing with cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123",
    "role": "Member"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Create Project (with token):**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My Project",
    "description": "Project description"
  }'
```

---

## Development vs Production

**Development:**
- No rate limiting
- Detailed error messages
- CORS allows all origins

**Production:**
- Add rate limiting
- Generic error messages
- CORS restricted to frontend domain
- Enable HTTPS
- Set NODE_ENV=production

---

## See Also

- [Setup Instructions](SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)
- [README](README.md)
