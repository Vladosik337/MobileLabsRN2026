import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyCH2MMPvC6dDCuNvOPD82QfqS-7saPvfrU",
  authDomain: "lab6-e7633.firebaseapp.com",
  projectId: "lab6-e7633",
  storageBucket: "lab6-e7633.firebasestorage.app",
  messagingSenderId: "890802552540",
  appId: "1:890802552540:web:5332bf2809c7a436637e19",
  measurementId: "G-J069NPK160"
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
} else {
  const { initializeAuth, getReactNativePersistence } = require('firebase/auth');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

const { getFirestore } = require('firebase/firestore');
const db = getFirestore(app);

export { auth, db };
