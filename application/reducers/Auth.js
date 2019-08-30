import {
  LOGIN_USER,
  LOGOUT_USER
} from '@actions';

export default (state = {
  user: null,
}, action) => {
  console.log('Action Type', action.type);
  console.log('In auth', action.payload);
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload };

    case LOGOUT_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};
