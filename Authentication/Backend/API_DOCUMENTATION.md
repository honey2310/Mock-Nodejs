# Admin & Manager Authentication API Documentation

## Overview
This API provides Admin registration, login with JWT token generation, and complete Manager CRUD operations with advanced features like search, pagination, and bulk delete.

## Base URL
```
http://localhost:5000/api
```

---

## ADMIN ENDPOINTS

### 1. Register Admin
**Endpoint:** `POST /admin/register`  
**Authentication:** None

**Request Body:**
```json
{
  "username": "admin_name",
  "email": "admin@example.com",
  "password": "password123",
  "confirm_password": "password123",
  "status": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "id": "60d5ec49c1234567890abc",
    "username": "admin_name",
    "email": "admin@example.com",
    "status": true,
    "created_date": "2026-02-28T10:30:00.000Z"
  }
}
```

---

### 2. Login Admin (Get JWT Token)
**Endpoint:** `POST /admin/login`  
**Authentication:** None

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "adminId": "60d5ec49c1234567890abc",
    "username": "admin_name",
    "email": "admin@example.com"
  }
}
```

**Token Usage:**
Include the token in all subsequent requests in the Authorization header:
```
Authorization: Bearer <your_token_here>
```

---

## MANAGER ENDPOINTS (All require Admin Token)

### 3. Create Manager
**Endpoint:** `POST /manager`  
**Authentication:** Bearer Token (Required)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
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
    "id": "60d5ec49c1234567890abc",
    "name": "John Doe",
    "email": "john@example.com",
    "salary": "50000",
    "designation": "Senior Manager",
    "phone": "03001234567",
    "status": true,
    "created_date": "2026-02-28T10:30:00.000Z"
  }
}
```

---

### 4. Get All Managers
**Endpoint:** `GET /manager`  
**Authentication:** Bearer Token (Required)

**Response (200):**
```json
{
  "success": true,
  "message": "Managers retrieved successfully",
  "count": 5,
  "data": [
    {
      "_id": "60d5ec49c1234567890abc",
      "name": "John Doe",
      "email": "john@example.com",
      "salary": "50000",
      "designation": "Senior Manager",
      "phone": "03001234567",
      "status": true,
      "created_date": "2026-02-28T10:30:00.000Z",
      "updated_date": "2026-02-28T10:30:00.000Z"
    }
  ]
}
```

---

### 5. Delete Manager by ID
**Endpoint:** `DELETE /manager/:id`  
**Authentication:** Bearer Token (Required)

**URL Example:**
```
DELETE /manager/60d5ec49c1234567890abc
```

**Response (200):**
```json
{
  "success": true,
  "message": "Manager deleted successfully",
  "data": {
    "_id": "60d5ec49c1234567890abc",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 6. Update Manager (PUT)
**Endpoint:** `PUT /manager/:id`  
**Authentication:** Bearer Token (Required)

**Request Body (All fields optional):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "salary": "60000",
  "designation": "Director",
  "phone": "03009876543",
  "status": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Manager updated successfully",
  "data": {
    "_id": "60d5ec49c1234567890abc",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "salary": "60000",
    "designation": "Director",
    "phone": "03009876543",
    "status": true,
    "updated_date": "2026-02-28T11:45:00.000Z"
  }
}
```

---

### 7. Search Managers
**Endpoint:** `GET /manager/search?search=<query>`  
**Authentication:** Bearer Token (Required)

**Query Parameters:**
- `search` (required): Search by name, email, or phone

**URL Examples:**
```
GET /manager/search?search=John
GET /manager/search?search=john@example.com
GET /manager/search?search=03001234567
```

**Response (200):**
```json
{
  "success": true,
  "message": "Search results",
  "count": 2,
  "data": [
    {
      "_id": "60d5ec49c1234567890abc",
      "name": "John Doe",
      "email": "john@example.com",
      "salary": "50000",
      "designation": "Senior Manager",
      "phone": "03001234567",
      "status": true
    }
  ]
}
```

---

### 8. Get Managers with Pagination
**Endpoint:** `GET /manager/pagination?page=1&limit=10`  
**Authentication:** Bearer Token (Required)

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Records per page

**URL Example:**
```
GET /manager/pagination?page=2&limit=5
```

**Response (200):**
```json
{
  "success": true,
  "message": "Managers retrieved with pagination",
  "pagination": {
    "currentPage": 2,
    "limit": 5,
    "totalRecords": 25,
    "totalPages": 5
  },
  "data": [
    {
      "_id": "60d5ec49c1234567890abc",
      "name": "John Doe",
      "email": "john@example.com",
      "salary": "50000",
      "designation": "Senior Manager",
      "phone": "03001234567",
      "status": true
    }
  ]
}
```

---

### 9. Delete Multiple Managers
**Endpoint:** `DELETE /manager/delete-multiple`  
**Authentication:** Bearer Token (Required)

**Request Body:**
```json
{
  "ids": [
    "60d5ec49c1234567890abc",
    "60d5ec49c1234567890def",
    "60d5ec49c1234567890ghi"
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "3 managers deleted successfully",
  "deletedCount": 3
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Token not provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Invalid token",
  "error": "jwt expired"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Manager not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "error details"
}
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the Backend folder:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/adminManagerDB
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Ensure MongoDB is Running
```bash
mongod
```

### 4. Start the Server
```bash
npm run dev
```
or
```bash
npm start
```

The server will run on `http://localhost:5000`

---

## Testing Workflow

### 1. Register an Admin
```bash
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

### 2. Login and Get Token
```bash
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "Admin@123"
}
```

### 3. Copy the token from response and use it in Manager APIs
```bash
Authorization: Bearer <your_jwt_token>
```

### 4. Create a Manager
```bash
POST http://localhost:5000/api/manager
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Alice Manager",
  "email": "alice@company.com",
  "salary": "75000",
  "designation": "Project Manager",
  "phone": "03331234567",
  "status": true
}
```

### 5. Test Other Endpoints
- Get all managers: `GET /api/manager`
- Search: `GET /api/manager/search?search=Alice`
- Pagination: `GET /api/manager/pagination?page=1&limit=5`
- Update: `PUT /api/manager/:id` with updated fields
- Delete: `DELETE /api/manager/:id`
- Bulk Delete: `DELETE /api/manager/delete-multiple` with array of IDs

---

## Key Features

✅ Admin registration with email validation and password encryption (bcrypt)  
✅ JWT token-based authentication (7-day expiration)  
✅ Manager CRUD operations (Create, Read, Update, Delete)  
✅ Advanced search by name, email, or phone  
✅ Pagination support for large datasets  
✅ Bulk delete multiple managers  
✅ Token verification middleware for protected routes  
✅ Comprehensive error handling  
✅ Timestamps for all records (created_date, updated_date)  

---

## Security Considerations

- Passwords are encrypted using bcrypt with salt rounds of 10
- JWT tokens expire after 7 days
- Token validation is required for all manager-related APIs
- Email uniqueness is enforced for both admins and managers
- All inputs are validated before processing
- CORS is enabled for cross-origin requests
