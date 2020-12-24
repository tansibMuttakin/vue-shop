<template>
    <div v-if="!buttonLarge" class="d-flex">
        <button v-if="isAlreadyAdded()" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i> Added</button>
        <button v-else class="btn btn-primary btn-sm" @click="addToCart()">Add to cart</button>
    </div>
    <div v-else>
        <button v-if="isAlreadyAdded()" class="btn btn-success px-5" style="height:100%"><i class="fa fa-check" aria-hidden="true"></i> Added</button>
        <button v-else @click="addToCart()" class="btn btn-info px-5" style="height:100%">Add to cart</button>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    props:{
        name:String,
        price:String,
        productId:String,
        productImage:String,
        buttonLarge:{
            type:Boolean,
            default:false,
        },
        productQuantity:{
            type:Number,
            default:1,
        }
    },
    methods:{
        addToCart(){
            $(`#${this.item.itemId}`).modal("hide");
            $('#cart-modal').modal("show");
            this.$store.commit('addToCart',this.item);
        },
        isAlreadyAdded(){
            let found = this.$store.state.cart.find(item => item.itemId == this.item.itemId);
            if (found) {
                return true;
            }
        },
    },
    computed:{
        item:{
            get(){
                return{
                    itemName:this.name,
                    itemPrice:this.price,
                    itemId:this.productId,
                    itemImage:this.productImage,
                    itemQuantity:this.productQuantity,
                }
            }
        },
    }
}
</script>

<style>

</style>