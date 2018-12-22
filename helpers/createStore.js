import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, getStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import axios from 'axios';
import _ from 'lodash';
import reducers from '../redux/reducers';


const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const apiURL = 'http://demo3.squareboat.com/api/v1';

export default () => {
  const axiosInstance = axios.create({
    baseURL: `${apiURL}`,
    timeout: 10000,
  });

  const store = createStore(
    persistedReducer,
    { },
    applyMiddleware(thunk.withExtraArgument(axiosInstance)),
  );
  const persistor = persistStore(store);

  getStoredState(persistConfig)
    .then((state) => {
      const token = _.get(state, 'auth.user.token', null);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    });

  return { store, persistor };
};
