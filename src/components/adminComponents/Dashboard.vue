<template>
  <div class="container">
    <div class="d-flex justify-content-between mt-2">
      <div>
        <Card style="width: 20em; margin-bottom: 2em; ">
            
            <template #content>
              <div class="d-flex justify-content-between">
                <div class="text-left">
                  <h5>Users</h5>
                  <p>Number of total User</p>
                </div>
                <div>
                  <h4 class="border rounded p-3 bg-success text-white">{{totalUser}}</h4>
                </div>
              </div>
            </template>
        </Card>
      </div>
      <div>
        <Card style="width: 20em; margin-bottom: 2em">
          <template #content>
              <div class="d-flex justify-content-between">
                <div class="text-left">
                  <h5>Sales</h5>
                  <p>Number of total sales</p>
                </div>
                <div>
                  <h4 class="border rounded p-3 bg-warning text-white">{{totalSales}}</h4>
                </div>
              </div>
          </template>
        </Card>
      </div>
      <div>
        <Card style="width: 20em; margin-bottom: 2em">
          <template #content>
              <div class="d-flex justify-content-between">
                <div class="text-left">
                  <h5>Sales last month</h5>
                  <p>sales in amount</p>
                </div>
                <div>
                  <h4 class="border rounded p-3 bg-info text-white">${{lastMonthSale}}</h4>
                </div>
              </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="mb-4">
      <Card>
        <template #title>
          <div class="text-left">
            <h5>Sales vs Month</h5>
          </div>
        </template>
        <template #content>
          <Chart type="bar" :data="basicData" :options="options"/>
        </template>
      </Card>
    </div>
    <div class="row mb-2">
      <div class="col-md-6">
        <Card>
          <template #title>
            <div class="text-left p-2 bg-dark text-white">
              <h5>Recent Orders</h5>
            </div>
          </template>
          <template #content>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">purchsed Items</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order,index) in recentOrders" :key="order.id">
                  <td>{{++index}}</td>
                  <td>{{order.id}}</td>
                  <td>{{order.data().orderInfo.purchasedItems.length}}</td>
                  <td>${{order.data().orderInfo.totalPrice}}</td>
                  <td>{{order.data().orderInfo.status}}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </Card>
      </div>
      <div class="col-md-6">
        <Card>
          <template #title>
            <div class="text-left p-2 bg-dark text-white">
              <h5>Recent Added Users</h5>
            </div>
          </template>
          <template #content>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Roles</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) in recentAddedUser" :key="user.id">
                  <td>{{++index}}</td>
                  <td>{{user.data().name}}</td>
                  <td>{{user.data().email}}</td>
                  <td>
                    <ul class="p-0">
                      <li class="list-unstyled" v-for="(role,index) in user.data().roles" :key="index">- {{role.name}}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import db from '../../db';
export default{
  components:{Card,Chart},
  data(){
    return{
      basicData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augast', 'September', 'October','November', 'December'],
				datasets: [
					{
						label: 'last year',
						backgroundColor: '#42A5F5',
						data: [65, 59, 80, 81, 56, 55, 48, 70, 65, 80, 45, 63]
					},
					{
						label: 'current year',
						backgroundColor: '#9CCC65',
						data: [28, 48, 40, 19, 86, 27, 90]
					}
				]
      },
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        scales: {
          yAxes: [{
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
          },
          {
              type: 'linear',
              display: false,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                  drawOnChartArea: true
              }
          }]
        }
      },
      totalUser:'',
      totalSales:'',
      lastMonthSale:'',
      recentOrders:'',
      recentAddedUser:'',
    }
  },
  computed:{
    salesLastMonth(){
      
      return 0
    }
  },
  async created(){
    let count = 0;
    let users = await db.collection('Accounts').get();
    users.forEach((user)=>{
      let roles = user.data().roles;
      roles.forEach((role)=>{
        if (role.name == 'customer') {
          count++;
        }
      })
    })
    this.totalUser = count;

    //recent order table
    const ordersRecent = await db.collection("Orders").orderBy("orderInfo.orderDate","desc").limit(5).get();
    this.recentOrders = ordersRecent.docs;

    //recent user table
    const recentUsers = await db.collection('Accounts').orderBy('created_at','desc').limit(5).get();
    this.recentAddedUser = recentUsers.docs;

    //total sales
    let totalSell = await db.collection('Orders').where('orderInfo.status','==','paid').get();
    this.totalSales = totalSell.docs.length;

    // let a = await db.collection('Orders').where('orderInfo.status','==','paid')
    // .where('orderInfo.orderDate','==',).get();
    // console.log(a.docs[0].data());
    let currentDate = new Date();
    let lastMonthSaleCount = 0;
    let orders = await db.collection('Orders').where('orderInfo.status','==','paid').get();
    orders.docs.forEach((order)=>{
      let date = order.data().orderInfo.orderDate.toDate();
      if(new Date(currentDate.getFullYear(), currentDate.getMonth()-1) <= date && date < new Date(currentDate.getFullYear(), currentDate.getMonth())) {
        lastMonthSaleCount += order.data().orderInfo.totalPrice;
      }
    })
    this.lastMonthSale = lastMonthSaleCount;
    // let date = a.data().orderInfo.orderDate.toDate();

    // console.log(new Date(currentDate.getFullYear(),currentDate.getMonth()-1,currentDate.getDate()));
  }
};
</script>

<style>

</style>