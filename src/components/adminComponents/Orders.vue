<template>
    <div class="container">
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <h3>Orders Page</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, laboriosam. Illum qui nostrum veniam culpa quisquam praesentium atque id placeat veritatis explicabo quae, unde natus neque reprehenderit quaerat? Optio, dolores!</p>
                </div>
                <div class="col-md-6">
                    <img class="img-fluid" src="/img/svg/orders.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div v-if="isLoading">
            <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
        </div>
        <div v-else class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Order Id</th>
                        <th>Invoice-Id</th>
                        <th>purchased</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="orders.length!= 0">
                    <tr v-for="(order,index) in orders" :key="order.id">
                        <td>{{++index}}</td>
                        <td>{{order.id}}</td>
                        <td style="width:15%">{{order.orderInfo.invoiceId}}</td>
                        <td>{{order.orderInfo.purchasedItems.length}} - items</td>
                        <td>{{order.orderInfo.orderDate}}</td>
                        <td>${{order.orderInfo.totalPrice}}</td>
                        <td>
                            <p class="badge badge-success">{{order.orderInfo.status}}</p>
                        </td>
                        <td class="d-flex" style="justify-content:space-evenly">
                            <!-- <i class="pi pi-download" v-tooltip.top="'download invoice'"></i> -->
                            <i class="pi pi-eye" @click="viewInvoice(order)" v-tooltip.top="'view invoice'"></i>
                            <i class="pi pi-info-circle" v-tooltip.top="'edit order'"></i>
                            <i class="pi pi-trash" @click="deleteOrder(order)" v-tooltip.left="'delete order'"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="orders.length== 0" class="w-100 mt-5 text-align-center">
                <h3>NO ORDER TO DISPLAY</h3>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../db';
import Tooltip from 'primevue/tooltip';
import Toast from '../../sweetAlart';

export default {
    directives: {
        'tooltip': Tooltip
    },
    data(){
        return{
            orders:[],
            updatedOrders:[],
            isLoading:false,
        }
    },
    methods:{
        viewInvoice(order){
            this.$router.push({
                name:'invoice',
                params:{orderId:order.id,},
                query:{order:btoa(JSON.stringify(order))}
            });
        },
        async deleteOrder(order){
            await db.collection("Orders").doc(order.id).delete();
            Toast.fire({
                icon: 'success',
                title: 'Order removed successfully'
            })

        }
    },
    mounted(){
        this.isLoading = true;
        db.collection("Orders").onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let id = doc.id;
                const orderInfo = {id,...doc.data()};
                this.updatedOrders.push(orderInfo);
            })
            this.orders = this.updatedOrders;
            this.updatedOrders=[];
            this.isLoading=false;
        });
        console.log(this.$refs.invoice)
        
        // const orders = await db.collection("Orders").get();
        // orders.forEach((doc)=>{
        //     let id = doc.id;
        //     const orderInfo = {id,...doc.data()};
        //     this.updatedOrders.push(orderInfo);
        //     console.log(doc.data());
        // })
        // this.orders = this.updatedOrders;
        // this.updatedOrders=[];
        // this.isLoading=false;
    }

}
</script>

<style lang='scss' scoped>
    
</style>