# 🚀 TodoFlow — Full-Stack Todo Management App

A modern, responsive and secure **Full-Stack Todo Management Application** built with **HTML, CSS, Vanilla JavaScript, Node.js, Express.js, MongoDB and JWT Authentication**.

TodoFlow allows users to create, manage, update, complete and delete their personal tasks through a clean dashboard interface.

---

## 📌 Project Overview

**TodoFlow** is a full-stack task management application designed to provide users with a simple and secure way to manage their daily tasks.

The application includes:

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User-specific Tasks
* Create Task
* View Tasks
* Edit Task
* Delete Task
* Pending / Completed Status
* Completed Task Filtering
* Task Statistics
* Responsive Dashboard
* Mobile Navigation
* Secure User Authorization
* Logout Functionality

Each authenticated user can only access and manage their own tasks.

---

# ✨ Features

## 🔐 Authentication

### Signup

Users can create an account using:

* First Name
* Last Name
* Gender
* Email
* Password

Passwords are securely hashed before being stored in the database using **bcrypt**.

---

### Login

Users can log in using:

* Email
* Password

After successful authentication:

1. Backend verifies the user.
2. Password is checked using bcrypt.
3. JWT token is generated.
4. User information is returned.
5. Token is stored in browser LocalStorage.
6. User is redirected to the dashboard.

---

## 🔑 JWT Authentication

TodoFlow uses **JSON Web Tokens (JWT)** for authentication.

The JWT token is sent with protected API requests using:

```text
Authorization: Bearer <token>
```

The backend authentication middleware verifies the token before allowing access to protected routes.

---

## 🛡️ Authorization

TodoFlow does not only authenticate users — it also checks ownership.

A user can only:

* View their own tasks
* Update their own tasks
* Delete their own tasks

For example, when updating a task, the backend checks both:

```text
Task ID
+
Logged-in User ID
```

This prevents users from modifying another user's tasks.

---

# 📝 Task Management

Users can create tasks containing:

* Task Title
* Description
* Due Date
* Priority
* Status

### Priority

The application supports:

* Low
* Medium
* High

### Status

Tasks can have:

* Pending
* Completed

---

# ✏️ Edit Task

Users can update:

* Task Title
* Description
* Status

Changing the status to:

```text
completed
```

moves the task into the Completed Tasks filter.

---

# 🗑️ Delete Task

Users can delete their own tasks.

Before deletion, the application asks the user for confirmation.

The backend also verifies task ownership before deleting the task.

---

# 📊 Dashboard

The dashboard displays useful task statistics:

| Statistic   | Description                  |
| ----------- | ---------------------------- |
| Total Tasks | Total number of user's tasks |
| Pending     | Tasks that are not completed |
| Completed   | Tasks marked as completed    |

The statistics are automatically updated after task operations.

---

# 🔎 Task Filtering

TodoFlow provides navigation for:

### Dashboard

Displays all tasks.

### My Tasks

Displays the current user's tasks.

### Completed

Displays only tasks whose status is:

```text
completed
```

---

# 📱 Responsive Design

TodoFlow is designed to work across different screen sizes.

### Desktop

The application provides:

* Sidebar navigation
* Dashboard header
* User profile
* Statistics cards
* Task management section

### Mobile

The application provides:

* Responsive layout
* Mobile sidebar toggle
* Mobile navigation
* Mobile logout button
* Responsive task cards
* Mobile-friendly task forms

---

# 👤 User Profile

After login, the dashboard displays the authenticated user's:

```text
First Name + Last Name
```

The user's first-name initial is also used for the profile avatar.

---

# 🧰 Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Vanilla JavaScript
* Fetch API
* LocalStorage

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JSON Web Token (JWT)
* bcrypt / bcryptjs
* Authentication Middleware
* User Authorization

---

# 📂 Project Structure

```text
todo-app/
│
├── frontend/
│   │
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   │
│   ├── login.js
│   ├── signup.js
│   ├── dashboard.js
│   │
│   ├── login.css
│   ├── signup.css
│   └── dashboard.css
│
├── middleware/
│   └── authmiddleware.js
│
├── models/
│   ├── usermodel.js
│   └── taskmodel.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> Folder and file names may vary slightly depending on the final project structure.

---

# 🔄 Application Flow

The basic application flow is:

```text
User
  ↓
Signup
  ↓
Login
  ↓
JWT Token Generated
  ↓
Token Stored in LocalStorage
  ↓
Dashboard
  ↓
Protected API Requests
  ↓
Authentication Middleware
  ↓
MongoDB
  ↓
Tasks Returned
  ↓
Dashboard Updated
```

---

# 🔐 Authentication Flow

```text
Login Request
      ↓
Express Server
      ↓
Find User by Email
      ↓
Compare Password
      ↓
Generate JWT
      ↓
Send Token to Frontend
      ↓
