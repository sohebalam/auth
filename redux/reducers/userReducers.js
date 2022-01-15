import {
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_INSTRUCTOR_FAIL,
  REGISTER_INSTRUCTOR_REQUEST,
  REGISTER_INSTRUCTOR_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SOCIAL_REG_FAIL,
  SOCIAL_REG_REQUEST,
  SOCIAL_REG_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userTypes"

export const registerReducer = (
  state = { loading: false, user: null },
  action
) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true }
    case REGISTER_USER_SUCCESS:
      return { loading: false, success: true, message: action.payload.message }
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload }
    // case CLEAR_ERRORS:
    //   return { ...state, error: null }
    default:
      return state
  }
}

export const regSocialReducer = (
  state = { loading: false, user: null },
  action
) => {
  switch (action.type) {
    case SOCIAL_REG_REQUEST:
      return { loading: true }
    case SOCIAL_REG_SUCCESS:
      return { loading: false, success: true, message: action.payload.message }
    case SOCIAL_REG_FAIL:
      return { loading: false, error: action.payload }
    // case CLEAR_ERRORS:
    //   return { ...state, error: null }
    default:
      return state
  }
}

export const profileReducer = (state = { dbUser: null }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loading: true }
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        isAuthenticated: true,

        dbUser: action.payload,
      }
    case LOAD_USER_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PROFILE_RESET:
      return { ...state, dbUser: null, success: null, isAuthenticated: null }
    default:
      return state
  }
}

export const updateProfileReducer = (state = { isUpdated: false }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case UPDATE_PROFILE_SUCCESS:
      // console.log(action.payload)
      return { loading: false, isUpdated: action.payload }

    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true }
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload }
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    // case CLEAR_ERRORS:
    //   return { ...state, error: null }
    default:
      return state
  }
}

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return { loading: true }
    case ADMIN_USERS_SUCCESS:
      return { loading: false, users: action.payload }
    case ADMIN_USERS_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const updateUserReducer = (state = {}, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
      }

    case UPDATE_USER_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      }

    case UPDATE_USER_RESET:
      return {
        loading: false,
        isUpdated: false,
      }

    case UPDATE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const deleteUserReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, isDeleted: action.payload }
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_USER_RESET:
      return {
        loading: false,
        isDeleted: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const newInstructorReducer = (
  state = { loading: false, user: null },
  action
) => {
  switch (action.type) {
    case REGISTER_INSTRUCTOR_REQUEST:
      return { loading: true }
    case REGISTER_INSTRUCTOR_SUCCESS:
      return { loading: false, success: true, link: action.payload }

    case REGISTER_INSTRUCTOR_FAIL:
      return { loading: false, error: action.payload }
    // case CLEAR_ERRORS:
    //   return { ...state, error: null }
    default:
      return state
  }
}
