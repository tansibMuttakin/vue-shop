<template>
  products based on category will be displayed here
  <p>{{$route.params}}</p>
  
</template>

<script>
import db from '../db';
export default {
    data(){
        return{
            slug:this.$route.params.slug,
            products:[],
        }
    },
    async mounted(){

        const snapShot = await db.collection("Categories").where("slug","==",this.slug).get();
        const category = snapShot.docs[0].data();
        const Products = await db.collection("Products").where("category.name","==","Mobile Accessories").get();
        // snapShot.forEach((doc)=>{
        //     if ((doc.data().category.name)==this.slug) {
        //         console.log("yes");
        //         const id = doc.id;
        //         let dataInfo = {id, ...doc.data()};
        //         this.products.push(dataInfo);
        //     }
        // });
        console.log(Products);
        console.log(category.name);
    },
}
</script>

<style>

</style>