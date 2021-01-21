<template>
  <div class="container">
    <div class="w-50 mx-auto mt-5">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Promo/Cuppons</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Vat/Tax</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <div class="row">
            <div class="form-group col-md-12 text-left">
              <label for="">Promo Code</label>
              <input type="text" v-model="coupon.code" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Promo Code">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12 text-left">
              <label for="">Discount Amount(%)</label>
              <input type="text" v-model="coupon.discount" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Discount %">
            </div>
          </div>
          <button type="button" @click.prevent="setDiscount()" class="btn btn-primary float-right btn-sm">Save</button>
        </div>

        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div class="row">
            <div class="form-group col-md-12 text-left">
              <label for="">Vat Ammount(%)</label>
              <input type="text" v-model="vat.vatPercentage" class="form-control" name="" id="" aria-describedby="helpId" placeholder="VAT %">
            </div>
          </div>
          <button type="button" @click.prevent="setTax()" class="btn btn-primary float-right btn-sm">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../db';
import Toast from '../../sweetAlart';
export default {
  data(){
    return{
      coupon:{
        code:'',
        discount:'',
      },
      vat:{
        vatPercentage:''
      }
    }
  },
  methods:{
    async setDiscount(){
      this.coupon.code = this.coupon.code.replace(/\s+/g, '').toUpperCase();
      console.log(typeof(this.coupon.discount));
      switch (typeof(this.coupon.discount)) {
        case 'number':
          await db.collection("Coupons").doc('coupon').set(this.coupon);
          Toast.fire({
            icon: 'success',
            title: 'saved!!!'
          })
          break;
        case 'string':
          this.coupon.discount = +this.coupon.discount.replace(/\s+/g, '');
          if(this.coupon.code !='' && !isNaN(this.coupon.discount)){        
            await db.collection("Coupons").doc('coupon').set(this.coupon);
            Toast.fire({
              icon: 'success',
              title: 'saved!!!'
            })
          }
          break;
      }

    },
    async setTax(){
      this.vat.vatPercentage = +this.vat.vatPercentage.replace(/\s+/g, '');
      if(this.vat.vatPercentage !='' && !isNaN(this.vat.vatPercentage)){        
        await db.collection("Coupons").doc("vat").set(this.vat);
        Toast.fire({
          icon: 'success',
          title: 'saved!!!'
        })
      }
    },
  },
  async created(){
    let coupon = await db.collection("Coupons").doc('coupon').get();
    this.coupon = coupon.data();
    let vat = await db.collection("Coupons").doc('vat').get();
    this.vat = vat.data()
  }
}
</script>

<style>

</style>