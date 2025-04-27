import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/grades";

// Async thunks for CRUD operations
export const fetchGrades = createAsyncThunk(
  "grades/fetchGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch grades");
    }
  },
);

export const createGrade = createAsyncThunk(
  "grades/createGrade",
  async (gradeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, gradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create grade");
    }
  },
);

export const fetchGradeById = createAsyncThunk(
  "grades/fetchGradeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch grade");
    }
  },
);

export const updateGrade = createAsyncThunk(
  "grades/updateGrade",
  async ({ id, gradeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, gradeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update grade");
    }
  },
);

export const deleteGrade = createAsyncThunk(
  "grades/deleteGrade",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete grade");
    }
  },
);

const gradesSlice = createSlice({
  name: "grades",
  initialState: {
    grades: [],
    selectedGrade: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedGrade: (state, action) => {
      state.selectedGrade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all grades
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch grades";
      })
      // Create grade
      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades.push(action.payload);
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create grade";
      })
      // Fetch grade by ID
      .addCase(fetchGradeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGrade = action.payload;
      })
      .addCase(fetchGradeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch grade";
      })
      // Update grade
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.grades.findIndex(
          (grade) => grade._id === action.payload._id,
        );
        if (index !== -1) {
          state.grades[index] = action.payload;
        }
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update grade";
      })
      // Delete grade
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = state.grades.filter(
          (grade) => grade._id !== action.payload,
        );
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete grade";
      });
  },
});

export const { setSelectedGrade } = gradesSlice.actions;

export const selectGrades = (state) => state.grades.grades;
export const selectSelectedGrade = (state) => state.grades.selectedGrade;
export const selectGradesLoading = (state) => state.grades.loading;
export const selectGradesError = (state) => state.grades.error;

export default gradesSlice.reducer;
