import { combineReducers } from "redux"

import {
  forgotPasswordReducer,
  newInstructorReducer,
  profileReducer,
  registerReducer,
  regSocialReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./reducers/userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
  update: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  regSocial: regSocialReducer,
  updateProfile: updateProfileReducer,
  newInstructor: newInstructorReducer,
})

export default reducer
