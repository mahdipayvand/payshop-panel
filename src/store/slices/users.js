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

export const deleteUser = createAsyncThunk("user/delete", async ({ userID, token }, { rejectWithValue }) => {
  try {
    const userReq = await fetch(`${import.meta.env.VITE_API_URL}/user/${userID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return userReq.status === 200 ? userID : rejectWithValue("مشکلی پیش اومد");
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

export const createUser = createAsyncThunk(
  "user/create",
  async ({ firstName, lastName, email, password, token }, { rejectWithValue }) => {
    try {
      const userReq = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const userRes = await userReq.json();

      if (userReq.status === 400) return rejectWithValue("نام، نام خانوادگی، ایمیل یا رمز عبور رو وارد نکردی");
      if (userReq.status === 409) return rejectWithValue("کاربری با این ایمیل وجود داره");

      return userRes.data;
    } catch (_) {
      return rejectWithValue("مشکلی پیش اومد");
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.length = 0;

      state.push(...action.payload);
    });
    builder.addCase(fetchUsers.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const users = state.filter((user) => user.id !== action.payload);

      state.length = 0;

      state.push(...users);
    });
    builder.addCase(deleteUser.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });
    builder.addCase(createUser.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
  },
});

export default usersSlice.reducer;
