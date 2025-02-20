import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  destination?: boolean; // Indicates if the destination process is completed
  lifecicle?: boolean;   // Indicates if the lifestyle process is completed
  mytop?: boolean;       // Indicates if the mytop process is completed
  userUpd?: boolean;     // Indicates if the user update process is completed
  talkingUp?: boolean;   // Indicates if the talking points process is completed
}

const initialState: FormState = {
  destination: false, // Default state
  lifecicle: false,
  mytop: false,
  userUpd: false,
  talkingUp: false,
};

export const formSlice = createSlice({
  name: "formDetails",
  initialState,
  reducers: {
    saveDestinationData: (state, action: PayloadAction<boolean>) => {
      state.destination = action.payload; // Update completion status for destination
    },
    saveLifeCicleData: (state, action: PayloadAction<boolean>) => {
      state.lifecicle = action.payload; // Update completion status for lifecicle
    },
    mytopData: (state, action: PayloadAction<boolean>) => {
      state.mytop = action.payload; // Update completion status for mytop
    },
    userUpd: (state, action: PayloadAction<boolean>) => {
      state.userUpd = action.payload; // Update completion status for user update
    },
    talkingUp: (state, action: PayloadAction<boolean>) => {
      state.talkingUp = action.payload; // Update completion status for talking points
    },
    clearFormData: (state) => {
      state.destination = false; 
      state.lifecicle = false;
      state.mytop = false;
      state.userUpd = false;
      state.talkingUp = false;
    },
  },
});

export const {
  saveDestinationData,
  saveLifeCicleData,
  mytopData,
  userUpd,
  talkingUp,
  clearFormData,
} = formSlice.actions;

export default formSlice.reducer;
