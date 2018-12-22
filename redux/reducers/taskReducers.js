import {
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
} from '../actions/types';

export default (state = {
  taskList: {},
}, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, taskList: action.payload };

    case DELETE_TASK:
      return { ...state, taskList: action.payload };

    case EDIT_TASK:
      return { ...state, taskList: null };

    default:
      return state;
  }
};
