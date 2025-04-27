# Student Progress Tracker

This is the frontend for the Course Compass application, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It provides a modern, responsive interface for managing students, courses, assignments, grades, attendance, and reports.

## Features

- Student, course, assignment, and grade management
- Attendance tracking and reporting
- Submission workflows for assignments
- Dashboard with charts and statistics
- Role-based authentication and protected routes
- Responsive design using Material UI
- Toast notifications for user feedback

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers (e.g., Toast)
│   ├── data/              # Mock data for development
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Top-level route pages
│   ├── store/             # Redux slices and store setup
│   ├── theme/             # Material UI theme customization
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## Environment Variables

No environment variables are required for the frontend by default. If you need to connect to a custom backend, update the API URLs in the Redux slices under `src/store/slices/`.

## Customization

- **Theme:** Edit [`src/theme/materialTheme.js`](src/theme/materialTheme.js) to customize Material UI colors and styles.
- **Mock Data:** Modify [`src/data/mockData.js`](src/data/mockData.js) for demo/testing purposes.

## Folder Overview

- **components/**: Sidebar, navigation, forms, and other UI elements.
- **pages/**: Main app pages (Dashboard, Students, Courses, etc.).
- **store/**: Redux Toolkit slices for state management.
- **context/**: Toast notifications and other context providers.
- **theme/**: Material UI theme configuration.

## License

This project is licensed under the MIT License.

---

For backend setup, see [../backend/README.md](../backend/README.md).