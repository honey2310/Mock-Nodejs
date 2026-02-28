# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running on localhost:27017
- Postman (for testing) or any REST client

## 1. Installation

```bash
# Navigate to Backend folder
cd Backend

# Install dependencies
npm install
```

## 2. Configure Environment

Create/Update `.env` file in the Backend folder:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/adminManagerDB
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

## 3. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
MongoDB Connected Successfully
Server running on port 5000
```

## 4. API Testing Quick Reference

### A. Register Admin
```
POST http://localhost:5000/api/admin/register
Content-Type: application/json

{
  "username": "admin1",
  "email": "admin@test.com",
  "password": "Admin@123",
  "confirm_password": "Admin@123",
  "status": true
}
```

### B. Login Admin
```
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "Admin@123"
}
```
Response will include a `token`. Copy this token for next steps.

### C. Create Manager (Use token from login)
```
POST http://localhost:5000/api/manager
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@company.com",
  "salary": "50000",
  "designation": "Manager",
  "phone": "03001234567",
  "status": true
}
```

### D. Get All Managers
```
GET http://localhost:5000/api/manager
Authorization: Bearer <YOUR_TOKEN>
```

### E. Search Managers
```
GET http://localhost:5000/api/manager/search?search=John
Authorization: Bearer <YOUR_TOKEN>
```

### F. Get with Pagination
```
GET http://localhost:5000/api/manager/pagination?page=1&limit=10
Authorization: Bearer <YOUR_TOKEN>
```

### G. Update Manager
```
PUT http://localhost:5000/api/manager/<MANAGER_ID>
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json

{
  "name": "Jane Doe",
  "salary": "60000"
}
```

### H. Delete Manager
```
DELETE http://localhost:5000/api/manager/<MANAGER_ID>
Authorization: Bearer <YOUR_TOKEN>
```

### I. Delete Multiple Managers
```
DELETE http://localhost:5000/api/manager/delete-multiple
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json

{
  "ids": ["ID1", "ID2", "ID3"]
}
```

## 5. Using Postman (Optional)

1. Import `Postman_Collection.json` into Postman
2. Go to first request "Register Admin"
3. Click Send
4. From "Login Admin" response, copy the `token` value
5. In each Manager API request, replace `YOUR_TOKEN_HERE` with the copied token
6. Test all endpoints

## File Structure

```
Backend/
├── server.js                 # Main server file
├── package.json             # Dependencies
├── .env                     # Environment variables
├── API_DOCUMENTATION.md     # Full API documentation
├── QUICK_START.md          # This file
├── Postman_Collection.json  # For Postman testing
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── authModels.js       # Admin schema
│   └── mangerModel.js      # Manager schema
├── controllers/
│   └── authControllers.js  # All business logic
├── middlewares/
│   └── auth.js             # JWT verification
└── routes/
    └── authRoutes.js       # All routes
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### Port Already in Use
- Change PORT in `.env` to another port like 5001
- Or kill the process using port 5000

### Invalid Token Error
- Login again to get a fresh token
- Token expires after 7 days
- Make sure token is in `Authorization: Bearer <token>` format

### Email Already Registered
- Use a different email address that hasn't been used before

## API Response Format

All responses follow this format:

**Success (200/201):**
```json
{
  "success": true,
  "message": "Operation message",
  "data": { /* response data */ }
}
```

**Error (400/401/403/404/500):**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

## Key Features Implemented ✅

✅ Step 1: Admin Registration with email validation & password encryption  
✅ Step 2: Admin Login with JWT token generation  
✅ Step 3: Create Manager (Admin only)  
✅ Step 4: Get All Managers  
✅ Step 5: Delete Manager by ID  
✅ Step 6: Update Manager (PUT)  
✅ Step 7: Search Managers (by name, email, phone)  
✅ Step 8: Pagination Support  
✅ Step 9: Bulk Delete Multiple Managers  

## Security Features

- Passwords encrypted with bcrypt (10 salt rounds)
- JWT token with 7-day expiration
- Email uniqueness validation
- Token-based authentication for manager APIs
- CORS enabled
- Input validation on all endpoints
