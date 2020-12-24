<template>
    <Navbar @toggle-sidebar="sidebarVisible()"></Navbar>
    <div class="d-flex">
        <Sidebar :showSidebar="showSidebar"></Sidebar>
        <div :class="showSidebar?'cml-228':'cml-0'" class="flex-grow-1 flex-shrink-1">
            <h1>About Page</h1>
            <div class="container">
                <Carousel :value="cars" :numVisible="3" :numScroll="1" :circular="true" :autoplayInterval="3000">
                    <template #header>
                        <h2>Circular, AutoPlay</h2>
                    </template>
                    <template #item="slotProps">
                        <div class="card">
                            <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                            <p>{{slotProps.data.name}}</p>
                            <div class="p-d-flex p-jc-between">
                                <button>Add to card</button>
                                <button>shoe details</button>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Carousel from 'primevue/carousel';
import 'primeflex/primeflex.css';
import Sidebar from '../components/Sidebar';

export default {
    components:{Navbar,Carousel,Sidebar},
    data(){
        return{
            showSidebar:false,
            cars:[
                {name:"vovlo"},
                {name:"farrari"},
                {name:"range rover"},
                {name:"ford"},
                {name:"toyota"},
                {name:"mitsubishi"},
                {name:"mercedese"},
            ],
        }
    },
    methods:{
        sidebarVisible(){
            if (this.showSidebar) {
                return this.showSidebar = false;
            } else {
                return this.showSidebar = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .cml-228{
        margin-left: 228px;
        transition: .3s ease;
    }
    .cml-0{
        margin-left: 0;
        transition: .3s ease;
    }
</style>