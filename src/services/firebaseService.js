import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBDm4xXDdKLuo9eUVdMEzJPTjnQDfj0C18',
  authDomain: 'gkimenteng-7.firebaseapp.com',
  projectId: 'gkimenteng-7',
  storageBucket: 'gkimenteng-7.firebasestorage.app',
  messagingSenderId: '325559498838',
  appId: '1:325559498838:web:c9f5c010e27df75e77e3f7',
  measeurementId: 'G-NZSBBT3T45',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

function getFirestoreInstance() {
  return db;
}

export { app, auth, db, getFirestoreInstance };
