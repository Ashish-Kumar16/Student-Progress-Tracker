# Course Compass Backend

This is the backend for the Course Compass application, built using Node.js and Express. It provides RESTful APIs to support the frontend application.

## Project Structure

```
course-compass-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes                # Contains route definitions
│   │   ├── attendance.js     # Routes for attendance management
│   │   ├── courses.js        # Routes for course management
│   │   ├── grades.js         # Routes for grade management
│   │   ├── students.js       # Routes for student management
│   │   └── index.js          # Main route file that combines all routes
│   ├── controllers           # Contains controller logic for handling requests
│   │   ├── attendanceController.js # Controller for attendance-related requests
│   │   ├── coursesController.js    # Controller for course-related requests
│   │   ├── gradesController.js     # Controller for grade-related requests
│   │   └── studentsController.js   # Controller for student-related requests
│   ├── models                # Contains data models for the application
│   │   ├── attendanceModel.js # Model for attendance records
│   │   ├── courseModel.js     # Model for course data
│   │   ├── gradeModel.js      # Model for grade data
│   │   └── studentModel.js    # Model for student data
│   ├── middlewares           # Contains middleware functions
│   │   └── authMiddleware.js  # Middleware for authentication
│   ├── config                # Configuration files
│   │   └── db.js             # Database connection logic
│   └── utils                 # Utility functions
│       └── helpers.js        # Helper functions for various tasks
├── package.json              # NPM configuration file
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd course-compass-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables.

## Usage

To start the server, run:
```
npm start
```

The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.