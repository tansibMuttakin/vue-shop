import db from '../db';
import firebase from '../firebase';
export default function isAdmin({next}){
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection("Accounts").doc(user.uid).get().then((user)=>{
            user.data().roles.forEach((element,index) => {
                if (element.name=='admin') {
                    return next();
                }
                else{
                    if (index == user.data().roles.length-1) {
                        return next('/');
                    }
                }
            });
        });

    } else {
        return next('/');
    }
}