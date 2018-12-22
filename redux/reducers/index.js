import { combineReducers } from 'redux';
import taskReducers from './taskReducers';

export default combineReducers({
  tasks: taskReducers,
});
