import { createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
interface CounterState {
    email:string,
}

const initialState: CounterState = {
    email: "",
}

export const forgotPass = createSlice({
    name: 'forgotPass',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email
        },
     
    },
})

export const { setEmail} = forgotPass.actions



export default forgotPass.reducer