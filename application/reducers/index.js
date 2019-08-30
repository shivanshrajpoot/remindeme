import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
	firebase: persistReducer(
      { key: 'firebaseState', storage: localStorage, stateReconciler: hardSet },
      firebaseReducer
    ),
    firestore: firestoreReducer,
});
