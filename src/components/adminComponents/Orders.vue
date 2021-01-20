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
                        <th>Date(DD-MM-YYYY)</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Delivery</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="orders.length!= 0">
                    <tr v-for="(order,index) in orders" :key="order.id">
                        <td>{{++index}}</td>
                        <td>
                            {{order.id}}
                            <br>
                            <small>Order By - {{order.userInfo.name}}</small>
                        </td>
                        <td style="width:15%">{{order.orderInfo.invoiceId}}</td>
                        <td>{{order.orderInfo.purchasedItems.length}} - items</td>
                        <td>
                            {{order.orderInfo.orderDate.toDate().getDate()}}
                            -{{order.orderInfo.orderDate.toDate().getMonth()+1}}
                            -{{order.orderInfo.orderDate.toDate().getFullYear()}}
                        </td>
                        <td>${{order.orderInfo.discountedPrice + order.orderInfo.discountedPrice*(2/100)}}</td>
                        <td>
                            <p v-if="order.orderInfo.status=='paid'" class="badge badge-success m-0">{{order.orderInfo.status}}</p>
                            <p v-else class="badge badge-warning m-0">{{order.orderInfo.status}}</p>
                            <br>
                            <small>Paid By: {{order.paymentInfo.paymentMethod}}</small>
                        </td>
                        <td>
                            <p v-if="order.deliveryInfo.deliveryStatus=='pending'" class="badge badge-warning">{{order.deliveryInfo.deliveryStatus}}</p>
                            <p v-if="order.deliveryInfo.deliveryStatus=='delivered'" class="badge badge-success">{{order.deliveryInfo.deliveryStatus}}</p>
                            <p v-if="order.deliveryInfo.deliveryStatus=='cancelled'" class="badge badge-danger">{{order.deliveryInfo.deliveryStatus}}</p>
                            <p v-if="order.deliveryInfo.deliveryStatus=='processing'" class="badge badge-info">{{order.deliveryInfo.deliveryStatus}}</p>
                            <p v-if="order.deliveryInfo.deliveryStatus=='returned'" class="badge badge-dark">{{order.deliveryInfo.deliveryStatus}}</p>
                        </td>
                        <td class="d-flex" style="justify-content:space-evenly; width:10em">
                            <i class="pi pi-eye" @click="viewInvoice(order)" v-tooltip.top="'view invoice'"></i>
                            <i class="pi pi-info-circle" @click="editOrder(order)" v-tooltip.top="'edit order status'"></i>
                            <i class="pi pi-trash" @click="deleteOrder(order)" v-tooltip.top="'delete order'"></i>
                        </td>
                        <TempModal :id="order.id"></TempModal>
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
import $ from 'jquery';
import TempModal from '../TempModal';

export default {
    directives: {
        'tooltip': Tooltip
    },
    components:{TempModal},
    data(){
        return{
            orders:[],
            updatedOrders:[],
            isLoading:false,
        }
    },
    methods:{
        viewInvoice(order){
            let orderIssueDate = order.orderInfo.orderDate.toDate().getDate()
            +'-'+(order.orderInfo.orderDate.toDate().getMonth()+1)
            +'-'+order.orderInfo.orderDate.toDate().getFullYear();              
            this.$router.push({
                name:'invoice',
                params:{orderId:order.id},
                query:{
                    issuDate:orderIssueDate,
                    order:btoa(JSON.stringify(order)),
                }
            });
        },
        async deleteOrder(order){
            await db.collection("Orders").doc(order.id).delete();
            await db.collection("Deliveries").doc(order.id).delete();
            Toast.fire({
                icon: 'success',
                title: 'Order removed successfully'
            })
        },
        editOrder(order){
            $(`#${order.id}`).modal('show');
        },
    },
    mounted(){
        this.isLoading = true;
        db.collection("Orders").onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                let id = doc.id;
                const orderInfo = {id,...doc.data()};
                this.updatedOrders.push(orderInfo);
            });
            this.orders = this.updatedOrders;
            this.updatedOrders=[];
            this.isLoading=false;
        });
    }
}
</script>

<style lang='scss' scoped>
    
</style>