<template>
    <div class="container">
        <div class="intro h-100">
            <div class="row h-100 align-items-center">
                <div class="col-md-6 ml-3 text-left">
                    <h3>Profile settings</h3>
                    <p>Change your profile settings here</p>
                </div>
                <div class="col-md-5">
                    <img src="/img/svg/profile.svg" width="300" alt="" class="img-fluid">
                </div>
            </div>
          </div>
          <div class="profile-content">
            <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" name="" v-model="profile.name" placeholder="Full name" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="form-group">
                                <input type="text"  v-model="profile.postCode" placeholder="Postcode" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <input type="submit" @click="updateProfile()" value="Save Changes" class="btn btn-primary w-100">
                            </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="alert alert-info d-flex">
                                    Please use the Reset password email button for reseting the password. The form doens't work currently
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                <input type="text"  v-model="account.name" placeholder="User name" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                <input type="text"  v-model="account.email" placeholder="Email address" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                <input type="text"  v-model="account.password" placeholder="New password" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                <input type="text" v-model="account.confirmPassword"  placeholder="Confirm password" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="file" @change="uploadImage" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="submit" @click="updateAccount()" value="Save Changes" class="btn btn-primary w-100">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="button" @click="resetPassword()" value="Reset password email" class="btn btn-success w-100">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
          </div>

    </div>
</template>

<script>
import firebase from '../../firebase';
import db from '../../db';
import Toast from '../../sweetAlart'
export default {
    data(){
        return{
            profile:{
                name:'',
                phone:'',
                address:'',
                postCode:'',
            },
            account:{
                name:'',
                email:'',
                password:'',
                confirmPassword:'',

            },
            user_id:'',
        }
    },
    methods:{
        async updateProfile(){
            let docRef = await db.collection("Profiles").doc(this.user_id);
            await docRef.update(this.profile);
            Toast.fire({
                icon: 'success',
                title: 'Profile updated successfully',
            });
        },
        async updateAccount(){
            let docRef = await db.collection("Accounts").doc(this.user_id);
            console.log(docRef);
            await docRef.update(this.account);
            Toast.fire({
                icon: 'success',
                title: 'Account updated successfully',
            });
        },
        async resetPassword(){
            try {
                const auth = firebase.auth();
                await auth.sendPasswordResetEmail(this.account.email);
                Toast.fire({
                    icon: 'success',
                    title: 'Email sent'
                })
                this.account.password='';
                this.account.confirmPassword='';
            } catch (error) {
                console.log(error);
            }
            
        }
    },
    async mounted(){
        let user = await firebase.auth().currentUser;
        this.user_id = user.uid;
        this.account.email = user.email;
        let profileRef = db.collection("Profiles").doc(user.uid);
        let accountRef = db.collection("Accounts").doc(user.uid);
        const profileDoc = await profileRef.get();
        const accountDoc = await accountRef.get();
        this.profile = profileDoc.data();
        this.account = accountDoc.data();
    }
}
</script>

<style>

</style>