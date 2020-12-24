import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyDS3gPoQ0BHZM1ALS8Ph7zugDNenl74YFU",
    authDomain: "vue-shop-8af61.firebaseapp.com",
    databaseURL: "https://vue-shop-8af61.firebaseio.com",
    projectId: "vue-shop-8af61",
    storageBucket: "vue-shop-8af61.appspot.com",
    messagingSenderId: "189507185176",
    appId: "1:189507185176:web:91d79be99eae7f21f3716d"
};
firebase.initializeApp(firebaseConfig);
export default firebase;