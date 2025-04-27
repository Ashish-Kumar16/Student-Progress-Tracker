import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://spt-zqd4.onrender.com/api/assignments";

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch assignments",
      });
    }
  },
);

export const fetchSubmissionById = createAsyncThunk(
  "assignments/fetchSubmissionById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch submission",
      });
    }
  },
);

export const fetchAssignmentById = createAsyncThunk(
  "assignments/fetchAssignmentById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch assignment",
      });
    }
  },
);

export const fetchStudentById = createAsyncThunk(
  "assignments/fetchStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch student",
      });
    }
  },
);

export const createAssignment = createAsyncThunk(
  "assignments/createAssignment",
  async (assignmentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, assignmentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create assignment",
      });
    }
  },
);

export const updateSubmission = createAsyncThunk(
  "assignments/updateSubmission",
  async ({ id, submissionData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/submissions/${id}`,
        submissionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update submission",
      });
    }
  },
);

export const deleteAssignment = createAsyncThunk(
  "assignments/deleteAssignment",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to delete assignment",
      });
    }
  },
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {
    assignments: [],
    submissions: [],
    students: [],
    selectedSubmission: null,
    selectedAssignment: null,
    selectedStudent: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedSubmission: (state, action) => {
      state.selectedSubmission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Submission by ID
      .addCase(fetchSubmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSubmission = action.payload;
        const index = state.submissions.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.submissions[index] = action.payload;
        } else {
          state.submissions.push(action.payload);
        }
      })
      .addCase(fetchSubmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch submission";
      })
      // Fetch Assignment by ID
      .addCase(fetchAssignmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAssignment = action.payload;
        const index = state.assignments.findIndex(
          (a) => a._id === action.payload._id,
        );
        if (index !== -1) {
          state.assignments[index] = action.payload;
        } else {
          state.assignments.push(action.payload);
        }
      })
      .addCase(fetchAssignmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch assignment";
      })
      // Fetch Student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudent = action.payload;
        const index = state.students.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        } else {
          state.students.push(action.payload);
        }
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to fetch student";
      })
      // Create Assignment
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.push(action.payload);
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Submission
      .addCase(updateSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.submissions.findIndex(
          (submission) => submission._id === action.payload._id,
        );
        if (index !== -1) {
          state.submissions[index] = action.payload;
        } else {
          state.submissions.push(action.payload);
        }
        state.selectedSubmission = action.payload;
      })
      .addCase(updateSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to update submission";
      })
      // Delete Assignment
      .addCase(deleteAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload,
        );
        if (state.selectedAssignment?._id === action.payload) {
          state.selectedAssignment = null;
        }
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSubmission } = assignmentsSlice.actions;

export const selectAssignments = (state) => state.assignments.assignments;
export const selectSubmissions = (state) => state.assignments.submissions;
export const selectStudents = (state) => state.assignments.students;
export const selectSelectedSubmission = (state) =>
  state.assignments.selectedSubmission;
export const selectSelectedAssignment = (state) =>
  state.assignments.selectedAssignment;
export const selectSelectedStudent = (state) =>
  state.assignments.selectedStudent;
export const selectAssignmentsLoading = (state) => state.assignments.loading;
export const selectAssignmentsError = (state) => state.assignments.error;

export default assignmentsSlice.reducer;
