import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from 'firebase/auth';

import { auth } from './firebase-config';
import { createUserAsync } from '../Redux/features/Authentication/AuthenticationSlice';

export const signUpWithPassword = async (credential) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credential.email, credential.password);
    const user = userCredential.user; // Signed up
    return user; // Return the user object
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error signing up: ${errorCode}, ${errorMessage}`);
    return { error: errorMessage }; // Return an error object for better handling
  }
}

export const signInWithPassword = async (credential) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credential.email, credential.password);
    const user = userCredential.user; // Signed in
    return user; // Return the user object
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error signing in: ${errorCode}, ${errorMessage}`);
    return { error: errorMessage }; // Return an error object for handling
  }
}

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider); // Sign in with popup

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken; // You can use this token if needed
    const user = result.user; // Signed-in user
    return user; // Return the user object
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email; // Optional chaining to avoid undefined
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error(`Error signing in with Google: ${errorCode}, ${errorMessage}, Email: ${email}`);
    return { error: errorMessage }; // Return error for handling
  }
}

export const signOutUser = async () => {
  try{
  await signOut(auth)
    return {status: true, message: "Logged out via firebase"};
  }
  catch(error){
    return {status: false, message: "Failed to logout via firebase", error: error.message};
  };
}

export const checkUserSignedIn = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

export const sendPasswordResetLink = async () => {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}