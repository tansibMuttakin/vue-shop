<template>
    <div class="d-flex">
        <button @click="show()" class="btn btn-info btn-sm">Show details</button>
    </div>
    <div class="modal fade bd-example-modal-xl" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between">
                        <div class="w-50 d-flex" style="height:400px">
                            <img :src="images[0]" width="400" alt="">
                        </div>
                        <div class="w-50">
                            <div class="d-flex mb-2">
                                <h5 class="font-weight-bold">{{item.itemName}}</h5>
                            </div>
                            <div class="d-flex">
                                <p>${{item.itemPrice}}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <button class="border rounded p-3" @click.prevent="add()" type="button"><i class="fa fa-plus fa-2x" aria-hidden="true"></i></button>
                                    <h5 class="mx-5 my-0 d-flex align-items-center">{{quantity}}</h5>
                                    <button class="border rounded p-3" @click="sub()" type="button"><i class="fa fa-minus fa-2x" aria-hidden="true"></i></button>
                                </div>
                                <AddToCart
                                    :product-image="images[0]"
                                    :product-id="item.itemId"
                                    :price="item.itemPrice"
                                    :name="item.itemName"
                                    :button-large="true"
                                    :product-quantity="quantity">
                                </AddToCart>
                            </div>
                            <hr>
                            <div class="d-flex ml-0 text-left overflow-auto" style="height:12em">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam incidunt temporibus eaque ducimus, vitae, autem, ut culpa nisi officiis maiores minima exercitationem? Reprehenderit amet, atque impedit hic commodi numquam voluptatum?
                                Dignissimos nostrum cumque sapiente quis veritatis a cupiditate, earum veniam voluptates esse expedita nam. Nostrum, distinctio, quas ut a magnam consequatur dicta iure natus fugiat recusandae ipsum mollitia. Obcaecati, modi?
                                Sunt ea nesciunt veniam officiis magni delectus quia hic laborum repellendus aut, autem distinctio, mollitia adipisci quod eos quo! Eum quas numquam blanditiis minus voluptates nisi doloremque illo exercitationem sunt!
                                Atque suscipit dicta sit repellendus eaque mollitia ex, perspiciatis assumenda voluptas natus quam, doloribus vel beatae pariatur cupiditate hic a magnam incidunt cum tempore esse! Quaerat fugiat cum sequi cupiditate.
                                Vero ut autem, voluptatum eveniet adipisci fuga praesentium! Perspiciatis sapiente in similique. Animi at ab expedita, nemo qui atque amet pariatur, quos alias maiores est? Non, enim vero! Iste, dolorum.
                                Similique, consequatur? Velit vel, maiores odio nam labore illo sed rerum incidunt architecto corrupti, voluptatibus facere? Temporibus, esse officia quo a, ea fugit commodi excepturi cumque reprehenderit deleniti porro illum.
                                Quos deserunt temporibus nulla sunt exercitationem repudiandae in quo expedita voluptatem eaque qui, repellat debitis impedit ipsa odit nesciunt atque recusandae numquam tenetur asperiores cupiditate quod labore est? Optio, recusandae.
                                Iste aliquid libero tempore? Corporis necessitatibus sit magnam dolore, iure sunt neque quidem commodi vel corrupti nisi doloremque omnis. Praesentium mollitia rerum ipsum quidem voluptas vitae voluptatem animi odit voluptates.
                                Perferendis debitis fugit autem. Quisquam, asperiores unde, sequi animi alias sed sunt dolorem aliquid, facilis vero atque corporis. Veritatis debitis sed, dolor dicta quo fugiat reiciendis expedita quidem facere aspernatur?
                                Saepe quasi, a accusantium assumenda et sapiente omnis commodi ipsam explicabo quo, perferendis odit minima fugiat asperiores laudantium dicta. Mollitia ea dolorum modi iure exercitationem cum quidem quis, distinctio sequi.
                                Dolore est ratione animi amet voluptate? Amet deserunt impedit totam accusantium quis quod ad quae delectus cum molestiae. Optio, veritatis. Consequatur quasi veritatis voluptas quidem cumque perspiciatis vel, autem incidunt.
                                Perferendis nostrum ullam aliquam enim delectus veniam architecto temporibus, quia minima consequuntur possimus error inventore, esse velit fugiat repellendus in tempora, labore eveniet necessitatibus officiis. Molestiae nulla perspiciatis debitis voluptatibus.
                                Sit possimus eaque natus magnam, ex reiciendis facilis? Perspiciatis, ipsum est libero dolores iure voluptatem eum cumque suscipit consequatur, in incidunt optio ducimus minima possimus modi impedit? Magni, expedita officia.
                                Dolor saepe magnam officiis. Provident quaerat maiores, at ipsam eos vel saepe natus odit ex inventore, accusamus voluptas voluptate a aliquam. Fugiat in explicabo officia eos eius magnam doloribus suscipit?
                                Nulla temporibus, repudiandae, quas consequatur facilis atque tempora rerum, provident incidunt placeat quam reiciendis quod voluptates exercitationem! Deserunt recusandae asperiores commodi dicta, blanditiis iure itaque quisquam saepe tenetur sit possimus!
                                Accusantium quaerat atque soluta deserunt? Quis provident ullam, magnam autem aliquam pariatur placeat aliquid repudiandae dolorum at ipsam sequi alias soluta ratione aperiam maxime. Natus, nobis amet? Sit, perspiciatis a?
                                Aliquid, beatae, dolorem voluptatem ipsum illo corporis iste a praesentium numquam adipisci ratione reiciendis non modi error velit laboriosam quaerat enim? Consequuntur sapiente voluptatum amet impedit in aliquid vitae perferendis.
                                Nobis laudantium voluptatem quae quis quisquam? Porro vel quia dolorum cum illum quod accusantium. Nostrum officiis odio dolores ratione illum cum distinctio temporibus maiores consequuntur! Laboriosam in illum obcaecati? Hic?
                                Aliquid accusamus praesentium quibusdam! Error veritatis quod dolorem consequuntur quos tempore aliquam ratione magni incidunt veniam, omnis rem a sapiente nostrum modi culpa quo animi! Fugit quisquam similique consequatur aut?
                                Amet ut odio saepe quaerat sit eum, nulla, voluptatum modi eveniet beatae sint dolores delectus alias, atque temporibus cupiditate vitae distinctio esse veniam culpa ullam. Laudantium quo architecto quam est!
                                Facere culpa dolor quisquam iure libero pariatur? Cumque, incidunt recusandae eligendi minima, praesentium ipsam aliquid commodi ipsum vel quasi possimus aperiam! Corporis doloribus aperiam dolorem quidem rem eum magnam vero!</p>
                            </div>
                            <div class="my-2">
                                <p class="text-left font-weight-bold">Category: <span class="font-weight-normal font-italic">{{item.itemCategory.name}}</span></p>
                            </div>
                            <div class="my-2">
                                <p class="text-left font-weight-bold">Tags:</p>
                                <ul class="d-flex list-group list-group-horizontal-sm">
                                    <li v-for="(tag,index) in item.itemTags" :key="index" class="list-group-item">{{tag}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddToCart from '../components/AddToCart';
import $ from 'jquery';
export default {
    components:{AddToCart},
    props:{
        name:String,
        price:String,
        id:String,
        images:Array,
        tags:Array,
        description:String,
        category:Object,
    },
    data(){
        return{
            item:{
                itemName:this.name,
                itemPrice:this.price,
                itemId:this.id,
                itemImages:this.images,
                itemDescription:this.description,
                itemTags:this.tags,
                itemCategory:this.category,
            },
            quantity:1,
        }
    },
    methods:{
        show(){
            $(`#${this.id}`).modal('show');
        },
        add(){
          this.quantity++;
        },
        sub(){
            if(this.quantity > 1){
                this.quantity--;
            }
        },
    },
    mounted(){

    }
}
</script>

<style>

</style>