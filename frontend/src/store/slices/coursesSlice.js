import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://spt-zqd4.onrender.com/api/courses";

// Async thunks for API calls
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json(); // Parse the response body
      console.log("Parsed API Response (courses):", data); // Log the parsed data
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) throw new Error("Failed to create course");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch course");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) throw new Error("Failed to update course");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete course");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create course
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) => course._id === action.payload._id,
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.selectedCourse?._id === action.payload._id) {
          state.selectedCourse = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload,
        );
        if (state.selectedCourse?._id === action.payload) {
          state.selectedCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = coursesSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectSelectedCourse = (state) => state.courses.selectedCourse;
export const selectLoading = (state) => state.courses.loading;
export const selectError = (state) => state.courses.error;

export default coursesSlice.reducer;
