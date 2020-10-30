'use strict'

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCWa_OED9Ebkx-iIONM_moDi7d5HGxzNVk",
    authDomain: "capsulefrontenddev.firebaseapp.com",
    databaseURL: "https://capsulefrontenddev.firebaseio.com",
    projectId: "capsulefrontenddev",
    storageBucket: "capsulefrontenddev.appspot.com",
    messagingSenderId: "376705407920",
    appId: "1:376705407920:web:b6ad2ff7d29428a448d475"
})

export default firebase;
