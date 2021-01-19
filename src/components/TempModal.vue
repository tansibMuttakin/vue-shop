<template>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
              class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
          </div>
          <div class="form-group col-md-6">
            <label for="">Last Name</label>
            <input type="text"
              class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
          </div>
        </div>
        <div class="form-group">
          <label for="">Address</label>
          <input type="text"
            class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
        </div>
        <div class="form-group">
          <label for="">Address(Optional)</label>
          <input type="text"
            class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
        </div>
        <div class="row">
          <div class="form-group col-md-6">
            <label for="">Payment Status</label>
            <select class="form-control" name="" id="">
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="">Delivery Status</label>
            <select class="form-control" name="" id="">
              <option>Pending</option>
              <option>Delivered</option>
              <option>Declined</option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import db from '../db';

export default {
  props:{
    id:String,
  },
  data(){
    return{
      orderId:this.id,
      order:{
        firstName:'',
        lastName:'',
        address:'',
        city:'',
        area:'',
        optionalAddress:'',
        zip:'',
        paymentStatus:'',
        deliveryStatus:'',
      }
    }
  },
  async created(){
    let order = await db.collection("Orders").doc(this.id).get();
    console.log(order.data());
  }
}
</script>

<style>

</style>