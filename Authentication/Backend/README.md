# Admin & Manager Authentication API - Complete Implementation

A comprehensive Node.js REST API for Admin authentication and Manager management system with JWT token-based security.

## 📋 Overview

This system implements a complete admin-manager hierarchy with the following features:

### Admin Features
- ✅ Registration with email validation
- ✅ Encrypted password storage (bcrypt)
- ✅ Login with JWT token generation
- ✅ 7-day token expiration

### Manager Features (Protected by Admin Token)
- ✅ Create manager records
- ✅ Read all managers
- ✅ Update manager details
- ✅ Delete individual managers
- ✅ Delete multiple managers in bulk
- ✅ Search by name, email, or phone
- ✅ Pagination support for large datasets

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5.2.1)
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Encryption:** bcrypt
- **Middleware:** CORS, Cookie Parser
- **Environment:** dotenv

---

## 📁 Project Structure

```
Backend/
├── server.js                      # Main Express server
├── package.json                   # Dependencies
├── .env                          # Environment variables
├── API_DOCUMENTATION.md          # Complete API reference
├── QUICK_START.md               # Quick setup guide
├── README.md                     # This file
├── Postman_Collection.json       # Postman import file
│
├── config/
│   └── db.js                    # MongoDB connection setup
│
├── models/
│   ├── authModels.js            # Admin schema
│   └── mangerModel.js           # Manager schema
│
├── controllers/
│   └── authControllers.js       # All business logic
│           ├── registerAdmin()
│           ├── loginAdmin()
│           ├── createManager()
│           ├── getAllManagers()
│           ├── deleteManager()
│           ├── updateManager()
│           ├── searchManagers()
│           ├── getManagersWithPagination()
│           └── deleteMultipleManagers()
│
├── middlewares/
│   └── auth.js                  # JWT verification middleware
│
└── routes/
    └── authRoutes.js            # All API routes
```

---

## 🚀 Installation & Setup

### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

### Step 2: Configure Environment Variables
Create `.env` file in Backend folder:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/adminManagerDB
JWT_SECRET=your_super_secret_jwt_key_change_this
```

### Step 3: Ensure MongoDB is Running
```bash
mongod
```

### Step 4: Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Expected output:
```
MongoDB Connected Successfully
Server running on port 5000
```

---

## 📡 API Endpoints Summary

### Base URL: `http://localhost:5000/api`

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/admin/register` | ❌ | Register new admin |
| 2 | POST | `/admin/login` | ❌ | Login and get JWT token |
| 3 | POST | `/manager` | ✅ | Create manager |
| 4 | GET | `/manager` | ✅ | Get all managers |
| 5 | DELETE | `/manager/:id` | ✅ | Delete single manager |
| 6 | PUT | `/manager/:id` | ✅ | Update manager |
| 7 | GET | `/manager/search` | ✅ | Search managers |
| 8 | GET | `/manager/pagination` | ✅ | Get managers with pagination |
| 9 | DELETE | `/manager/delete-multiple` | ✅ | Delete multiple managers |

**Auth Column:** ✅ = Requires Bearer Token | ❌ = No Authentication

---

## 🔐 Admin Registration

**Endpoint:** `POST /api/admin/register`

**Request:**
```json
{
  "username": "admin1",
  "email": "admin@example.com",
  "password": "Password@123",
  "confirm_password": "Password@123",
  "status": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin1",
    "email": "admin@example.com",
    "status": true,
    "created_date": "2026-02-28T10:30:00.000Z"
  }
}
```

---

## 🔑 Admin Login & Token Generation

**Endpoint:** `POST /api/admin/login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "Password@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "adminId": "507f1f77bcf86cd799439011",
    "username": "admin1",
    "email": "admin@example.com"
  }
}
```

---

## 👥 Manager Operations (All Require Admin Token)

### 1. Create Manager

**Endpoint:** `POST /api/manager`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "salary": "50000",
  "designation": "Senior Manager",
  "phone": "03001234567",
  "status": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Manager created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@company.com",
    "salary": "50000",
    "designation": "Senior Manager",
    "phone": "03001234567",
    "status": true,
    "created_date": "2026-02-28T10:30:00.000Z"
  }
}
```

### 2. Get All Managers

**Endpoint:** `GET /api/manager`

**Response (200):**
```json
{
  "success": true,
  "message": "Managers retrieved successfully",
  "count": 3,
  "data": [...]
}
```

### 3. Search Managers

**Endpoint:** `GET /api/manager/search?search=John`

Examples:
- Search by name: `?search=John`
- Search by email: `?search=john@company.com`
- Search by phone: `?search=03001234567`

### 4. Pagination

**Endpoint:** `GET /api/manager/pagination?page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "message": "Managers retrieved with pagination",
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalRecords": 25,
    "totalPages": 3
  },
  "data": [...]
}
```

### 5. Update Manager

**Endpoint:** `PUT /api/manager/:id`

