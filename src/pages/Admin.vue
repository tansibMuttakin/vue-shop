<template>
    <div class="admin">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <a id="show-sidebar" class="btn btn-sm btn-dark position-absolute" href="#">
                <i class="fas fa-bars" @click="sideMenu()"></i>
            </a>
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-brand  -->
                    <div class="sidebar-item sidebar-brand">
                        <a href="#">Vue-Shop</a>
                        <div id="close-sidebar">
                            <i class="fas fa-times" @click="sideMenu()"></i>
                        </div>
                    </div>
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex justify-content-around flex-nowrap">
                        <div class="user-pic">
                            <img class="img-responsive img-rounded" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" alt="User picture">
                        </div>
                        <div class="user-info">
                            <span class="user-name">{{name}}</span>
                            <span class="user-role">Administrator</span>
                            <span class="user-role">{{email}}</span>
                            <span class="user-status">
                                <i class="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>
                    <!-- sidebar-search  -->
                    <div class="sidebar-item sidebar-search">
                        <div>
                            <div class="input-group">
                                <input type="text" class="form-control search-menu" placeholder="Search...">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- sidebar-menu  -->
                    <div class=" sidebar-item sidebar-menu">
                        <ul>
                            <li class="header-menu text-left">
                                <span>Menu</span>
                            </li>

                            <li>
                                <router-link to="/admin/">
                                    <i class="fa fa-hashtag"></i>
                                    <span>Dashboard</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/users">
                                    <i class="fa fa-users"></i>
                                    <span>Users</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/roles">
                                    <i class="fa fa-cog"></i>
                                    <span>Roles</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/category">
                                    <i class="fa fa-folder"></i>
                                    <span>Category</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/products">
                                    <i class="fa fa-laptop"></i>
                                    <span>Products</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/orders">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>Orders</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/coupons">
                                    <i class="fa fa-bullhorn"></i>
                                    <span>Coupons</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/admin/profile">
                                    <i class="fa fa-user"></i>
                                    <span>Profile</span>
                                </router-link>
                            </li>
                            <li>
                                <a href="#" @click="logout()">
                                    <i class="fa fa-power-off"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- sidebar-menu  -->
                </div>
                <!-- sidebar-footer  -->
                <div class="sidebar-footer">
                    <div class="dropdown">

                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-bell"></i>
                            <span class="badge badge-pill badge-warning notification">3</span>
                        </a>
                        <div class="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
                            <div class="notifications-header">
                                <i class="fa fa-bell"></i>
                                Notifications
                            </div>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                <div class="notification-content">
                                    <div class="icon">
                                        <i class="fas fa-check text-success border border-success"></i>
                                    </div>
                                    <div class="content">
                                        <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                        <div class="notification-time">
                                            6 minutes ago
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="notification-content">
                                    <div class="icon">
                                        <i class="fas fa-exclamation text-info border border-info"></i>
                                    </div>
                                    <div class="content">
                                        <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                        <div class="notification-time">
                                            Today
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="notification-content">
                                    <div class="icon">
                                        <i class="fas fa-exclamation-triangle text-warning border border-warning"></i>
                                    </div>
                                    <div class="content">
                                        <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                        <div class="notification-time">
                                            Yesterday
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-center" href="#">View all notifications</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-envelope"></i>
                            <span class="badge badge-pill badge-success notification">7</span>
                        </a>
                        <div class="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
                            <div class="messages-header">
                                <i class="fa fa-envelope"></i>
                                Messages
                            </div>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                <div class="message-content">
                                    <div class="pic">
                                        <img src="img/user.jpg" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="message-title">
                                            <strong> Jhon doe</strong>
                                        </div>
                                        <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                    </div>
                                </div>

                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="message-content">
                                    <div class="pic">
                                        <img src="img/user.jpg" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="message-title">
                                            <strong> Jhon doe</strong>
                                        </div>
                                        <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                    </div>
                                </div>

                            </a>
                            <a class="dropdown-item" href="#">
                                <div class="message-content">
                                    <div class="pic">
                                        <img src="img/user.jpg" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="message-title">
                                            <strong> Jhon doe</strong>
                                        </div>
                                        <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                            elit. In totam explicabo</div>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-center" href="#">View all messages</a>

                        </div>
                    </div>
                    <div class="dropdown">
                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-cog"></i>
                            <span class="badge-sonar"></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuMessage">
                            <a class="dropdown-item" href="#">My profile</a>
                            <a class="dropdown-item" href="#">Help</a>
                            <a class="dropdown-item" href="#">Setting</a>
                        </div>
                    </div>
                    <div>
                        <a href="#" @click="logout()">
                            <i class="fa fa-power-off"></i>
                        </a>
                    </div>
                    <div class="pinned-footer">
                        <a href="#">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                    </div>
                </div>
            </nav>
            <!-- page-content  -->
            <main class="page-content pt-2">
                <div class="container">
                </div>
                <router-view></router-view>
            </main>
            <!-- page-content" -->
        </div>
        <!-- page-wrapper -->
    </div>
</template>


<script>
import firebase from '../firebase';
import db from '../db';
import Toast from '../sweetAlart';

export default {
    data(){
        return{
            name:'',
            email:'',
        }
    },
    methods:{
        sideMenu(){
            document.querySelector(".page-wrapper").classList.toggle("toggled");
        },
        logout(){
            firebase.auth().signOut().then(() =>{
                this.$router.replace('/');
                Toast.fire({
                    icon: 'success',
                    title: 'Signed out successfully',
                });
            }).catch(function(error) {
                console.log(error);
            });
        }
    },
    async mounted(){
        let user = firebase.auth().currentUser;
        this.email = user.email;
        // let docRef = db.collection("Profiles").doc(user.uid);
        // const doc = await docRef.get();
        const profileName= await db.collection("Profiles").doc(user.uid).get();
        this.name = profileName.data().name;
    }
}
</script>

<style>

</style>