Store Token in LocalStorage
      ↓
Access Protected Routes
```

---

# 🔌 API Endpoints

## Authentication

### Signup

```http
POST /sign-up
```

Creates a new user account.

---

### Login

```http
POST /api/login
```

Authenticates the user and returns a JWT token.

---

# 📋 Task APIs

### Get Tasks

```http
GET /get-task
```

Returns tasks belonging to the authenticated user.

Requires:

```text
Authorization: Bearer <token>
```

---

### Create Task

```http
POST /create-task
```

Creates a new task for the authenticated user.

Requires JWT authentication.

---

### Update Task

```http
PUT /update-task/:id
```

Updates a task owned by the authenticated user.

Supports:

* Title
* Description
* Status

---

### Delete Task

```http
DELETE /delete-task/:id
```

Deletes a task owned by the authenticated user.

---

# 🗄️ Database

TodoFlow uses **MongoDB** as its database.

Mongoose is used to create schemas and communicate with MongoDB.

### User

The user model contains information such as:

```text
_id
firstname
lastname
gender
email
password
createAt
```

Passwords are stored as hashed values rather than plain text.

---

### Task

Tasks contain information such as:

```text
_id
title
description
duedate
priority
status
userId
```

The `userId` connects each task with its owner.

---

# 🛡️ Security

Several security practices are implemented:

### Password Hashing

User passwords are hashed using bcrypt before database storage.

### JWT Authentication

Protected routes require a valid JWT token.

### Ownership Validation

Users cannot update or delete tasks belonging to another user.

### Environment Variables

Sensitive configuration such as:

```text
MongoDB URI
JWT Secret
```

should be stored inside `.env`.

The `.env` file should never be committed to GitHub.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Then enter the project directory:

```bash
cd todo-app
```

---

## 2. Install Dependencies

Run:

```bash
npm install
```

---

## 3. Create Environment Variables

Create a:

```text
.env
```

file in the backend root directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not upload your actual `.env` file to GitHub.

---

# ▶️ Run the Backend

If using nodemon:

```bash
npm run dev
```

Or:

```bash
node server.js
```

The backend will run on your configured localhost port.

Example:

```text
http://localhost:5000
```

---

# 🌐 Run the Frontend

Open the frontend using:

* VS Code Live Server
* Local development server
* Or another static web server

Then open:

```text
login.html
```

---

# 🧪 Testing

The following functionality has been tested:

* Signup
* Login
* JWT authentication
* Dashboard access
* Create Task
* Get Tasks
* Edit Task
* Update Status
* Delete Task
* Completed Task filtering
* Logout
* User-specific task access
* Responsive mobile layout
* Desktop layout

---

# 📱 Responsive Experience

TodoFlow provides a responsive experience for:

```text
💻 Desktop
💻 Laptop
📱 Tablet
📱 Mobile
```

The mobile interface includes a dedicated navigation toggle for accessing:

* Dashboard
* My Tasks
* Completed Tasks

---

# 🎯 Learning Outcomes

This project demonstrates practical understanding of:

* REST APIs
* Express.js
* MongoDB
* Mongoose
* CRUD Operations
* JWT Authentication
* Middleware
* Authorization
* Password Hashing
* Fetch API
* LocalStorage
* Async/Await
* Frontend/Backend Integration
* Responsive Web Design
* API Error Handling
* User-specific data handling

---

# 🚀 Future Improvements

Possible future improvements include:

* Forgot Password
* OTP Verification
* Email Notifications
* Task Search
* Advanced Filtering
* Task Sorting
* Pagination
* Task Categories
* Dark Mode
* Profile Settings
* Task Reminders
* Deployment
* Production-level validation
* Better error handling
* Refresh Tokens

---

# 📸 Screenshots

Screenshots of the application can be added here.

Example:

```text
screenshots/
├── login.png
├── signup.png
├── dashboard.png
├── create-task.png
└── mobile-view.png
```

Then they can be displayed using:

```markdown
![Login Page](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)

![Mobile View](screenshots/mobile-view.png)
```

---

# 👨‍💻 Developer

**Ahmed Raza**

Full-Stack Development Learner

### Technologies

```text
HTML
CSS
JavaScript
Node.js
Express.js
MongoDB
Mongoose
JWT
Git
GitHub
```

---

# ⭐ Project Status

```text
Development        ✅ Complete
Authentication     ✅ Complete
CRUD Operations    ✅ Complete
Authorization      ✅ Complete
Responsive UI      ✅ Complete
Testing            ✅ Complete
Deployment         ⏳ Pending
```

---

# 📄 License

This project was created for learning, practice and portfolio purposes.

---

## ⭐ If you found this project useful

Feel free to explore the code, learn from it and improve it further.

**Built with ❤️ using Node.js, Express.js, MongoDB and Vanilla JavaScript.**
