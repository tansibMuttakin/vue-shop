<template>
    <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
    <div class="d-flex">
        <Sidebar :showSidebar="showSidebar"></Sidebar>
        <div class="container-fluid flex-grow-1 flex-shrink-1" :class="showSidebar?'cml-228':'cml-0'">
            <ul class="d-flex flex-wrap p-0 m-auto" style="width:82%;">
                <li class="list-unstyled mx-3 my-2" v-for="(product,index) in products" :key="index">
                    <div class="card" style="width: 17rem; height:20rem">
                        <img class="card-img-top" src="/img/products/product1.jpg" alt="Card image cap">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between mt-4">
                                <h5 class="card-title">{{product.data().productName}}</h5>
                                <p>${{product.data().price}}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <AddToCart
                                    :product-image="product.data().images[0]"
                                    :product-id="product.id"
                                    :price="product.data().price"
                                    :name="product.data().productName">
                                </AddToCart>
                                <SingleProduct
                                    :id="product.id"
                                    :images="product.data().images"
                                    :price="product.data().price"
                                    :name="product.data().productName"
                                    :description="product.data().description"
                                    :tags="product.data().tags"
                                    :category="product.data().category">
                                </SingleProduct>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
import db from '../db';
import Navbar from '../components/Navbar';
import AddToCart from '../components/AddToCart';
import SingleProduct from '../components/SingleProduct';
import Sidebar from '../components/Sidebar';
export default {
    components:{Navbar,AddToCart,SingleProduct,Sidebar},
    data(){
        return{
            products:[],
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
    },
    async mounted(){
        const docref = await db.collection("Products").get();
        docref.forEach((docs)=>{
            this.products.push(docs);
        });
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
    .card:hover{
        cursor: pointer;
        transition: 0.2s ease;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.4);
    }
</style>