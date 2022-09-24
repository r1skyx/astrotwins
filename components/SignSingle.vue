<template>
    <div class="text-center">
        <h5>{{planet}}</h5>
            <img :src="`../assets/images/` + sign`.png`" style="width:100px; height:100px;">
        <h5>{{sign}}</h5>
    </div>
</template>

<script>
    export default{
        name:'SignSingle',
        data(){
            return {

            }
        },
        props:{
            planet:String,
            sign:String
        }
    }
</script>