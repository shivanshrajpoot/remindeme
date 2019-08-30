import { find } from 'lodash';

import {
  ADD_REMINDER,
  REMOVE_REMINDER
} from '@actions';

export default (state = {
  reminders: [],
}, action) => {
  console.log('Action Type', action.type);
  console.log('In Reminder', action.payload);
  let reminders = state.reminders;
  switch (action.type) {
    case ADD_REMINDER:
      reminders.unshift(action.payload);
      return { ...state, reminders };

    // case REMOVE_REMINDER:
    //   let index = find(reminders, {id: action.payload});
    //   reminders.splice(index, 1);
    //   return { ...state, reminders };

    default:
      return state;
  }
};
