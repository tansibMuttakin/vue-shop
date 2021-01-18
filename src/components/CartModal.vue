<template>
    <div class="modal fade" id="cart-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <span><i class="pi pi-shopping-cart" style="fontSize: 2rem"></i>&nbsp;&nbsp;&nbsp;</span>
                <h5 class="modal-title" id="exampleModalCenterTitle">Shopping Bag</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div v-if="$store.state.cart.length" class="modal-body">
                <!-- <ul>
                    <li v-for="item in $store.state.cart" :key="item.itemId" class="media">
                        <img :src="item.itemImage" alt="" width="60" class="rounded-circle">
                        <div class="media-body">
                            <p class="mt-0 mb-1 d-flex justify-content-between ml-1">
                                {{item.itemName}}
                                <i class="fa fa-plus-circle" aria-hidden="true" @click="addItemQuantity(item)"></i>
                                <span class="mt-0 mb-1 d-flex ml-1 pointer">{{item.itemQuantity}}</span>
                                <i class="fa fa-minus-circle" aria-hidden="true" @click="subItemQuantity(item)"></i>
                                <span class="trash" @click="removeItem(item)"><i class="fas fa-trash"></i></span>
                            </p >
                        </div>
                    </li>
                </ul> -->
                <table class="table table-borderless">
                    <tbody rules=none >
                        <tr v-for="item in $store.state.cart" :key="item.itemId" class="media d-flex justify-content-around text-left">
                            <!-- <td>
                                <img :src="item.itemImage" alt="" width="40" class="rounded-circle">
                            </td> -->
                            <td class="w-50 ">{{item.itemName}}</td>
                            <td class=""><i class="fa fa-plus-circle" aria-hidden="true" @click="addItemQuantity(item)"></i></td>
                            <td class="" style="width:10%"><span class="mt-0 mb-1 d-flex ml-1 pointer">{{item.itemQuantity}}</span></td>
                            <td class=""><i class="fa fa-minus-circle" aria-hidden="true" @click="subItemQuantity(item)"></i></td>
                            <td class=""><span class="trash" @click="removeItem(item)"><i class="fas fa-trash"></i></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="modal-body">
                <h5>Shopping bag is cleared</h5>
                <img src="/img/svg/shopping-cart.svg" width="100" alt="">
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <div>
                    <button type="button" class="btn btn-secondary" @click="clearCart()">Clear All</button>
                </div>
                <div>
                    <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal">Continue</button>
                    <button type="button" @click="checkOut()" class="btn btn-primary">Check-Out</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
 methods:{
    checkOut(){
        console.log(this.$store.state.cart);
        $("#cart-modal").modal("hide");
        this.$router.replace('/checkout');
    },
    removeItem(item){
        this.$store.commit('removeItemFromCart',item)
    },
    clearCart(){
        this.$store.commit('emptyCart');
    },
    addItemQuantity(item){
        this.$store.commit('addItemQuantity',item)
    },
    subItemQuantity(item){
        this.$store.commit('subItemQuantity',item)
    }
 }
}
</script>

<style>
i{
    cursor: pointer;
}
.trash:hover{
    color: red;
}
</style>