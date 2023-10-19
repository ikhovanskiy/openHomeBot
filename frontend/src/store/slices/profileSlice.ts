import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from '../../types/types'

export interface ProfileState {
    value: IProfile
}




const initialState: ProfileState = {
  value: {
    created: "",
    email: "",
    first_name: "",
    id: "",
    last_auth: "",
    login: "",
    patronymic: "",
    phone: null,
    second_name: ""
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions

export default profileSlice.reducer