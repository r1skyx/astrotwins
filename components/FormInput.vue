<template>
    <div class="mb-4">
        <label class="mb-2" :for="forVar">{{label}}</label> <br>
        <input class="pl-2" v-model="value" :val="this.value" @submit.prevent="returnValue" :type="type" name="" :placeholder="placeholder" id="">
    </div>
</template>

<script>

export default {
    name: 'FormInput',
    data() {
        return {
            value:''
        }
    },
    methods:{
        returnValue(){
            return this.value
        }
    },
    props:{
        label:String,
        forVar:String,
        type:String,
        placeholder:String,
    }
}
</script>

<style>
    label{
        margin-left:10px;
        font-size: 1.3em;
    }

</style>