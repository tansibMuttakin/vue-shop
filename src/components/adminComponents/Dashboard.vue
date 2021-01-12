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
                  <h4 class="border rounded p-3 bg-warning text-white">83</h4>
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
                  <h5>Revenue</h5>
                  <p>Income in total</p>
                </div>
                <div>
                  <h4 class="border rounded p-3 bg-info text-white">$983456823</h4>
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
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
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
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
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
      totalRevenue:'',
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
  }
};
</script>

<style>

</style>