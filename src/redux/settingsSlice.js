import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  jsonWebUrl: 'https://roomiefies.com/app/',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setJsonWebUrl: (state, action) => {
      state.jsonWebUrl = action.payload;  // JSON Web URL'yi değiştir
    },
  },
});

export const {setJsonWebUrl} = settingsSlice.actions;
export default settingsSlice.reducer;
