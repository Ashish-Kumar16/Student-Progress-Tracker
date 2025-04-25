
import { createSlice } from '@reduxjs/toolkit';
import { mockStudents } from '@/data/mockData';

const initialState = {
  grades: [],
  loading: false,
  error: null,
  selectedGrade: null
};

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    setSelectedGrade: (state, action) => {
      state.selectedGrade = action.payload;
    },
    updateGrade: (state, action) => {
      // In a real app, this would update the grade in the database
      console.log('Grade updated:', action.payload);
    }
  }
});

export const { setSelectedGrade, updateGrade } = gradesSlice.actions;

export default gradesSlice.reducer;
