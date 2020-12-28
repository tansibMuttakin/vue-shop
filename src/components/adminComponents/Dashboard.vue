<template>
  <div class="row">
    <div class="form-group col-md-12">
        <h2>Vue-Shop Admin</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem repellendus repudiandae corporis fugit perferendis fuga ab ut minus quibusdam, quaerat nesciunt, amet unde alias perspiciatis ullam eius aperiam expedita numquam.</p>
    </div>
  </div>
  <div class="row">
    <div class="container">
      <hr>
        <div class="d-flex justify-content-between">
            <h3>User&Roles</h3>
            <button @click="addRoles()" class="btn btn-primary">Add Roles</button>
        </div>
        <hr>
        <table class="table">
          <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(user,index) in users" :key="user.id">
                  <td>{{++index}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>
                    <ul>
                      <li v-for="(role,index) in user.roles" :key="index">{{role.name}}</li>
                    </ul>
                  </td>
                  <td>
                      <button class="btn btn-info" @click="edit(user)">Edit</button>
                      <button class="btn btn-danger" @click="destroy(user)">Delete</button>
                  </td>
              </tr>
          </tbody>
        </table>
    </div>
  </div>
  <!-- Add roles Modal -->
  <div class="modal fade" id="addRoles" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add Roles</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form class="row" enctype="multipart/form-data">
                  <div class="col-md-12">
                      <div class="form-group">
                          <label class="d-flex" for="exampleInputEmail1">Role Name</label>
                          <input type="text" v-model="role.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="role name">
                      </div>
                      <div class="form-group">
                          <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" v-model="role.description" rows="3" style="resize:none;"></textarea>
                      </div>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveRole()">Save</button>
          </div>
          </div>
      </div>
  </div>
  <!-- edit user Modal -->
  <div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit User</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form class="row" enctype="multipart/form-data">
                  <div class="col-md-12">
                      <div class="form-group">
                          <label class="d-flex" for="exampleInputName">Name</label>
                          <input type="text" v-model="user.name" class="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="user name">
                      </div>
                      <div class="form-group">
                          <label class="d-flex" for="exampleInputEmail1">Email</label>
                          <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="user email">
                      </div>
                  </div>
                  <div class="col-md-8">
                    <div>
                      <label class="d-flex" >Roles</label>
                      <MultiSelect class="float-left" v-model="user.roles" :options="roles" optionLabel="name" placeholder="Select Roles" display="chip"/>
                    </div>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="updateUser()">Save</button>
          </div>
          </div>
      </div>
  </div>
  <!-- edit roles Modal -->
  <div class="modal fade" id="editRoles" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit Roles</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form class="row" enctype="multipart/form-data">
                  <div class="col-md-12">
                      <div class="form-group">
                          <label class="d-flex" for="exampleInputEmail1">Role Name</label>
                          <input type="text" v-model="role.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="role name">
                      </div>
                      <div class="form-group">
                          <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" v-model="role.description" rows="3" style="resize:none;"></textarea>
                      </div>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveRole()">Save</button>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect';
import Swal from 'sweetalert2';
import db from '../../db';
import Toast from '../../sweetAlart';
import $ from 'jquery';

export default {
  components:{MultiSelect},
  data(){
    return{
      user:{
        name:'',
        email:'',
        roles:[]
      },

      users:[],
      roles:[],
      updatedUsers:[],
      activeUserId:'',

      role:{
        name:'',
        description:'',
      },
    }
  },
  methods:{
    addRoles(){
      this.clearRoleField();
      $("#addRoles").modal("show");
    },
    async saveRole(){
      await db.collection("Roles").add(this.role);
      $("#addRoles").modal("hide");
      this.clearRoleField();
      Toast.fire({
        icon: 'success',
        title: 'Role created successfully'
      });
    },
    clearRoleField(){
      this.role.name='';
      this.role.description='';
    },
    edit(user){
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.roles = user.roles;
      this.activeUserId = user.id;
      $("#editUser").modal("show");
    },
    async updateUser(){
      await db.collection("Accounts").doc(this.activeUserId).update(this.user);
      $("#editUser").modal("hide");
      this.activeUserId='';
      Toast.fire({
        icon: 'success',
        title: 'updated successfully'
      });
    },

    async destroy(user){
      const deleteConfirm = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
      if (deleteConfirm.isConfirmed) {
        await db.collection("Accounts").doc(user.id).delete();
        Toast.fire({
          icon: 'success',
          title: 'Deleted successfully'
        });
      }
      
    }
  },
  mounted(){
    db.collection("Accounts").onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            // doc.data() is never undefined for query doc snapshots
            let id = doc.id;
            let userData = {id, ...doc.data()};
            this.updatedUsers.push(userData);
        });
        this.users = this.updatedUsers;
        this.updatedUsers=[];
    });

    db.collection("Roles").get().then((docs)=>{
      docs.forEach(doc => {
        // let id = doc.id;
        const rolesData = doc.data();
        this.roles.push(rolesData);
      });
    })
    
  }
}
</script>

<style>

</style>