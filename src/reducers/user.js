import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case USER_LOGIN:
    return ({
      ...state,
      email: payload.email,
    });
  default:
    return state;
  }
};

export default userReducer;
