
import { createSlice } from '@reduxjs/toolkit';
import { mockStudents } from '@/data/mockData';

const initialState = {
  students: mockStudents,
  loading: false,
  error: null,
  selectedStudent: null
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    }
  }
});

export const { setSelectedStudent, addStudent, updateStudent, deleteStudent } = studentsSlice.actions;

export const selectStudents = (state) => state.students.students;
export const selectSelectedStudent = (state) => state.students.selectedStudent;

export default studentsSlice.reducer;
