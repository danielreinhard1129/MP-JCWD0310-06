import { User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Omit<
  User,
  'event' | 'createdAt' | 'updatedAt' | 'userReward' | 'pointExpiredDate'
> = {
  id: 0,
  fullName: '',
  email: '',
  password: '',
  referralCode: '',
  role: '',
  point: 0,
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
      state.point = action.payload.point;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullName = '';
      state.email = '';
      state.role = '';
      state.point = 0;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
