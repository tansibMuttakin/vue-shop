<template>
    <div class="checkout">
        <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
        <div class="d-flex">
            <Sidebar :showSidebar="showSidebar"></Sidebar>
            <div :class="showSidebar?'cml-228':'cml-0'" class="container mt-5 flex-grow-1 flex-shrink-1">

                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Your cart</span>
                            <span class="badge badge-secondary badge-pill">{{$store.state.cart.length}}</span>
                        </h4>
                        <ul class="list-group mb-3">
                            <li v-for="item in $store.state.cart" :key="item.itemId" class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">{{item.itemName}} <small class="text-muted">X {{item.itemQuantity}}</small></h6>
                                <small class="text-muted float-left">$ {{item.itemPrice}}</small>
                            </div>
                            <span class="text-muted">$ {{(item.itemPrice)*(item.itemQuantity)}}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between bg-secondary text-white">
                            <span>Total (USD)</span>
                            <strong>${{totalPrice}}</strong>
                            </li>
                        </ul>

                        <form class="card p-2">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Promo code">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-secondary">Redeem</button>
                            </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-8 order-md-1 text-left">
                        <h4 class="mb-3">Billing address</h4>
                        <form class="needs-validation">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" class="form-control" id="firstName" v-model="billingInfo.firstName" placeholder=""  required>
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="" v-model="billingInfo.lastName" required>
                                    <div class="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email">Email <span class="text-muted">(Optional)</span></label>
                                <input type="email" class="form-control" v-model="billingInfo.email" id="email" placeholder="you@example.com">
                                <div class="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="address">Address</label>
                                <input type="text" class="form-control" v-model="billingInfo.address" id="address" placeholder="1234 Main St" required>
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                                <input type="text" class="form-control" id="address2" v-model="billingInfo.optionalAddress" placeholder="Apartment or suite">
                            </div>

                            <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select class="custom-select d-block w-100" id="country" v-model="billingInfo.country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select class="custom-select d-block w-100" id="state" v-model="billingInfo.state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input type="text" class="form-control" id="zip" v-model="billingInfo.zip" placeholder="" required>
                                    <div class="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4">
                            <div class="d-flex custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="same-address">
                                <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div class="d-flex custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="save-info">
                                <label class="custom-control-label" for="save-info">Save this information for next time</label>
                            </div>
                            <hr class="mb-4">

                            <h4 class="d-flex mb-3">Payment</h4>

                            <div class="d-block my-3">
                                <div class="d-flex custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                                    <label class="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="paypal">Paypal</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" required>
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                    Name on card is required
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="" required>
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                                    <div class="invalid-feedback">
                                    Expiration date required
                                    </div>
                                </div>
                            <div class="col-md-3 mb-3">
                                <label for="cc-expiration">CVV</label>
                                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                                <div class="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                            </div>
                            <hr class="mb-4">
                            <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>

                <footer class="my-5 pt-5 text-muted text-center text-small">
                    <p class="mb-1">&copy; 2017-2018 Company Name</p>
                    <ul class="list-inline">
                    <li class="list-inline-item"><a href="#">Privacy</a></li>
                    <li class="list-inline-item"><a href="#">Terms</a></li>
                    <li class="list-inline-item"><a href="#">Support</a></li>
                    </ul>
                </footer>
            </div>
        </div>
        <Login>
            <template v-slot:header>
                Please Login to complete the order
            </template>
        </Login>
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/Login';
import firebase from '../firebase';
import $ from 'jquery';
import Toast from '../sweetAlart';
export default {
    components:{Navbar,Sidebar,Login},
    data(){
        return{
            showSidebar:false,
            message:'Login/Rgesiter to complete the order',
            billingInfo:{
                firstName:'',
                lastName:'',
                email:'',
                address:'',
                optionalAddress:'',
                country:'',
                state:'',
                zip:'',
            }
        }
    },
    methods:{
        removeItem(item){
            this.$store.commit('removeItemFromCart',item)
        },
        sidebarVisible(){
            if (this.showSidebar) {
                return this.showSidebar = false;
            } else {
                return this.showSidebar = true;
            }
        },
        checkout(){
            firebase.auth().onAuthStateChanged((user)=>{
                if (user) {
                    this.$store.commit("emptyCart");
                    Toast.fire({
                        icon: 'success',
                        title: 'Order placed successfully'
                    })

                } else {
                    $("#login-modal").modal('show');
                }
            })
        }
    },
    computed:{
        totalPrice(){
            let totalPrice = 0;
            this.$store.state.cart.map(el=>{
                totalPrice += el.itemPrice*el.itemQuantity;
            });
            return totalPrice;
        }
    }
}
</script>

<style lang="scss" scoped>
    .cml-228{
        margin-left: 228px;
        transition: .3s ease;
    }
    .cml-0{
        // margin-left: 0;
        transition: .3s ease;
    }
</style>