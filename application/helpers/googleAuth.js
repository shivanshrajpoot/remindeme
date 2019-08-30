
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

/**
 * Configure Firebase
 */
export const _configureGoogle = async () => {
  // Check for playServices installation or correct version
  await GoogleSignin.hasPlayServices();
  GoogleSignin.configure({
    webClientId: '973188849573-n527d84lr2qcniaerj7m72f0k5d1r6i8.apps.googleusercontent.com'
  })
};

/**
 * Get Current User
 */
export const _getCurrentUser = async () => {
  return await GoogleSignin.getCurrentUser();
};

/**
 * Check Sign In Status
 */
export const _isSignedIn = async () => {
  return await GoogleSignin.isSignedIn();
}

/**
 * Signin To Google
 */
export const _signIn = async () => {
  console.log('Signing In ====> Google');
  try {
    return await GoogleSignin.signIn();
  } catch (error) {
    console.log('_signIn====>', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('IN_PROGRESS');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
      console.log('SOMETHING ELSE WENT WRONG');
    }
  }
}

/**
 * Get User Info
 */
export const _getCurrentUserInfo = async () => {
  try {
    return await GoogleSignin.signInSilently();
  } catch (error) {
    console.log('_getCurrentUserInfo====>', error);
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log('USER HAS NOT SIGNED IN YET');
    } else {
      console.log('SOMETHING ELSE WENT WRONG');
    }
  }
}

/**
 * Sign Out User
 */
export const _signOut = async () => {
  console.log('Signing Out Google');
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return true // Remember to remove the user from your app's state as well
  } catch (error) {
    console.log('_signOut====>', error);
  }
};