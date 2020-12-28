<template>
    <div class="container">
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <h3>Category Page</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, laboriosam. Illum qui nostrum veniam culpa quisquam praesentium atque id placeat veritatis explicabo quae, unde natus neque reprehenderit quaerat? Optio, dolores!</p>
                </div>
                <div class="col-md-6">
                    <img class="img-fluid" src="/img/svg/overview.svg" alt="">
                </div>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <h3>Category list</h3>
            <button class="btn btn-primary" @click="showAddModal()">Add Category</button>
        </div>
        <hr>
        <table class="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category,index) in categories" :key="index">
                    <td>{{++index}}</td>
                    <td>{{category.data().name}}</td>
                    <td>{{category.data().description}}</td>
                    <td>
                        <button class="btn btn-info" @click="edit(category)">Edit</button>
                        <button class="btn btn-danger" @click="destroy(category)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Add Category Modal -->
    <div class="modal fade" id="addCategory" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="row" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Category Name</label>
                            <input type="email" v-model="category.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="category name">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="category.description" rows="5" style="resize:none;"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addCategory()">Save</button>
            </div>
            </div>
        </div>
    </div>
    <!-- Edit Category Modal -->
    <div class="modal fade" id="editCategory" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Update Category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="row" enctype="multipart/form-data">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Category Name</label>
                            <input type="email" v-model="category.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="category name">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="category.description" rows="5" style="resize:none;"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="updateCategory()">Save Changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../db';
import Swal from 'sweetalert2';
import Toast from '../../sweetAlart'
import $ from "jquery";
export default {
    data(){
        return{
            category:{
                name:'',
                description:'',
                slug:'',
            },
            categories:[],
            updatedCategories:[],
            activeCategoryId:null
        }
    },
    methods:{
        showAddModal(){
            this.category.name = '';
            this.category.description = '';
            $("#addCategory").modal("show");
        },
        addCategory(){
            if (/\s/.test(this.category.name)) {
                
                this.category.slug = this.category.name.replace(/\s/g, "-").toLowerCase();
            }
            else{
                
                this.category.slug = this.category.name.toLowerCase();
            }
            this.categories.push(this.category);
            db.collection("Categories").add(this.category).then(()=>{
                this.categories.push(this.category);
                $("#addCategory").modal("hide");
                this.category.name = '';
                this.category.description = '';
                Toast.fire({
                    icon: 'success',
                    title: 'Category added successfully',
                });
            })
            .catch((error)=>{
                console.error("Error adding document: ", error);
            });
        },
        edit(category){
            this.category = category.data();
            this.activeCategoryId = category.id;
            $('#editCategory').modal('show');
        },
        updateCategory(){
            if (/\s/.test(this.category.name)) {
                
                this.category.slug = this.category.name.replace(/\s/g, "-").toLowerCase();
            }
            else{
                
                this.category.slug = this.category.name.toLowerCase();
            }

            db.collection("Categories").doc(this.activeCategoryId).update(this.category).then(()=>{
                $('#editCategory').modal('hide');
                Toast.fire({
                    icon: 'success',
                    title: 'Category updated successfully'
                });
                this.category.name = '';
                this.category.description = '';
                this.activeCategoryId='';
            })
            .catch((error)=>{
                console.error("Error updating document: ", error);
            });
        },
        destroy(category){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            
                if (result.isConfirmed) {
                    db.collection("Categories").doc(category.id).delete().then(()=> {
                        Toast.fire({
                            icon: 'success',
                            title: 'Category deleted successfully'
                        })
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                }
            })
        },
    },
    mounted(){
        // this.user_id = firebase.auth().currentUser.uid;
        //listen to any changes made in firestore
        db.collection("Categories").onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                // doc.data() is never undefined for query doc snapshots
                this.updatedCategories.push(doc);
            });
            this.categories = this.updatedCategories;
            this.updatedCategories=[];
        });
    }
}
</script>

<style>

</style>