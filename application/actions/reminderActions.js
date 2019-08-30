import firebase from 'react-native-firebase';

import {
	ADD_REMINDER,
	REMOVE_REMINDER
} from './types';

const _getCollection = () => {
	const currentUser = firebase.auth().currentUser;
	const uid = currentUser ? currentUser.uid : null;

	firebase.firestore().settings({ timestampsInSnapshots: true });
	return firebase.firestore().collection(`users/${uid}/reminders`);
}

export const _addReminder = (reminder) => (dispatch, getState) => {
		_getCollection().add(reminder)
		.then(() => {
		}).catch(e => {
			console.warn('REMINDER ADD ERROR', e);
		})
}

export const _removeReminder = (docId) => (dispatch, getState) => {
	_getCollection().doc(docId).delete().then(() => {
	}).catch(e => {
		console.warn('REMINDER DELETION ERROR', e)
	})
	
}