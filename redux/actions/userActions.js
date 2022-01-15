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
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userTypes"
import axios from "axios"
import absoluteUrl from "next-absolute-url"

export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(`/api/user/register`, userData, config)

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
export const clearProfile = () => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE_RESET,
  })
}

//loadUserProfile

export const loadUser = (authCookie, req) => async (dispatch) => {
  // console.log(authCookie)
  try {
    const config = {
      headers: {
        cookie: authCookie,
      },
    }
    dispatch({ type: LOAD_USER_REQUEST })

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(`${origin} /api/user/profile`, config)

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProfile = (userData) => async (dispatch) => {
  // console.log(userData)
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(`/api/profile/update`, userData, config)

    // console.log(data)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    })
    // dispatch({
    //   type: UPDATE_PROFILE_RESET,
    //   payload: null,
    // })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const passwordForgot = (userData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(`/api/user/forgot`, userData, config)

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const passwordReset = (userData, resetToken) => async (dispatch) => {
  // console.log(userData)
  // return
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      `/api/user/reset/${resetToken}`,
      userData,
      config
    )

    // console.log(data.message)
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const socialReg = (userData) => async (dispatch) => {
  // console.log(userData)
  try {
    dispatch({ type: SOCIAL_REG_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(`/api/user/social`, userData, config)
    // console.log(data)
    dispatch({
      type: SOCIAL_REG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SOCIAL_REG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//google
export const socialRegiser = (authCookie) => async (dispatch) => {
  // console.log(userData)
  try {
    dispatch({ type: SOCIAL_REG_REQUEST })

    const config = {
      headers: {
        cookie: authCookie,
      },
    }

    const { data } = await axios.post(`/api/user/regSocial`, config)
    // console.log(data)
    dispatch({
      type: SOCIAL_REG_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SOCIAL_REG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_USERS_REQUEST })

    const { data } = await axios.get(`/api/admin/users/users`)

    dispatch({
      type: ADMIN_USERS_SUCCESS,
      payload: data.users,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/admin/users/${id}`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userUpdate = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(`/api/admin/users/${id}`, userData, config)

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST })

    const { data } = await axios.delete(`/api/admin/users/${id}`)

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const regInstructor = () => async (dispatch) => {
  console.log("In Action")
  try {
    dispatch({ type: REGISTER_INSTRUCTOR_REQUEST })

    const { data } = await axios.post(`/api/user/instructor/new`)

    // console.log(data)

    dispatch({
      type: REGISTER_INSTRUCTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_INSTRUCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
