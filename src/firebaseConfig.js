'use strict'

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBnm_lRhrfcOSKcj12qGYLedsqEglfEP8Q",
    authDomain: "capsuleteamapi.firebaseapp.com",
    databaseURL: "https://capsuleteamapi.firebaseio.com",
    projectId: "capsuleteamapi",
    storageBucket: "capsuleteamapi.appspot.com",
    messagingSenderId: "820731962476",
    appId: "1:820731962476:web:1f0251cf8613065742e449"
})

export default firebase;
