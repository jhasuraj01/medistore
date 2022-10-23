import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBMlMCOdq8q41IZ9EHrtf8OOV96gS61fFw',
  authDomain: 'medistore-web-app.firebaseapp.com',
  projectId: 'medistore-web-app',
  storageBucket: 'medistore-web-app.appspot.com',
  messagingSenderId: '359867874781',
  appId: '1:359867874781:web:ee5afb48d07e42afae4a34',
  measurementId: 'G-413X1HCKNE'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const analytics = getAnalytics(app)