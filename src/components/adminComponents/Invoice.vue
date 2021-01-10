<template>
    <div class="wrapper">
        <div class="d-flex justify-content-end my-3">
            <button class="btn btn-info btn-sm" @click.prevent="pdfDownload()" type="button"><i class="pi pi-download"></i>&nbsp;&nbsp;Download As PDF</button>
        </div>
        <div ref="invoice">
            <div class="header">
                <div class="company-details">
                    <h2 class="mb-3">Your Company Name</h2>
                    <div class="contacts">
                        <div class="address">
                            <p>Dhali Bari Road</p>
                            <p>Bashundhara R/A</p>
                            <p>Dhaka,Bangladesh</p>
                            <p>3500</p>
                        </div>
                        <div class="digital-contacts">
                            <p><i class="pi pi-envelope" style="fontSize: 1rem"></i> companyemail@gmail.com</p>
                            <p><i class="pi pi-globe" style="fontSize: 1rem"></i> www.companyname.inc</p>
                        </div>
                    </div>
                </div>
                <div class="company-logo">
                    <i class="fa fa-desktop fa-5x" aria-hidden="true"></i>
                </div>
            </div>
            <div class="billing-info">
                <h5>Billed To:</h5>
                <p>{{order.billingInfo.firstName}}{{order.billingInfo.lastName}}</p>
                <p>{{order.billingInfo.address}}</p>
                <p>{{order.billingInfo.city}}-{{order.billingInfo.zip}}</p>
                <p><i class="pi pi-mobile" style="fontSize: 1rem"></i> 01839224536</p>
                <p><i class="pi pi-envelope" style="fontSize: 1rem"></i> {{order.billingInfo.email}}</p>
            </div>
            <div class="invoice">
                <div class="invoice-info">
                    <div class="mb-4">
                        <h2>INVOICE</h2>
                        <p># {{order.orderInfo.invoiceId}}</p>
                    </div>
                    <div>
                        <h5>Date of Issue</h5>
                        <p>{{order.orderInfo.orderDate}}</p>
                    </div>
                </div>
                <div class="product-table">
                    <table class="table table-hover table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Unit Cost</th>
                                <th>Quantity</th>
                                <th>Ammount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.orderInfo.purchasedItems" :key="item.itemId">
                                <td scope="row">{{item.itemName}}</td>
                                <td>${{item.itemPrice}}</td>
                                <td>{{item.itemQuantity}}</td>
                                <td>${{+item.itemPrice * item.itemQuantity}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pricing">
                        <div class="d-flex justify-content-between">
                            <p>SUBTOTAL:</p>
                            <p>${{order.orderInfo.totalPrice}}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>DISCOUNT:</p>
                            <p>{{order.orderInfo.discount}}%</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>(TAX RATE):</p>
                            <p>{{order.orderInfo.tax}}%</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p>TAX:</p>
                            <p>{{+order.orderInfo.discountedPrice * (order.orderInfo.tax/100)}}</p>
                        </div>
                        <div class="dash">
                        </div>
                        <p>INVOICE TOTAL</p>
                        <h5>${{(+order.orderInfo.discountedPrice * order.orderInfo.tax/100)+(+order.orderInfo.discountedPrice)}}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

import Tooltip from 'primevue/tooltip';
export default {
    directives: {
        'tooltip': Tooltip
    },
    data(){
        return{
            order:{},
        }
    },
    methods:{
        pdfDownload(){
            let opt = {
                margin:       [0.5,0.5],
                filename:     'invoice.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(this.$refs.invoice).save('invoice');
        }
    },
    created(){
        this.order =  JSON.parse(atob(this.$route.query.order));
        console.log(this.order);
    },
    mounted(){
        console.log(this.$refs.invoice)
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        width: 80%;
        margin: auto;
    }
    p{
        margin-bottom: .3em;
    }
    .header{
        text-align: left;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2em;
        p{
            text-align: left;
            margin-bottom: .3em;
        }
        .company-details{
            width: 33%;
        }
        .contacts{
            display: flex;
            justify-content: space-between;
        }
    }
    .billing-info{
        margin-bottom: 2em;
        text-align: left;
    }
    .invoice{
        display: flex;
        text-align: left;
        .invoice-info{
            width: 20%;
        }
        .product-table{
            width: 80%;
            text-align: center;
            .pricing{
                width: 29%;
                float: right;
                // margin-right: 12%;
                p{
                    font-size: 0.8rem;
                }
            }
            .dash{
                border-bottom: 1px solid;
                width: 100%;
                margin: 5px auto;
            }

        }
    }
</style>