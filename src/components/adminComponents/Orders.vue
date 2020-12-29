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
        <div class="row">
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
                <tbody>
                    <tr v-for="(order,index) in orders" :key="order.id">
                        <td>{{++index}}</td>
                        <td>{{order.id}}</td>
                        <td>{{order.orderInfo.invoiceId}}</td>
                        <td>{{order.orderInfo.purchasedItems.length}} - items</td>
                        <td>{{order.orderInfo.orderDate}}</td>
                        <td>${{order.orderInfo.totalPrice}}</td>
                        <td>
                            <p class="badge badge-success">{{order.orderInfo.status}}</p>
                        </td>
                        <td class="d-flex" style="justify-content:space-evenly">
                            <i class="pi pi-download" v-tooltip.top="'download invoice'"></i>
                            <i class="pi pi-eye" v-tooltip.top="'view invoice'"></i>
                            <i class="pi pi-info-circle" v-tooltip.top="'edit order'"></i>
                            <i class="pi pi-trash" v-tooltip.left="'delete order'"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import db from '../../db';
import Tooltip from 'primevue/tooltip';

export default {
    directives: {
        'tooltip': Tooltip
    },
    data(){
        return{
            orders:[],
            updatedOrders:[],
        }
    },
    async mounted(){
        // db.collection("Orders").onSnapshot((querySnapshot)=>{
        //     querySnapshot.forEach((doc)=>{
        //         let id = doc.id;
        //         const orderInfo = {id,...doc.data()};
        //         this.updatedOrders.push = orderInfo;
        //     })
        //     this.orders = this.updatedOrders;
        //     this.updatedOrders=[];
        // });
        const orders = await db.collection("Orders").get();
        orders.forEach((doc)=>{
            let id = doc.id;
            const orderInfo = {id,...doc.data()};
            this.updatedOrders.push(orderInfo);
            console.log(doc.data());
        })
        this.orders = this.updatedOrders;
        this.updatedOrders=[];
    }

}
</script>

<style lang='scss' scoped>
    
</style>