**Request Body (all fields optional):**
```json
{
  "name": "Jane Doe",
  "salary": "60000",
  "designation": "Director"
}
```

### 6. Delete Single Manager

**Endpoint:** `DELETE /api/manager/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Manager deleted successfully",
  "data": {...}
}
```

### 7. Delete Multiple Managers

**Endpoint:** `DELETE /api/manager/delete-multiple`

**Request Body:**
```json
{
  "ids": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "2 managers deleted successfully",
  "deletedCount": 2
}
```

---

## 🔒 Database Schemas

### Admin Schema
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, encrypted),
  status: Boolean (default: true),
  created_date: String (ISO format),
  updated_date: String (ISO format)
}
```

### Manager Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  salary: String (required),
  designation: String (required),
  phone: String,
  status: Boolean (default: true),
  created_date: String (ISO format),
  updated_date: String (ISO format)
}
```

---

## 🛡️ Security Features

1. **Password Encryption**
   - Uses bcrypt with 10 salt rounds
   - Passwords never stored in plain text

2. **JWT Authentication**
   - Token includes: adminId, email, username
   - 7-day expiration
   - Verified on all manager APIs

3. **Email Validation**
   - Duplicate email prevention
   - Required for both admins and managers

4. **Input Validation**
   - All required fields validated
   - Password confirmation check
   - Email format implicit via MongoDB validation

5. **Error Handling**
   - Comprehensive try-catch blocks
   - Meaningful error messages
   - Proper HTTP status codes

---

## 🧪 Testing with Postman

### Quick Setup:
1. Open Postman
2. Click "Import" → Select `Postman_Collection.json`
3. All 9 endpoints automatically loaded
4. Replace placeholders with actual values

### Testing Flow:
1. Register Admin (Endpoint 1)
2. Login Admin (Endpoint 2) - Copy token
3. Create Managers (Endpoint 3) - Use token in all subsequent requests
4. Test other manager endpoints

---

## 📝 Error Codes

| Code | Status | Message |
|------|--------|---------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST (Create) |
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | No token provided |
| 403 | Forbidden | Invalid/expired token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## 🔧 Middleware

### JWT Verification Middleware (`verifyAdminToken`)
- Extracts token from `Authorization: Bearer <token>` header
- Verifies token signature and expiration
- Sets `req.admin` with decoded admin data
- Blocks invalid/expired tokens

---

## 📚 Documentation Files

1. **API_DOCUMENTATION.md** - Complete API reference with examples
2. **QUICK_START.md** - Fast setup guide
3. **README.md** - This file
4. **Postman_Collection.json** - Ready-to-import Postman requests

---

## 🚨 Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:** 
```bash
# Ensure MongoDB is running
mongod

# Check connection string in .env
MONGODB_URI=mongodb://127.0.0.1:27017/adminManagerDB
```

### Issue: Port 5000 Already in Use
**Solution:** Change port in `.env`:
```
PORT=5001
```

### Issue: Token Expired
**Solution:** Login again to get a new token. Token expires after 7 days.

### Issue: Email Already Registered
**Solution:** Use a different email address.

### Issue: CORS Error
**Solution:** CORS is already enabled in server.js. If issues persist, check browser extensions.

---

## 🔄 Request/Response Flow

```
CLIENT REQUEST
    ↓
Express Middleware (Parse JSON, CORS, etc.)
    ↓
Route Handler (authRoutes.js)
    ↓
[Protected Routes?] → Verify Token (auth.js)
    ↓
Controller Function (authControllers.js)
    ↓
Database Query (MongoDB via Mongoose)
    ↓
Response JSON
    ↓
CLIENT
```

---

## 📊 Database Connection

Uses MongoDB with Mongoose ODM:
- **Connection String:** `mongodb://127.0.0.1:27017/adminManagerDB`
- **Collections:** Admin, Manager
- **Connection:** Automatic on server startup
- **Error Handling:** Logs to console and exits on failure

---

## 🎯 All Steps Implemented ✅

✅ **Step 1:** Admin Registration with validation & encryption
✅ **Step 2:** Admin Login with JWT token
✅ **Step 3:** Create Manager (Admin only)
✅ **Step 4:** Get All Managers
✅ **Step 5:** Delete Manager by ID
✅ **Step 6:** Update Manager (PUT)
✅ **Step 7:** Search Managers
✅ **Step 8:** Pagination
✅ **Step 9:** Bulk Delete

---

## 📞 Support

For any issues or questions:
1. Check API_DOCUMENTATION.md for detailed examples
2. Review QUICK_START.md for setup issues
3. Verify MongoDB is running: `mongod`
4. Check .env file configuration
5. Review console logs for error details

---

## 📄 License

This project is provided as-is for educational and commercial purposes.

---

**Created:** February 28, 2026  
**Last Updated:** February 28, 2026  
**Status:** Production Ready ✅
