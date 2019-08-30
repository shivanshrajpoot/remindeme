import _ from 'lodash';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import firebase from 'react-native-firebase';

import { 
    createStore, 
    applyMiddleware,
    compose
} from 'redux';

import { 
    persistStore,
    persistReducer
} from 'redux-persist';

import logger from 'redux-logger';
import reducers from '@reducers';
import { _configureFirebase, _configureGoogle, _initFirebaseStore } from '@helpers';

//Firebase Integration
// import { reactReduxFirebase, getFirebase, getFirestore } from 'react-redux-firebase';

//Firestore Integration
import { createFirestoreInstance } from 'redux-firestore'

const initialState = {};
// const firebase = _configureFirebase();
const fbConfig = {
  debug: true
};

firebase.initializeApp()
const reduxFirebaseConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false,
  enableRedirectHandling: false
}

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

let middeleware = [
    // thunk.withExtraArgument(getFirebase),
    thunk,
    logger
];



const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middeleware)
    )
);

export const rrfProps = {
  firebase,
  config: reduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};


export const configureStore = () => {
    _configureGoogle();
    _initFirebaseStore();
    const persistor = persistStore(store);
    return { store, persistor };
};
