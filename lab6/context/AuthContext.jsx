import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserProfile = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setUserProfile(null);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        name: '',
        age: '',
        city: '',
        createdAt: new Date().toISOString()
      });
      return { success: true, user: result.user };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const updateProfile = async (data) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, {
        ...data,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      await loadUserProfile(user.uid);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteAccount = async (password) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);

      return { success: true };
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) };
    }
  };

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/email-already-in-use': 'This email is already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
      'auth/requires-recent-login': 'Please log in again before this operation'
    };
    return errorMessages[errorCode] || 'An error occurred';
  };

  const value = {
    user,
    userProfile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    deleteAccount,
    loadUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
