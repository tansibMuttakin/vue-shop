<template>
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active px-5" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link  px-5" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                        </li>
                    </ul>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            <h5 class="text-center">Login Please</h5>
                            <div class="form-group">
                                <label for="email" class="d-flex">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="d-flex">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="login-password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-secondary float-left" @click="login">
                                    <span v-if="!isLoading">Login</span>
                                    <span v-else><i class="fas fa-circle-notch fa-spin"></i></span>
                                </button> 
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                            <h5 class="text-center">Create New Account</h5>
                            <div class="form-group">
                                <label for="name" class="d-flex">Name</label>
                                <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter name">
                            </div>
                            <div class="form-group">
                                <label for="email" class="d-flex">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="d-flex">Password</label>
                                <input type="text" v-model="password" class="form-control" id="password" placeholder="Enter Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-secondary float-left" @click="register">
                                    <span v-if="!isLoading">SignUp</span>
                                    <span v-else><i class="fas fa-circle-notch fa-spin"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
import db from '../db';
import $ from 'jquery';

export default {
    data(){
        return{
            name:'',
            email:'',
            password:'',
            isLoading:false,
        }
    },
    methods:{
        login(){
            this.isLoading = true;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                $('#login-modal').modal('hide');
                this.email='';
                this.password='';
                this.isLoading = false;
                this.$router.replace('admin');
            })
            .catch((error) => {
                console.log(error);
            });
        },
        async  register() {
            this.isLoading = true;
            const user = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
            
            db.collection("Profiles").doc(user.user.uid).set({
                name: this.name,
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            await db.collection("Accounts").doc(user.user.uid).set({
                name: this.name,
                email: this.email,
            });
            $('#login-modal').modal('hide');
            this.name='';
            this.email='';
            this.password='';
            this.isLoading = false;
            this.$router.replace('admin');
        }
    }
}
</script>

<style>

</style>