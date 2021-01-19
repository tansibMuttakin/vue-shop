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
                                <small v-if="item.itemDiscountedPrice!=''" class="text-muted float-left"><del>$ {{item.itemPrice}}</del></small>
                                <small v-else class="text-muted float-left">$ {{item.itemPrice}}</small>
                                <br>
                                <small v-if="item.itemDiscountedPrice!=''" class="text-muted float-left font-weight-bold">$ {{item.itemDiscountedPrice}}</small>
                            </div>
                            <span v-if="item.itemDiscount && item.itemDiscount!= '' " class="text-muted">$ {{(item.itemPrice-(item.itemPrice * item.itemDiscount/100))*(item.itemQuantity)}}</span>
                            <span v-else class="text-muted">$ {{(item.itemPrice)*(item.itemQuantity)}}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between bg-secondary text-white">
                                <span>Total (USD)</span>
                                <strong v-if="discountApplied">${{discountedPrice}}</strong>
                                <strong v-else>${{totalPrice}}</strong>
                            </li>
                        </ul>
                        <small class="d-flex mb-2">use&nbsp;<b>BIJOY25</b>&nbsp;to get 25% off on total price.</small>

                        <form class="card p-2">
                            <div class="input-group">
                                <input type="text" v-model="promo" class="form-control" placeholder="Promo code">
                                <div class="input-group-append">
                                    <button @click.prevent="applyDiscount()" type="submit" class="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form>
                        <div ref="error-message" style="display:none">
                            <p class="d-flex my-2 text-danger">invalid cuppon code</p>
                        </div>
                        <div ref="sucess-message" style="display:none">
                            <p class="d-flex my-2 text-success">Cuppon code added successfully</p>
                        </div>
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
                                    <label for="city">City</label>
                                    <!-- <select class="custom-select d-block w-100" id="country" v-model="billingInfo.city" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select> -->
                                    <input type="text" class="form-control" id="city" v-model="billingInfo.city" placeholder="City">
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="area">Area</label>
                                    <input type="text" class="form-control" id="area" v-model="billingInfo.area" placeholder="Area">
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
                                <!-- <input type="radio" id="one" value="One" v-model="picked">
                                <label for="one">One</label>
                                <br>
                                <input type="radio" id="two" value="Two" v-model="picked" checked>
                                <label for="two">Two</label>
                                <br>
                                <span>Picked: {{ picked }}</span> -->
                                <div class="d-flex custom-control custom-radio">
                                    <input id="cod" value="cash-on-delivery" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="cod">Cash On Delivery</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="credit" value="credit-card" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="debit" value="debit-card" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="bkash" value="bkash" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="bkash">Bkash</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="nagad" value="nagad" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="nagad">Nagad</label>
                                </div>
                                <div class="d-flex custom-control custom-radio">
                                    <input id="rocket" value="rocket" v-model="paymentInfo.paymentMethod" type="radio" class="custom-control-input" required>
                                    <label class="custom-control-label" for="rocket">Rocket</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" v-model="paymentInfo.nameOnCard" placeholder="" required>
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                    Name on card is required
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" v-model="paymentInfo.creditCardNumber" placeholder="" required>
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" v-model="paymentInfo.expiration" placeholder="" required>
                                    <div class="invalid-feedback">
                                    Expiration date required
                                    </div>
                                </div>
                            <div class="col-md-3 mb-3">
                                <label for="cc-expiration">CVV</label>
                                <input type="text" class="form-control" v-model="paymentInfo.cvv" id="cc-cvv" placeholder="" required>
                                <div class="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                            </div>
                            <hr class="mb-4">
                            <button class="btn btn-primary btn-lg btn-block" @click.prevent="makeTransaction()" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>

                <footer class="my-5 pt-5 text-muted text-center text-small">
                    <p class="mb-1">&copy; 2016-2021 WEABERS</p>
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
import db from '../db';
// import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default {
    components:{Navbar,Sidebar,Login},
    data(){
        return{
            showSidebar:false,
            message:'Login/Rgesiter to complete the order',
            order:{},
            a:'',
            orderInfo:{
                invoiceId:'',
                orderDate:'',
                status:'unpaid',
                purchasedItems:[],
                totalPrice:'',
                discount:25,//hard coded integer
                tax:2, //hard coded integer
                discountedPrice:'',
            },
            deliveryInfo:{
                deliveryStatus:'pending'
            },
            billingInfo:{
                firstName:'',
                lastName:'',
                email:'',
                address:'',
                optionalAddress:'',
                city:'',
                area:'',
                zip:'',
            },
            paymentInfo:{
                paymentMethod:'',
                nameOnCard:'',
                cvv:'',
                expiration:'',
                creditCardNumber:''
            },
            picked:'',
            promo:'',
            discountApplied:false,
            invoiceNum:'',
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
        },
        applyDiscount(){
            if (this.promo=='BIJOY25') {
                this.discountApplied = true;
                this.$refs['sucess-message'].style.display="block";
                this.$refs['error-message'].style.display="none";
            }
            else{
                this.discountApplied = false;
                this.$refs['sucess-message'].style.display="none";
                this.$refs['error-message'].style.display="block";
            }
        },
        async makeTransaction(){
            if (this.$store.state.cart.length == 0) {
                Toast.fire({
                    icon: 'warning',
                    title: 'OOPS! Your cart in empty!'
                });
                return;
            }
            const user = firebase.auth().currentUser;
            if (user) {
                // extracting user info- start
                const userData = await db.collection("Accounts").doc(user.uid).get();
                let id = userData.id;
                let userInfo = {id,...userData.data()};
                // extracting user info - end

                //setting orderInfo-start

                this.orderInfo.orderDate = new Date();
                this.orderInfo.invoiceId = 'VS'+ uuidv4();
                this.orderInfo.totalPrice = this.totalPrice;
                this.orderInfo.discountedPrice = this.discountedPrice;
                if (this.paymentInfo.paymentMethod!='cash-on-delivery') {
                    
                    this.orderInfo.status = 'paid'; //hard coded
                }
                this.orderInfo.purchasedItems= this.$store.state.cart;
                //setting order info - end

                this.order.orderInfo = this.orderInfo;
                this.order.deliveryInfo = this.deliveryInfo;
                this.order.userInfo = userInfo;
                this.order.billingInfo = this.billingInfo;
                this.order.paymentInfo = this.paymentInfo;
                console.log(this.order);
                await db.collection("Orders").add(this.order);
                // try {
                // } catch (error) {
                //     console.log(error);
                // }
                
                this.order={};

                this.invoiceNum = this.$store.state.invoiceNum;

                Toast.fire({
                    icon: 'success',
                    title: 'Order placed successfully'
                });
                this.$store.commit('emptyCart');
                this.billingInfo = {};
                this.orderInfo={};
                this.paymentInfo={};
            }
            else {
                $("#login-modal").modal('show');
            }
        },
        increase(){
            this.$store.commit('setInvoice');
            console.log(this.$store.state.invoiceNum);
        },
        
        
    },
    computed:{
        totalPrice(){
            let totalPrice = 0;
            this.$store.state.cart.map(el=>{
                if (el.itemDiscountedPrice && el.itemDiscountedPrice!='') {
                    
                    totalPrice += el.itemDiscountedPrice * (+el.itemQuantity);
                }
                else{

                    totalPrice += el.itemPrice * el.itemQuantity;
                }
            });
            return totalPrice;
        },
        discountedPrice(){
            
            return this.totalPrice-this.totalPrice*.25;
        },
    },
    mounted(){
        this.paymentInfo.paymentMethod = 'cash-on-delivery';
    },
    
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