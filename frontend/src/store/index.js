import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./slices/studentsSlice";
import coursesReducer from "./slices/coursesSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import gradesReducer from "./slices/gradesSlice";
import authReducer from "./slices/authSlice";
import submissionReducer from "./slices/submissionSlice";


export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    assignments: assignmentsReducer,
    submissions: submissionReducer,
    grades: gradesReducer,
    auth: authReducer,
  },
});
