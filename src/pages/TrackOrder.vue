<template>
    <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
    <Sidebar :showSidebar="showSidebar"></Sidebar>
    <div class="container my-5">
        <div v-for="(order,index) in activeOrders" :key="index" class="card mt-3" :class="showSidebar?'cml-228':'cml-0'">
            <div class="d-flex justify-content-between p-5">
                <Timeline :status="order.deliveryInfo.deliveryStatus"></Timeline>

                <div class="text-left order-info">
                    <p class="mb-1">Order Id: {{order.id}}</p>
                    <p class="mb-1">Invoice Id: {{order.orderInfo.invoiceId}}</p>
                    <p class="mb-1">Price in Total: ${{order.orderInfo.totalPrice}}</p>
                    <p class="mb-1">Items:</p>
                    <p class="mb-1" v-for="(item,index) in order.orderInfo.purchasedItems" :key="index">
                        <small>{{item.itemName}} X {{item.itemQuantity}}</small>
                    </p>
                </div>
            </div>
            <div class="progress">
                <div v-if="order.deliveryInfo.deliveryStatus=='pending'" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                    <p class="m-0">50%</p>
                </div>
                <div v-if="order.deliveryInfo.deliveryStatus=='processing'" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 75%;" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <p class="m-0">75%</p>
                </div>
                <div v-if="order.deliveryInfo.deliveryStatus=='delivered'" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                    <p class="m-0">100%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import db from '../db';

import Timeline from '../components/Timeline';
// import Timeline from 'primevue/timeline';

export default {
    components:{Navbar,Sidebar,Timeline},
    data(){
        return {
            showSidebar:false,
            activeOrderCount:'',
            activeOrders:[],
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
    async created(){
        let orders =  await (await db.collection("Orders").get()).docs;
        let activeOrderCount = 0;
        orders.forEach((doc)=>{
            let id = doc.id;
            if (doc.data().deliveryInfo.deliveryStatus != 'delivered') {
                let order = {id, ...doc.data()};
                this.activeOrders.push(order);
                activeOrderCount++;
            }
        });
        this.activeOrderCount = activeOrderCount;
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
    .order-info p{
        font-size:1.2em;
    }
</style>