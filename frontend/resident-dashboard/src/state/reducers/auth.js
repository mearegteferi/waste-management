// /* eslint-disable import/no-anonymous-default-export */
// import {
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   USER_LOADED_SUCCESS,
//   USER_LOADED_FAILURE,
//   AUTHENTICATED_SUCCESS,
//   AUTHENTICATED_FAILURE,
//   PASSWORD_RESET_SUCCESS,
//   PASSWORD_RESET_FAILURE,
//   PASSWORD_RESET_CONFIRM_SUCCESS,
//   PASSWORD_RESET_CONFIRM_FAILURE,
//   SIGNUP_SUCCESS,
//   SIGNUP_FAILURE,
//   ACTIVATION_SUCCESS,
//   ACTIVATION_FAILURE,
//   LOGOUT
// } from '../actions/types'

// const initialState ={
//   access: localStorage.getItem('access'),
//   refresh: localStorage.getItem('refresh'),
//   isAuthenticated: null,
//   isLoading: false,
//   user: null
// }

// export default function(state = initialState, action) {
//   const {type, payload} = action

//   switch(type){
//     case AUTHENTICATED_SUCCESS:
//       return{
//         ...state,
//         isAuthenticated: true
//       }
//     case USER_LOADED_SUCCESS:
//       return {
//         ...state,
//         user: payload
//       }
//     case USER_LOADED_FAILURE:
//       return{
//         ...state,
//         user: null
//       }
//     case LOGIN_SUCCESS:
//       localStorage.setItem('access', payload.access)
//       return {
//         ...state,
//         isAuthenticated: true,
//         access: payload.access,
//         refresh: payload.refresh
//       }
//     case SIGNUP_SUCCESS:
//       return{
//         ...state,
//         isAuthenticated: false
//       }
//     case AUTHENTICATED_FAILURE:
//       return{
//         ...state,
//         isAuthenticated: false 
//       }
//     case LOGIN_FAILURE:
//     case SIGNUP_FAILURE:
//     case LOGOUT:
//       localStorage.removeItem('access')
//       localStorage.removeItem('refresh')
//       return {
//         ...state,
//         isAuthenticated: false,
//         access: null,
//         refresh: null
//       }
//     case PASSWORD_RESET_SUCCESS:
//     case PASSWORD_RESET_FAILURE:
//     case PASSWORD_RESET_CONFIRM_SUCCESS:
//     case PASSWORD_RESET_CONFIRM_FAILURE:
//     case ACTIVATION_SUCCESS:
//     case ACTIVATION_FAILURE:
//       return {
//         ...state
//       }
//     default:
//       return state
//   }
// }
