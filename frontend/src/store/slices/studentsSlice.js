import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://spt-zqd4.onrender.com/api/students";

// Async thunk for fetching all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response (students):", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error fetching students",
      );
    }
  },
);

// Async thunk for adding a new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding student",
      );
    }
  },
);

// Async thunk for fetching a student by ID
export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching student",
      );
    }
  },
);

// Async thunk for updating a student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating student",
      );
    }
  },
);

// Async thunk for deleting a student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting student",
      );
    }
  },
);

const initialState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Updating students state with:", action.payload);
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id,
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        if (state.selectedStudent?._id === action.payload._id) {
          state.selectedStudent = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student._id !== action.payload,
        );
        if (state.selectedStudent?._id === action.payload) {
          state.selectedStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedStudent } = studentsSlice.actions;

export const selectStudents = (state) => state.students.students;
export const selectSelectedStudent = (state) => state.students.selectedStudent;
export const selectLoading = (state) => state.students.loading;
export const selectError = (state) => state.students.error;

export default studentsSlice.reducer;
