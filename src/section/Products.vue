<template>
  <div class="products" id="products">
    <!-- <div class="container">
        <p class="text-center p-5" style="font-size:x-large">Special Offers</p>
        <div class="row">
            <div class="col-md-4" v-for="(product) in products" :key="product.id">
                <div class="card product-item h-100">
                    <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="card-title m-0">{{product.productName}}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="m-0"><b>${{product.price}}</b></p>
                                <small class="mx-3"><del>$500</del></small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <AddToCart
                                :product-image="product.images[0]"
                                :product-id="product.id"
                                :price="product.price"
                                :name="product.productName">
                            </AddToCart>
                            <SingleProduct
                                :id="product.id"
                                :images="product.images"
                                :price="product.price"
                                :name="product.productName"
                                :description="product.description"
                                :tags="product.tags"
                                :category="product.category">
                            </SingleProduct>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center mt-3">
                <h5>Spacial Offers</h5>
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <Carousel :value="products" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions" :circular="true">
            <template #item="product">
                <div class="card product-item h-100 mx-2">
                    <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <p class="card-title m-0">{{product.data.productName}}</p>
                            <div class="d-flex justify-content-between align-items-center cw-32">
                                <p class="m-0"><b>${{product.data.price}}</b></p>
                                <small class=""><del>$500</del></small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <AddToCart
                                :product-image="product.data.images[0]"
                                :product-id="product.data.id"
                                :price="product.data.price"
                                :name="product.data.productName">
                            </AddToCart>
                            <SingleProduct
                                :id="product.data.id"
                                :images="product.data.images"
                                :price="product.data.price"
                                :name="product.data.productName"
                                :description="product.data.description"
                                :tags="product.data.tags"
                                :category="product.data.category">
                            </SingleProduct>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>       
    </div>
  </div>
</template>

<script>
import db from '../db';
import AddToCart from '../components/AddToCart';
import SingleProduct from '../components/SingleProduct';


export default {
    name: "Products",
    props: {
        msg: String
    },
    components:{AddToCart,SingleProduct},
  data(){
      return{
          products:[],
          selectedProduct:{},
          selectedProductId:'',
          selectedProductImage:'',
          quantity:1,
          temp:10,
      }
  },
  methods:{
      add(){
          this.quantity++;
      },
      sub(){
          if(this.quantity > 1){
              this.quantity--;
          }
      },
      
      
  },
  async mounted(){
    //fetches all the data for once in a reload 
    const snapShot = await db.collection("Products").get();
    snapShot.forEach((doc)=>{
        const id = doc.id;
        let dataInfo = {id, ...doc.data()};
        this.products.push(dataInfo);
    });
    
  },



};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
    .cw-32{
        width: 32%;
    }
</style>