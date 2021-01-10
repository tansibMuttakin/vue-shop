<template>
  <div class="row">
    <div class="container">
      <hr>
      <div class="d-flex justify-content-between">
          <h3>Roles</h3>
          <button @click="addRoles()" class="btn btn-primary btn-sm">Add Roles</button>
      </div>
      <hr>
      <table class="table">
        <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(role,index) in roles" :key="role.id">
                <td>{{++index}}</td>
                <td>{{role.name}}</td>
                <td style="width:30%">{{role.description}}</td>
                <td>
                    <button class="btn btn-info btn-sm mx-1" @click="edit(role)">Edit</button>
                    <button class="btn btn-danger btn-sm" @click="destroy(role)">Delete</button>
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
                <button type="button" class="btn btn-primary" @click="updateRole()">Save</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Toast from '../../sweetAlart';
import db from '../../db';
import Swal from 'sweetalert2';

export default {
    data(){
        return{
            role:{
                name:'',
                description:'',
            },
            roles:[],
            updatedRoles:[],
            activeRoleId:'',
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
        async destroy(role){
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
                await db.collection("Roles").doc(role.id).delete();
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                });
            }
      
        },
        edit(role){
            this.role.name = role.name;
            this.role.description = role.description;
            this.activeRoleId = role.id;
            $("#editRoles").modal("show");
        },
        async updateRole(){
            await db.collection("Roles").doc(this.activeRoleId).update(this.role);
            $("#editRoles").modal("hide");
            this.activeRoleId='';
            Toast.fire({
                icon: 'success',
                title: 'updated successfully'
            });
        }
    },
    mounted(){
        db.collection("Roles").onSnapshot((querySnapshot)=>{
            querySnapshot.forEach(doc => {
                let id = doc.id;
                const rolesData = {id,...doc.data()};
                this.updatedRoles.push(rolesData);
            });
            this.roles=this.updatedRoles;
            this.updatedRoles=[];
        })
    }
}
</script>

<style>

</style>