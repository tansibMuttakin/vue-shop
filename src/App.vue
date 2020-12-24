<template>
  <router-view></router-view>
  <CartModal></CartModal>
  <LoginModal></LoginModal>
</template>
<script>

import CartModal from './components/CartModal';
import LoginModal from './components/Login';
export default {
  name: 'App',
  components:{
    CartModal,
    LoginModal,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
