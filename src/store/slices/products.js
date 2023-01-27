import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const productsReq = await fetch(`${import.meta.env.VITE_API_URL}/product`);
    const productsRes = await productsReq.json();

    if (productsReq.status === 404) return rejectWithValue(404);

    return productsRes.data;
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

export const deleteProduct = createAsyncThunk("product/delete", async ({ productID, token }, { rejectWithValue }) => {
  try {
    const productReq = await fetch(`${import.meta.env.VITE_API_URL}/product/${productID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return productReq.status === 200 ? productID : rejectWithValue("مشکلی پیش اومد");
  } catch (_) {
    return rejectWithValue("مشکلی پیش اومد");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.length = 0;

      state.push(...action.payload);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.payload === 404) {
        state.length = 0;
      } else {
        toast.error(`${action.payload}!`);
      }
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const products = state.filter((product) => product.id !== action.payload);

      state.length = 0;

      state.push(...products);
    });
    builder.addCase(deleteProduct.rejected, (_, action) => {
      toast.error(`${action.payload}!`);
    });
  },
});

export default productsSlice.reducer;
