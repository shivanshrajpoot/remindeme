import { 
    LOGIN_USER,
    LOGOUT_USER
} from './types';

import { 
    _signIn, 
    _signOut, 
    _signInFirebase, 
    _signOutFirebase, 
    navigationService,
    _isSignedIn,
    _getCurrentUser
} from '@helpers';

const _logOut = async () => {
    try{
        await _signOut();
        await _signOutFirebase();
        return true;
    }catch(e){
        console.log('LOGOUT ERROR====>', e);
    }
}

export const logoutUser = () => async (dispatch, getState) => {
    let isSignedOut = await _logOut();
    if (isSignedOut) {
        await navigationService.navigate('Auth');
        dispatch({
            type: LOGOUT_USER,
        });
    }
};

export const loginUser = () => async (dispatch, getState) => {
    try {
        let isSignedIn = await _isSignedIn();
        if (isSignedIn){
            console.log('isSignedIn', isSignedIn);
            await _logOut();
        }
        let gUser = await _signIn();
        await _signInFirebase({idToken, accessToken} = gUser);
        return true;
    }catch (e) {
        console.log('LOGIN ERROR====>', e);
        return false
    }
}


