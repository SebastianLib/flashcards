import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getFlashcards } from "../flashcards/flashcardsSlice";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  message: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ username, email, password }) => {
    try {
      const axiosResponse = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = axiosResponse.data;
      return data;
    } catch (error) {
      // Handle errors
      state.error = "something went wrong";
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async ({ email, password }) => {
    try {
      const axiosResponse = await axios.post(
        "http://localhost:3000/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = axiosResponse.data;
      return data;
    } catch (error) {
      // Handle errors
      state.error = "something went wrong";
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  try {
    const axiosResponse = await axios.post(
      "http://localhost:3000/auth/updateUser",
      {
        ...user,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const data = axiosResponse.data;
    return data;
  } catch (error) {
    // Handle errors
    state.error = "something went wrong";
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    },
    resetToDefault(state){
      state.message = null;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = "You have created an account! now you can sign in!";
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = "something went wrong";
        state.loading = false;
      })

      .addCase(signinUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.error = "something went wrong";
        state.loading = false;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.message = "you changed your details!";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = "something went wrong";
        state.loading = false;
      })
  },
});

// Action creators are generated for each case reducer function
export const { logout, resetToDefault } = userSlice.actions;

export default userSlice.reducer;
