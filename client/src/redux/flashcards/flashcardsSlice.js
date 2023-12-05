import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  flashcards: null,
  loading: false,
  error: false,
  status: null,
}

export const createNewSet = createAsyncThunk("flashcards/createNewSet", async ({title,description,items, userRef}) => {
    try {
        const axiosResponse = await axios.post('http://localhost:3000/flashcards/create', {
            name: title,
          description: description,
          items: items,
          userRef: userRef
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      
        const data = axiosResponse.data;
        return data;
      } catch (error) {
        // Handle errors
        state.error = "something went wrong"
      }
})

export const getFlashcards = createAsyncThunk("flashcards/getFlashcards", async (currentUser) => {
    try {
      const axiosResponse = await axios.get('http://localhost:3000/flashcards/getFlashcards', {
        params: {
          userRef: currentUser._id
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
        const data = axiosResponse.data;
        return data;
      } catch (error) {
        state.error = "something went wrong"
      }
})


export const updateSet = createAsyncThunk("flashcards/updateSet", async (flashcards) => {
  try {
      const axiosResponse = await axios.post('http://localhost:3000/flashcards/updateSet', {
          flashcards:flashcards.flashcards,
          _id:flashcards._id,
          userRef:flashcards.userRef
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    
      const data = axiosResponse.data;
      return data;
    } catch (error) {
      // Handle errors
      state.error = "something went wrong"
    }
})

export const removeSet = createAsyncThunk("flashcards/removeSet", async ({setId, userRef}) => {
  try {
      const axiosResponse = await axios.delete('http://localhost:3000/flashcards/removeSet', {
        data: {
          setId,
          userRef
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const data = axiosResponse.data;
      return data;
    } catch (error) {
      // Handle errors
      state.error = "something went wrong"
    }
})

export const removeFlashcard = createAsyncThunk("flashcards/removeFlashcard", async ({setId, flashcardId, userRef}) => {
  try {
      const axiosResponse = await axios.delete('http://localhost:3000/flashcards/removeFlashcard', {
        data: {
          setId,
          flashcardId,
          userRef,
        },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const data = axiosResponse.data;
      return data;
    } catch (error) {
      // Handle errors
      state.error = "something went wrong"
    }
})

export const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    startSetup(state,action){
        state.loading = false;
        state.error = false;
        state.status = null;
    },
    logoutFlashcards(state){
      state.flashcards = null
   },
  },
  extraReducers(builder) {
    builder
        .addCase(createNewSet.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createNewSet.fulfilled, (state, action) => {
                state.status = "You have created a new set!";
                state.flashcards = action.payload
                state.loading = false;
        })
        .addCase(createNewSet.rejected, (state, action) => {
            state.error = "something went wrong"
            state.loading = false
        })
        .addCase(getFlashcards.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFlashcards.fulfilled, (state, action) => {
                state.flashcards = action.payload
                state.loading = false;
        })
        .addCase(getFlashcards.rejected, (state, action) => {
            state.loading = false
        })
        .addCase(updateSet.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateSet.fulfilled, (state, action) => {
                state.flashcards = action.payload;
                state.loading = false;
        })
        .addCase(updateSet.rejected, (state, action) => {
            state.loading = false
        })
        .addCase(removeFlashcard.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFlashcard.fulfilled, (state, action) => {
                state.flashcards = action.payload.flashcards;
                state.loading = false;
        })
        .addCase(removeFlashcard.rejected, (state, action) => {
            state.loading = false
        })
        .addCase(removeSet.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeSet.fulfilled, (state, action) => {
                state.flashcards = action.payload.flashcards;
                state.loading = false;
        })
        .addCase(removeSet.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const {startSetup, logoutFlashcards} = flashcardsSlice.actions

export default flashcardsSlice.reducer