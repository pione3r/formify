import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ScreenState {
  x: number;
  y: number;
  ratio: number;
}

// Define the initial state using that type
const initialState: ScreenState = {
  x: 0,
  y: 0,
  ratio: 1,
};

export const screenSlice = createSlice({
  name: "screen",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setScreenMove: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => ({
      ...state,
      x: action.payload.x,
      y: action.payload.y,
    }),
    setScreenZoom: (state, action: PayloadAction<{ ratio: number }>) => ({
      ...state,
      ratio: action.payload.ratio,
    }),
  },
});

export const { setScreenMove, setScreenZoom } = screenSlice.actions;

export default screenSlice.reducer;
