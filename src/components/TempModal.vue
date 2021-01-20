<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Order</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-left">
        <div class="row">
          <div class="form-group col-md-6">
            <label for="">First Name</label>
            <input type="text"
              class="form-control" name="" id="" aria-describedby="helpId" placeholder="" 
              v-model="billingInfo.firstName">
          </div>
          <div class="form-group col-md-6">
            <label for="">Last Name</label>
            <input type="text"
              class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
              v-model="billingInfo.lastName">
          </div>
        </div>
        <div class="form-group">
          <label for="">Address</label>
          <input type="text"
            class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
            v-model="billingInfo.address">
        </div>
        <div class="form-group">
          <label for="">Address(Optional)</label>
          <input type="text"
            class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
            v-model="billingInfo.optionalAddress">
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="">Payment Status</label>
            <select :disabled="paymentInfo.paymentMethod == 'cash-on-delivery'?false:true" class="form-control" name="" id="" v-model="orderInfo.status">
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <small>Payment Method: {{paymentInfo.paymentMethod}}</small>
          </div>
          <div class="form-group col-md-6">
            <label for="">Delivery Status</label>
            <select class="form-control" name="" id="" v-model="deliveryInfo.deliveryStatus">
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click.prevent="update()">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import db from '../db';
import $ from 'jquery';

export default {
  props:{
    id:String,
  },
  data(){
    return{
      orderId:this.id,
      billingInfo:{},
      paymentInfo:{},
      deliveryInfo:{},
      orderInfo:{},
    }
  },
  methods:{
    async update(){
      await db.collection("Orders").doc(this.id).update({
        deliveryInfo: this.deliveryInfo,
        billingInfo: this.billingInfo,
        orderInfo: this.orderInfo,
      });
      
      $(`#${this.id}`).modal("hide");
    }
  },
  async created(){
    let order = await db.collection("Orders").doc(this.id).get();
    this.billingInfo = order.data().billingInfo;
    this.paymentInfo = order.data().paymentInfo;
    this.deliveryInfo = order.data().deliveryInfo;
    this.orderInfo = order.data().orderInfo;
  }
}
</script>

<style>

</style>