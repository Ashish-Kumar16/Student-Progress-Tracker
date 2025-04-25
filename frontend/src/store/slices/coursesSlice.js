
import { createSlice } from '@reduxjs/toolkit';
import { mockCourses } from '@/data/mockData';

const initialState = {
  courses: mockCourses,
  loading: false,
  error: null,
  selectedCourse: null
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    }
  }
});

export const { setSelectedCourse, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectSelectedCourse = (state) => state.courses.selectedCourse;

export default coursesSlice.reducer;
