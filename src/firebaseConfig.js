'use strict'

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCxnpFAUa1M6dHmECR4FMXpgMzRIv06KW8",
  authDomain: "capsulebackend.firebaseapp.com",
  databaseURL: "https://capsulebackend.firebaseio.com",
  projectId: "capsulebackend",
  storageBucket: "capsulebackend.appspot.com",
  messagingSenderId: "538523878531",
  appId: "1:538523878531:web:fa0877e6fe7b600e1207b6"
})

export default firebase;
