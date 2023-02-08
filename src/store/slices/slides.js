import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSlides = createAsyncThunk("slides/fetch", async (_, { rejectWithValue }) => {
  try {
    const slidesReq = await fetch(`${import.meta.env.VITE_API_URL}/slide`);
    const slidesRes = await slidesReq.json();

    if (slidesReq.status === 404) return rejectWithValue(404);

    return slidesRes.data;
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

export const deleteSlide = createAsyncThunk("slide/delete", async ({ slideID, token }, { rejectWithValue }) => {
  try {
    const slideReq = await fetch(`${import.meta.env.VITE_API_URL}/slide/${slideID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return slideReq.status === 200 ? slideID : rejectWithValue("مشکلی پیش اومد");
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

export const createSlide = createAsyncThunk("slide/create", async ({ image, token }, { rejectWithValue }) => {
  const formData = new FormData();

  formData.append("image", image[0]);

  try {
    const slideReq = await fetch(`${import.meta.env.VITE_API_URL}/slide`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const slideRes = await slideReq.json();

    if (slideReq.status === 500) return rejectWithValue("مشکلی پیش اومد");

    return slideRes.data;
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

const slidesSlice = createSlice({
  name: "slides",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchSlides.fulfilled, (state, action) => {
      state.length = 0;

      state.push(...action.payload);
    });
    builder.addCase(fetchSlides.rejected, (state, action) => {
      if (action.payload === 404) {
        state.length = 0;
      } else {
        toast.error(`${action.payload}!`);
      }
    });
    builder.addCase(deleteSlide.fulfilled, (state, action) => {
      const slides = state.filter((slide) => slide.id !== action.payload);

      state.length = 0;

      state.push(...slides);
    });
    builder.addCase(deleteSlide.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
    builder.addCase(createSlide.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });
    builder.addCase(createSlide.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
  },
});

export default slidesSlice.reducer;
