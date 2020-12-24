<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <i class="fa fa-bars fa-2x mr-5" @click="$emit('toggle-sidebar')" style="color:white" aria-hidden="true"></i>
        <a class="navbar-brand">Vue-Shop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/checkout">Checkout</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
            </form>
            <button type="button" @click="$emit('open-login-modal')" class="btn btn-outline-success my-2 ml-2 my-sm-0" data-toggle="modal" data-target="#login-modal">
                Login
            </button>
            <button class="btn btn-outline-success my-2 ml-2 my-sm-0" type="submit" data-toggle="modal" data-target="#cart-modal">Cart</button>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style>

</style>