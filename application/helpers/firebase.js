import firebase from 'react-native-firebase';

const reactNativeFirebaseConfig = {
  debug: true
};

export const _getFirebaseAuthUid = () => {
	return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
}

export const _configureFirebase = () => {
	// return firebase.initializeApp(reactNativeFirebaseConfig);
}

export const _initFirebaseStore = async (uid) => {
	console.log('Init Fireabse CloudStore');
	try{
		firebase.firestore().settings({ timestampsInSnapshots: true })
		return firebase.firestore()
	}catch(e){
		console.log('Error======>', e);
	}
}

export const _signInFirebase = async ({idToken, accessToken}) => {
	// create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    // await _initFirebaseStore();
    return firebaseUserCredential.user;
}

export const _signOutFirebase = async () => {
	console.log('Signing Out Firebase');
	if (!firebase.auth().currentUser) return true;
	try	{
		await firebase.auth().signOut();
    	return true;
	}catch(e){
		console.log('Error=====>', e);
		return false;
	}
}