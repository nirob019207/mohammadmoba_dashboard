import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResultState {
  searchTerm: string;
  destinationCountry: string;
  state: string;
  industry: string;
  monthlyBudget: number;
  age: number;
  travelType: string;
  startTravel: string;
  endTravel: string;
  limit: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  summitMember: string;
  fromAge: number;
  toAge: number;
  haveRoom: boolean | null; // Allow null
  summitVerify: boolean | null; // Allow null
  gender: string;
  memberSeeking:string;
}

const initialState: SearchResultState = {
  searchTerm: '',
  destinationCountry: '',
  state: '',
  industry: '',
  monthlyBudget: 0,
  age: 0,
  travelType: '',
  startTravel: '',
  endTravel: '',
  limit: 5, 
  page: 1,   
  sortBy: '',
  sortOrder: '',
  summitMember: '',
  fromAge: 0,
  toAge: 0,
  haveRoom:null,
  summitVerify:null,
  gender:'' ,
  memberSeeking:'',
};

export const travelSearchSlice = createSlice({
  name: "travelSearch",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.destinationCountry = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setIndustry: (state, action: PayloadAction<string>) => {
      state.industry = action.payload;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setTravelType: (state, action: PayloadAction<string>) => {
      state.travelType = action.payload;
    },
    setStartTravel: (state, action: PayloadAction<string>) => {
      state.startTravel = action.payload;
    },
    setEndTravel: (state, action: PayloadAction<string>) => {
      state.endTravel = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    setSummitMember: (state, action: PayloadAction<string>) => {
      state.summitMember = action.payload;
    },
    setFromAge: (state, action: PayloadAction<number>) => {
      state.fromAge = action.payload;
    },
    setToAge: (state, action: PayloadAction<number>) => {
      state.toAge = action.payload;
    },
    setHaveRoom: (state, action: PayloadAction<boolean>) => {
      state.haveRoom = action.payload;
    },
    setSummitVerify: (state, action: PayloadAction<boolean| null>) => {
      state.summitVerify = action.payload;
    },
    setGenders: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setMembers: (state, action: PayloadAction<string>) => {
      state.memberSeeking = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setCountry,
  setState,
  setIndustry,
  setMonthlyBudget,
  setAge,
  setTravelType,
  setStartTravel,
  setEndTravel,
  setLimit,
  setPage,
  setSortBy,
  setSortOrder,
  setSummitMember,
  setFromAge,
  setToAge,
  setHaveRoom,
  setSummitVerify,setGenders,setMembers
} = travelSearchSlice.actions;

export default travelSearchSlice.reducer;
