<template>
    <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
    <div class="d-flex">
        <Sidebar :showSidebar="showSidebar"></Sidebar>
      <div :class="showSidebar?'cml-228':'cml-0'" class="flex-grow-1 flex-shrink-1">
        <Hero></Hero>
        <ProductCategories></ProductCategories>
        <Products></Products>
        <div class="container">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/product.svg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
            <router-link class="btn custom-btn btn-outline-primary mr-4" to="/allProducts">Browse Products</router-link>
          </div>
        </div>
        </div>
      </div>
    </div>
    <Login></Login>
    <CartModal></CartModal>
</template>

<script>
  import Navbar from '../components/Navbar'
  import Sidebar from '../components/Sidebar'
  import Hero from '../components/Hero'
  import Products from '../section/Products.vue'
  import Login from '../components/Login.vue'
  import CartModal from '../components/CartModal'
  import ProductCategories from '../section/ProductCategories';
  export default{
    components:{Hero,Sidebar,Products,Navbar,Login,CartModal,ProductCategories},
    data(){
      return{
        showSidebar:false,
      }
    },
    methods:{
      sidebarVisible(){
        if (this.showSidebar) {
          return this.showSidebar = false;
        } else {
          return this.showSidebar = true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cml-228{
    margin-left: 228px;
    transition: .3s ease;
  }
  .cml-0{
    margin-left: 0;
    transition: .3s ease;
  }
</style>