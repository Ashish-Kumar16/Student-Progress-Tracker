import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurable API URL
const API_URL = "https://spt-zqd4.onrender.com/api/submissions";

// Helper for async thunks
const handleAsync = (type, fn) =>
  createAsyncThunk(`submissions/${type}`, async (arg, { rejectWithValue }) => {
    try {
      return await fn(arg);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to ${type.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      return rejectWithValue({
        message,
        status: error.response?.status,
      });
    }
  });

// Async thunks for CRUD operations
export const fetchSubmissions = handleAsync("fetchSubmissions", async () => {
  const { data } = await axios.get(API_URL);
  return data;
});

export const fetchSubmissionById = handleAsync(
  "fetchSubmissionById",
  async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  },
);

export const createSubmission = handleAsync(
  "createSubmission",
  async (submissionData) => {
    const { data } = await axios.post(API_URL, submissionData);
    return data;
  },
);

export const updateSubmission = handleAsync(
  "updateSubmission",
  async ({ id, submissionData }) => {
    const { data } = await axios.put(`${API_URL}/${id}`, submissionData);
    return data;
  },
);

export const deleteSubmission = handleAsync("deleteSubmission", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const initialState = {
  submissions: [],
  currentSubmission: null,
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
};

// Utility to handle async states
const setPending = (state, key) => {
  state.loading[key] = true;
  state.error = null;
};

const setRejected = (state, action, key) => {
  state.loading[key] = false;
  state.error = action.payload.message;
};

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearCurrentSubmission: (state) => {
      state.currentSubmission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all submissions
      .addCase(fetchSubmissions.pending, (state) => setPending(state, "fetch"))
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.submissions = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSubmissions.rejected, (state, action) =>
        setRejected(state, action, "fetch"),
      )
      // Fetch submission by ID
      .addCase(fetchSubmissionById.pending, (state) =>
        setPending(state, "fetch"),
      )
      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.currentSubmission = action.payload;
      })
      .addCase(fetchSubmissionById.rejected, (state, action) =>
        setRejected(state, action, "fetch"),
      )
      // Create submission
      .addCase(createSubmission.pending, (state) => setPending(state, "create"))
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.loading.create = false;
        state.submissions.push(action.payload);
      })
      .addCase(createSubmission.rejected, (state, action) =>
        setRejected(state, action, "create"),
      )
      // Update submission
      .addCase(updateSubmission.pending, (state) => setPending(state, "update"))
      .addCase(updateSubmission.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedSubmission = action.payload;
        const idx = state.submissions.findIndex(
          (sub) => sub._id === updatedSubmission._id,
        );
        if (idx !== -1) {
          state.submissions[idx] = updatedSubmission;
        }
        if (state.currentSubmission?._id === updatedSubmission._id) {
          state.currentSubmission = updatedSubmission;
        }
      })
      .addCase(updateSubmission.rejected, (state, action) =>
        setRejected(state, action, "update"),
      )
      // Delete submission
      .addCase(deleteSubmission.pending, (state) => setPending(state, "delete"))
      .addCase(deleteSubmission.fulfilled, (state, action) => {
        state.loading.delete = false;
        const id = action.payload;
        state.submissions = state.submissions.filter((sub) => sub._id !== id);
        if (state.currentSubmission?._id === id) {
          state.currentSubmission = null;
        }
      })
      .addCase(deleteSubmission.rejected, (state, action) =>
        setRejected(state, action, "delete"),
      );
  },
});

// Export actions
export const { resetError, clearCurrentSubmission } = submissionSlice.actions;

// Export selectors
export const selectSubmissions = (state) => state.submissions.submissions;
export const selectSelectedSubmission = (state) =>
  state.submissions.currentSubmission;
export const selectSubmissionsLoading = (state) => state.submissions.loading;
export const selectSubmissionsError = (state) => state.submissions.error;

export default submissionSlice.reducer;
