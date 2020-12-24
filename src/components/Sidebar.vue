<template>
    <div :class="!showSidebar?'wrapper-close':'wrapper-open'" class="border bg-dark border-dark border-bottom-0 border-top-0 border-left-0">
        <!-- <p :style="!showSidebar?'display:none':''">Sidebar components</p> -->
        <div :style="!showSidebar?'display:none':''">
            <ul class="p-0 my-3">
                <router-link  v-for="category in categories" :key="category.id" class="link text-decoration-none text-white" :to="{name:'categories', params:{slug:category.slug}}">{{category.name}}</router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import db from '../db';
export default {
    props:{
        showSidebar:Boolean,
    },
    data(){
        return{
            opneSidebar:this.showSidebar,
            categories:[],
        }
    },
    async mounted(){
        const snapShot = await db.collection("Categories").get();
        snapShot.forEach((doc)=>{
            const id = doc.id;
            let dataInfo = {id, ...doc.data()};
            this.categories.push(dataInfo);
        });
    }
}
</script>

<style lang="scss" scoped>
    .wrapper-open{
        height: 100%;
        position: fixed;
        z-index: 1;
        width: 15%;
        background: black;
        color: white;
        transition: ease .2s;
    }
    .wrapper-close{
        height: 100%;
        position: fixed;
        width: 0%;
        background: black;
        color: white;
        transition: ease .2s;
    }
    .link{
        display: block;
        padding: 1rem;
        color: #cbc5c5 !important;
    }
    .link:hover{
        transition: 0.4s ease;
        cursor: pointer;
        background: #222121;
    }
</style>