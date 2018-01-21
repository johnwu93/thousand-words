import * as firebase from 'firebase';
import './accounts';
import '../both/api';
import './api';
import './email';

const CONFIG = {
  apiKey: 'AIzaSyChc5HOuJVtN-4lXEFpIPJxm6hhJSxmG3A',
  authDomain: 'thousand-words-22536.firebaseapp.com',
  databaseURL: 'https://thousand-words-22536.firebaseio.com',
  projectId: 'thousand-words-22536',
  storageBucket: 'thousand-words-22536.appspot.com',
  messagingSenderId: '846922175347',
};

if (!firebase.apps.length) firebase.initializeApp(CONFIG);
