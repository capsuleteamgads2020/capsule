'use strict'

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAoSyOj2az4WedZ9Bc7FZ4eqQy-Ybc-it4",
    authDomain: "dev-capsule.firebaseapp.com",
    databaseURL: "https://dev-capsule.firebaseio.com",
    projectId: "dev-capsule",
    storageBucket: "dev-capsule.appspot.com",
    messagingSenderId: "743624846633",
    appId: "1:743624846633:web:2df8bfd00f825bb3b15b38"
})

export default firebase;
