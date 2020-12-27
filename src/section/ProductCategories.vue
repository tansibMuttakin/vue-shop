<template>
    <div class="container my-4">
        <p class="m-0" style="font-size:x-large">Our Product Categories</p>
    </div>
    <div class="container d-flex flex-wrap flex-gap">
        <div v-for="(category,index) in categories" :key="index" class="category-wrapper border d-flex justify-content-center align-items-center">
            <router-link class="m-0 text-decoration-none text-dark" :to="{name:'categories', params:{slug:category.slug}}"
            style="width: 100%;padding: 1.3rem;">
                {{category.name}}
            </router-link>
        </div>
    </div>
</template>

<script>
import db from '../db'
export default {
    data(){
        return{
            categories:[],
        }
    },
    async mounted(){
        const docref = await db.collection("Categories").get();
        docref.forEach(docs => {
            this.categories.push(docs.data());
        });
    }
}
</script>

<style lang="scss" scoped>
.category-wrapper{
    border-radius: .25em;
    height: 4rem;
    width: 18em;
    cursor: pointer;
}.category-wrapper:hover{
    background: #f2f2f2;
}
.flex-gap{
    gap:1em;
}

</style>