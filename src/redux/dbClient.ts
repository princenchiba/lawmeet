import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import faunadb, { Client } from 'faunadb';

interface dbClientState {
  value: Client | null;
}

const initialState: dbClientState = {
  value: null,
};

export const dbClientSlice = createSlice({
  name: 'db client',
  initialState,
  reducers: {
        setClient: (state: dbClientState, action: PayloadAction<Client>) => {
            state.value = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setClient } = dbClientSlice.actions;

export default dbClientSlice.reducer;