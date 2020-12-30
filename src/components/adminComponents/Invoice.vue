<template>
    <div class="wrapper">
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
                        <p>companyemail@gmail.com</p>
                        <p>www.companyname.inc</p>
                    </div>
                </div>
            </div>
            <div class="company-logo">
                <i class="fa fa-desktop fa-5x" aria-hidden="true"></i>
            </div>
        </div>
        <div class="billing-info">
            <h5>Billed To:</h5>
            <p>Tansib-Al-Muhaimin</p>
            <p>Kachpur,Naryanganj</p>
            <p>Dhaka,Bangladesh</p>
            <p>1200</p>
        </div>
        <div class="invoice">
            <div class="invoice-info">
                <div class="mb-4">
                    <h2>INVOICE</h2>
                    <p># VS1000001</p>
                </div>
                <div>
                    <h5>Date of Issue</h5>
                    <p>31-12-2020</p>
                </div>
            </div>
            <div class="product-table">
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Ammount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">scawda</td>
                            <td>$345</td>
                            <td>2</td>
                            <td>$690</td>
                        </tr>
                        <tr>
                            <td scope="row">scawda</td>
                            <td>$345</td>
                            <td>2</td>
                            <td>$690</td>
                        </tr>
                        <tr>
                            <td scope="row">scawda</td>
                            <td>$345</td>
                            <td>2</td>
                            <td>$690</td>
                        </tr>
                        <tr>
                            <td scope="row">scawda</td>
                            <td>$345</td>
                            <td>2</td>
                            <td>$690</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pricing">
                    <div class="d-flex justify-content-between">
                        <p>SUBTOTAL:</p>
                        <p>$128</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>DISCOUNT:</p>
                        <p>25%</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>(TAX RATE):</p>
                        <p>2%</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>TAX:</p>
                        <p>200</p>
                    </div>
                    <div class="dash">
                    </div>
                    <p>INVOICE TOTAL</p>
                    <h5>$2400</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .wrapper{
        width: 70%;
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
            width: 30%;
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
                margin-right: 12%;
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