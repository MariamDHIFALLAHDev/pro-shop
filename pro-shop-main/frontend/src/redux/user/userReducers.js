import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "./userConstants";

export const userAuthReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        isLoading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.payload,
      };
    case USER_LOGOUT:
      return {};
    case USER_LOGIN_FAIL:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    case USER_REGISTER_REQUEST:
      return {
        isLoading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export const userDetailsReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        isLoading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        ...initialState,
        isLoading: false,
        user: {},
      };
    default:
      return initialState;
  }
};

export const updateUserProfileReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        isLoading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export const userListReducer = (initialState = { users: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return {
        isLoading: true,
      };
    case USERS_LIST_SUCCESS:
      return {
        isLoading: false,
        users: action.payload,
      };
    case USERS_LIST_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export const deleteUserReducer = (initialState = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return initialState;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};
