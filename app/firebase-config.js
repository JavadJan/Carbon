import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// import { Puppeteer } from "puppeteer-core";

export const firebaseConfig = {
    apiKey: "AIzaSyBz07j_YkeaW0yE87C4e9w8qETSoyz4aJ8",
    authDomain: "carbon-9105d.firebaseapp.com",
    projectId: "carbon-9105d",
    storageBucket: "carbon-9105d.appspot.com",
    messagingSenderId: "740319411128",
    appId: "1:740319411128:web:2f78ab5d7c5f7e300f2d4d",
    measurementId: "G-SXFPWZT59L"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// get value from url
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);

const product = urlParams.get(`id`)
console.log(product);

export default db;