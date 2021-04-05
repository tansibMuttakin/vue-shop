<template>
	<Timeline :value="events" align="right">
		<template #content="slotProps">
			{{slotProps.item.status}}
		</template>
	</Timeline>
</template>

<script>
import Timeline from 'primevue/timeline';
export default {
    components:{Timeline},
    props:{
        status:String,
    },
    data(){
        return {
            orderStatus:'',
            events: [
                {status: 'Ordered'},
                {status: 'Pending'},
                {status: 'Processing'},
                {status: 'Delivered'}
            ],
        }
    },
    methods:{
        setTimeLine(status){
            let doc =  document.querySelectorAll(".p-timeline-event-separator");
            if (status=='pending') {
               doc['0'].children[0].style.background = 'green';
               doc['0'].children[1].style.background = 'green';
               doc['1'].children[0].style.background = 'green';
            //    console.log(doc['0'].children[0]);
            }
            else if (status=='processing') {
                console.log('hi');
            }
        }
    },
    created(){
        this.orderStatus = this.status;
    },
    mounted(){
        this.setTimeLine(this.orderStatus);
    }
}
</script>

<style lang="scss" scoped>
ul.timeline {
    list-style-type: none;
    position: relative;
}
ul.timeline:before {
    content: ' ';
    background: #d4d9df;
    display: inline-block;
    position: absolute;
    left: 29px;
    width: 2px;
    height: 100%;
    z-index: 400;
}
ul.timeline > li {
    margin: 20px 0;
    padding-left: 20px;
}
ul.timeline > li:before {
    content: ' ';
    background: white;
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    border: 3px solid #22c0e8;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 400;
}
</style>