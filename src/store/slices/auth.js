import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk("auth/user/profile", async (token, { rejectWithValue }) => {
  try {
    const userProfileReq = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userProfileRes = await userProfileReq.json();

    return userProfileRes.data;
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
