import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SignInModalState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: SignInModalState = {
  isOpen: false,
};

export const signInModalSlice = createSlice({
  name: "sign-in-modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signInModalOpen: (state) => {
      state.isOpen = true;
    },
    signInModalClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { signInModalOpen, signInModalClose } = signInModalSlice.actions;

export default signInModalSlice.reducer;
