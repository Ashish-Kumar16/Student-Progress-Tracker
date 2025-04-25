
import { createSlice } from '@reduxjs/toolkit';
import { mockAssignments, mockSubmissions } from '@/data/mockData';

const initialState = {
  assignments: mockAssignments,
  submissions: mockSubmissions,
  loading: false,
  error: null,
  selectedAssignment: null,
  selectedSubmission: null
};

export const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setSelectedAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
    setSelectedSubmission: (state, action) => {
      state.selectedSubmission = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action) => {
      const index = state.assignments.findIndex(assignment => assignment.id === action.payload.id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(assignment => assignment.id !== action.payload);
    },
    addSubmission: (state, action) => {
      state.submissions.push(action.payload);
    },
    updateSubmission: (state, action) => {
      const index = state.submissions.findIndex(submission => submission.id === action.payload.id);
      if (index !== -1) {
        state.submissions[index] = action.payload;
      }
    },
    deleteSubmission: (state, action) => {
      state.submissions = state.submissions.filter(submission => submission.id !== action.payload);
    }
  }
});

export const { 
  setSelectedAssignment, 
  setSelectedSubmission, 
  addAssignment, 
  updateAssignment, 
  deleteAssignment,
  addSubmission,
  updateSubmission,
  deleteSubmission
} = assignmentsSlice.actions;

export const selectAssignments = (state) => state.assignments.assignments;
export const selectSubmissions = (state) => state.assignments.submissions;
export const selectSelectedAssignment = (state) => state.assignments.selectedAssignment;
export const selectSelectedSubmission = (state) => state.assignments.selectedSubmission;

export default assignmentsSlice.reducer;
