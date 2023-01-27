import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async (token, { rejectWithValue }) => {
  try {
    const usersReq = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const usersRes = await usersReq.json();

    if (usersReq.status === 404) return rejectWithValue(404);

    return usersRes.data;
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.length = 0;

      state.push(...action.payload);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      if (action.payload === 404) {
        state = [];
      } else {
        toast.error(`${action.payload}!`);
      }
    });
  },
});

export default usersSlice.reducer;
