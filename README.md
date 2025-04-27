# Course Compass

Course Compass is a full-stack student progress tracking application. It provides a modern, responsive interface for managing students, courses, assignments, grades, attendance, and reports.

---

## Project Structure

```
CourseCompass/
├── backend/    # Node.js/Express REST API (MongoDB)
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend/   # React + Vite + Material UI
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   └── theme/
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md   # (this file)
```

---

## Features

- Student, course, assignment, and grade management
- Attendance tracking and reporting
- Submission workflows for assignments
- Dashboard with charts and statistics
- Role-based authentication and protected routes
- Responsive design using Material UI
- Toast notifications for user feedback

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 1. Backend Setup

1. **Navigate to backend:**

   ```sh
   cd backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` (if exists) or create a `.env` file.
   - Add your MongoDB URI and JWT secret:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 2. Frontend Setup

1. **Navigate to frontend:**

   ```sh
   cd ../frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## API Endpoints (Backend)

- **Attendance**

  - `GET /api/attendance` - Get attendance records
  - `POST /api/attendance` - Post new attendance data

- **Courses**

  - `GET /api/courses` - Get course details
  - `POST /api/courses` - Create a new course

- **Grades**

  - `GET /api/grades` - Retrieve grade information
  - `PUT /api/grades/:id` - Update a grade

- **Students**

  - `GET /api/students` - Get student details
  - `POST /api/students` - Add a new student

- **Assignments**

  - `GET /api/assignments` - Get assignments
  - `POST /api/assignments` - Create assignment

- **Submissions**

  - `GET /api/submissions` - Get submissions
  - `POST /api/submissions` - Create submission

- **Users**
  - `POST /api/users/signup` - Register
  - `POST /api/users/login` - Login
  - `GET /api/users/me` - Get user info (auth required)

---

## Customization

- **Frontend Theme:** Edit [`frontend/src/theme/materialTheme.js`](frontend/src/theme/materialTheme.js)
- **Mock Data:** Edit [`frontend/src/data/mockData.js`](frontend/src/data/mockData.js) and [`backend/src/mockData.js`](backend/src/mockData.js)

---

## Development Scripts

- **Frontend**

  - `npm run dev` – Start dev server
  - `npm run build` – Build for production
  - `npm run lint` – Lint code

- **Backend**
  - `npm run dev` – Start backend with nodemon

---

