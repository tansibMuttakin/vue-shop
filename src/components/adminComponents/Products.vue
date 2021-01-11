<template>
    <div class="container">
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6">
                    <h3>Products Page</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, laboriosam. Illum qui nostrum veniam culpa quisquam praesentium atque id placeat veritatis explicabo quae, unde natus neque reprehenderit quaerat? Optio, dolores!</p>
                </div>
                <div class="col-md-6">
                    <img class="img-fluid" src="/img/svg/products.svg" alt="">
                </div>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <h3>Product list</h3>
            <button class="btn btn-primary btn-sm" @click="showAddModal()">Add Product</button>
        </div>
        <hr>
        <table class="table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Modify</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product,index) in products" :key="index">
                    <td>
                        <img class="rounded" :src="product.data().images" alt="" width="70">
                    </td>
                    <td>{{product.data().productName}}</td>
                    <td>{{product.data().category.name}}</td>
                    <td>{{product.data().price}}</td>
                    <td>
                        <button class="btn btn-info btn-sm mx-1" @click="edit(product)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="destroy(product)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Add Modal -->
    <div class="modal fade" id="add" tabindex="-1" role="dialog" aria-labelledby="add" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="row" enctype="multipart/form-data">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Product Name</label>
                            <input type="email" v-model="product.productName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="product name">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Categories</label>
                            <select class="form-control" v-model="selected" @change="onSelectItem()">
                                <option value="" disabled selected>select category</option>
                                <option v-for="category in categories" :key="category.id" :value="category">{{category.data().name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="product.description" rows="6" style="resize:none;"></textarea>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputPassword1">Price</label>
                            <input type="text" v-model="product.price" class="form-control" id="exampleInputPassword1" placeholder="price">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputPassword1">Discount/Offer(%)</label>
                            <input type="text" v-model="product.discount" class="form-control" id="exampleInputPassword1" placeholder="discount in %">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="productTags">Tags</label>
                            <input type="text" v-model="tag" class="form-control" id="productTags" placeholder="select tags">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlFile1">Product Image</label>
                            <input type="file" @change="uploadImage" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                        <div class="form-group d-flex">
                            <div class="p-1" v-for="(image, index) in product.images" :key="index">
                                <div class="img-wrapp">
                                    <img :src="image" alt="" style="width:80px">
                                    <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addProduct()">Save</button>
            </div>
            </div>
        </div>
    </div>
    <!-- Edit Modal -->
    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="row" enctype="multipart/form-data">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Product Name</label>
                            <input type="email" v-model="product.productName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="product name">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputEmail1">Categories</label>
                            <select class="form-control" v-model="selected" @change="onSelectItem()">
                                <!-- <option value="" selected disabled>select category</option> -->
                                <option :selected="category.data().name==selected.name" v-for="category in categories" :key="category.id" :value="category">{{category.data().name}}</option>
                            </select>
                        </div>
                    
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="product.description" rows="6" style="resize:none;"></textarea>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputPassword1">Price</label>
                            <input type="text" v-model="product.price" class="form-control" id="exampleInputPassword1" placeholder="price">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleInputPassword1">Discount/Offer(%)</label>
                            <input type="text" v-model="product.discount" class="form-control" id="exampleInputPassword1" placeholder="discount in %">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="productTags">Tags</label>
                            <input type="text" v-model="product.tags" class="form-control" id="productTags" placeholder="select tags">
                        </div>
                        <div class="form-group">
                            <label class="d-flex" for="exampleFormControlFile1">Product Image</label>
                            <input type="file" @change="uploadImage" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                        <div class="form-group d-flex">
                            <div class="p-1" v-for="(image, index) in product.images" :key="index">
                                <div class="img-wrapp">
                                    <img :src="image" alt="" style="width:80px">
                                    <span class="delete-img" @click="deleteImage(image,index)">X</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="update()">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../../db';
import $ from 'jquery';
import Toast from '../../sweetAlart';
import Swal from 'sweetalert2';
import firebase from '../../firebase';

export default {
  name: "Products",
  props: {
    msg: String
  },
  data(){
    return{
        product:{
            productName:'',
            description:'',
            price:'',
            discount:'',
            discountedPrice:'',
            tags:[],
            images:[],
            category:{},
        },
        category:{
            name:'',
            description:''
        },
        selected:'',
        products:[],
        updatedProducts:[],
        categories:[],
        updatedCategories:[],
        activeProductId:'',
        tag:'',
        user_id:''
    }
  },
  methods:{
    reset(){
        this.product={
            productName:'',
            description:'',
            price:'',
            discount:'',
            discountedPrice:'',
            tags:[],
            images:[],
            category:{},
        },
        this.selected='';
    },
    showAddModal(){
        this.reset();
        $('#add').modal('show');
    },
    addTag(){
        this.product.tags = this.tag.split(",");
        this.tag = '';
    },
    addProduct(){
        this.setDiscountPrice();
        this.addTag();
        const docref = db.collection("Products");
        docref.add(this.product).then( ()=>{
            this.products.push(this.product)
            console.log("Product created successfully");
            $('#add').modal('hide');
            this.product.productName = '';
            this.product.description = '';
            this.product.tags = [];
            this.product.price = '';
            this.product.discount = '';
            this.product.discountedPrice = '';
            this.product.images = [];
            this.activeProductId='';
            this.product.category={},
            this.selected = ''
            Toast.fire({
                icon: 'success',
                title: 'Product added successfully',
            });
        })
        .catch((error)=>{
            console.error("Error adding document: ", error);
        });
    },
    setDiscountPrice(){
        if (this.product.discount && this.product.discount !='') {
            
            this.product.discountedPrice = this.product.price-(this.product.price * this.product.discount/100);
        }
        else{
            this.product.discountedPrice = ''
        }
    },
    uploadImage(e){
        console.log(e.target.files);
        if (e.target.files[0]) {
            
            let file = e.target.files[0];
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('products/'+file.name).put(file);
            // uploadTask.on('state_changed',()=>{
            //     // Handle successful uploads on complete
            //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
            //         this.product.image = downloadURL
            //         console.log('link=>', this.product.image);
            //     });
            // });
            uploadTask.on('state_changed', ()=>{
                
            }, function(error) {
                // Handle unsuccessful uploads
                console.log(error);
            }, ()=> {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    this.product.images.push(downloadURL);
                    console.log('File available at', downloadURL);
                });
            });
        }
    },
    deleteImage(image,index){
        let img = firebase.storage().refFromURL(image);
        //remove image from the array
        this.product.images.splice(index,1);
        // Delete the file
        img.delete().then(()=> {
            console.log('image removed successfully');
        }).catch((error)=> {
            console.log(error);
        });
    },
    readData(){
        db.collection("Products").onSnapshot((doc)=>{
            console.log("Current data: ", doc.data());
        });
    },
    edit(product){
        this.product = product.data();
        this.selected = this.product.category;
        this.activeProductId = product.id;
        $('#edit').modal('show');
    },
    update(){
        this.setDiscountPrice();
        db.collection("Products").doc(this.activeProductId).update(this.product)
        .then(()=>{
            console.log("Product updated successfully");
            $('#edit').modal('hide');
            Toast.fire({
                icon: 'success',
                title: 'Updated successfully'
            });
            this.product.productName = '';
            this.product.description = '';
            this.product.tags = [];
            this.product.price = '';
            this.product.discount = '';
            this.product.discountedPrice = '';
            this.product.images = [];
            this.product.category={};
            this.activeProductId='';
            this.selected='';
        })
        .catch((error)=>{
            console.error("Error updating document: ", error);
        });
    },
    destroy(product){
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
                db.collection("Products").doc(product.id).delete().then(()=> {
                    Toast.fire({
                        icon: 'success',
                        title: 'Deleted successfully'
                    })
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        })
    },
    onSelectItem(){
        this.product.category = this.selected.data();
    },
  },
  mounted(){
    this.user_id = firebase.auth().currentUser.uid;
    //listen to any changes made in firestore
    db.collection("Products").onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            // doc.data() is never undefined for query doc snapshots
            this.updatedProducts.push(doc);
        });
        this.products = this.updatedProducts;
        this.updatedProducts=[];
    });
    db.collection("Categories").onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            // doc.data() is never undefined for query doc snapshots
            this.updatedCategories.push(doc);
        });
        this.categories = this.updatedCategories;
        this.updatedCategories=[];
    });
  },

};
</script>

<style scoped lang="scss">
    .img-wrapp{
        position: relative;
    }
    .img-wrapp span.delete-img{
        position: absolute;
        top: -3px;
        left: 2px;
    }
    .img-wrapp span.delete-img:hover{
        cursor: pointer;
        color: red;
    }
</style>