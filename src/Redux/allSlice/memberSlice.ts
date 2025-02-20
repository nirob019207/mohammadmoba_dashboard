import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "@/types/Member";
// Define a type for the slice state


const initialState = {
  
};

export const member = createSlice({
  name: "member",
  initialState,
  reducers: {
      verfyMember: (state, action: PayloadAction<Member>) => {  
          
      },
      
  },
});

export const { verfyMember } = member.actions;

export default member.reducer;
