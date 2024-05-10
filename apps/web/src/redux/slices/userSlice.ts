import { User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Omit<User, 'point'> = {
  id: 0,
  fullName: '',
  email: '',
  password: '',
  referral_code: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullName = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
