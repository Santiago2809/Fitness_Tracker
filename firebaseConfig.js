import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBLCwelT1PcymQ-re9-xBojeggetCcZjuY",
    authDomain: "fitness-tracker-e549b.firebaseapp.com",
    projectId: "fitness-tracker-e549b",
    storageBucket: "fitness-tracker-e549b.appspot.com",
    messagingSenderId: "575570660252",
    appId: "1:575570660252:web:07c9299899d9c3ec031659"
};


const app = initializeApp(firebaseConfig);
export let AUTH = null;
if (Platform.OS == 'web') {
    AUTH = initializeAuth(app, {
        persistence: browserLocalPersistence,
    });
} else {
    AUTH = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

// export const AUTH = getAuth(app);
export const DB = getFirestore(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
