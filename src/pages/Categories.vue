<template>
    <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
    <div class="d-flex">
        <Sidebar :showSidebar="showSidebar"></Sidebar>
        <div :class="showSidebar?'cml-228':'cml-0'" class="flex-grow-1 flex-shrink-1">
            <div class="my-5">
                <h4 class="slug"><span>{{categoryName}}</span></h4>
                {{data}}
            </div>
            <div class="container-fluid">
                <ul class="d-flex flex-wrap p-0 m-auto" style="width:82%;">
                    <li class="list-unstyled mx-3 my-2" v-for="(product,index) in products" :key="index">
                        <div class="card" style="width: 17rem; height:20rem">
                            <div v-if="product.discount && product.discount!= ''" class="badge badge-danger text-wrap position-absolute" style="width: 3rem;right:1px;top:1px;">
                                {{product.discount}}%
                            </div>
                            <img class="card-img-top" src="/img/products/product1.jpg" alt="Card image cap">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between mt-4">
                                    <p class="card-title text-left">{{product.productName}}</p>
                                    <div class="d-flex justify-content-between flex-column">
                                        <p v-if="product.discountedPrice!=''" class="m-0"><b>${{product.discountedPrice}}</b></p>
                                        <p v-else class="m-0">${{product.price}}</p>
                                        <small v-if="product.discountedPrice!=''" class="text-left"><del>${{product.price}}</del></small>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <AddToCart
                                        :product-image="product.images[0]"
                                        :product-id="product.id"
                                        :price="product.price"
                                        :name="product.productName"
                                        :discount="product.discount"
                                        :discountedPrice="product.discountedPrice">
                                    </AddToCart>
                                    <SingleProduct
                                        :id="product.id"
                                        :images="product.images"
                                        :price="product.price"
                                        :discount="product.discount"
                                        :discountedPrice="product.discountedPrice"
                                        :name="product.productName"
                                        :description="product.description"
                                        :tags="product.tags"
                                        :category="product.category">
                                    </SingleProduct>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul> 
            </div>
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
    inheritAttrs: false,
    components:{
        Navbar,
        AddToCart,
        SingleProduct,
        Sidebar,
    },
    props:['slug'],
    data(){
        return{
            // slug:this.$route.params.slug,
            products:[],
            categoryName:'',
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
        },
        async fetchData(){
            const snapShot = await db.collection("Categories").where("slug","==",this.slug).get();
            const category = snapShot.docs[0].data();
            this.categoryName = category.name;
            const Products = await db.collection("Products").where("category.name","==",category.name).get();
            Products.forEach((doc)=>{
                const id = doc.id;
                let dataInfo = {id, ...doc.data()};
                this.products.push(dataInfo);
            });
        }
    },
    watch:{
        slug(){
            this.products=[];
            this.fetchData();
        }
    },
    mounted(){
        this.fetchData();
    },
}
</script>

<style lang="scss" scoped>
    .slug{
        position: relative;
        margin: 0;
        span::before,span::after{
            content: "";
            position: absolute;
            height: 5px;
            border-bottom: 1px solid black;
            border-top: 1px solid black;
            top: 50%;
            bottom: 50%;
            width: 35%;
        }
        span::before{
            left: 0;
        }
        span::after{
            right: 0;
        }
    }
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