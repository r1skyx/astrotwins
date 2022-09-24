<template>
    <div>
        <b-container>
            <b-row>
                <!-- <sign-single :planet="this.$store.state.userData" ></sign-single> -->
                <b-col  cols="4" class="text-center">
                    <h5>Sun</h5>
                        <img class="p-1" :src="require (`../assets/images/Signs/${reqData.sunsign}.png`)" style="width:auto; height:85px;">
                    <h5 class="text-gold">{{reqData.sunsign}}</h5>
                </b-col>
                <b-col  cols="4" class="text-center">
                    <h5>Moon</h5>
                        <img class="p-1" :src="require (`../assets/images/Signs/${reqData.moonsign}.png`)" style="width:auto; height:85px;">
                    <h5 class="text-gold">{{reqData.moonsign}}</h5>
                </b-col>
                <b-col  cols="4" class="text-center">
                    <h5>Ascending</h5>
                        <img class="p-1" :src="require (`../assets/images/Signs/${reqData.ascendsign}.png`)" style="width:auto; height:85px;">
                    <h5 class="text-gold">{{reqData.ascendsign}}</h5>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import SignSingle from './SignSingle.vue'
    export default{
        name:'SectionSigns',
        components:{SignSingle},
        data(){
            return {
                reqData:this.$store.state.userData
            }
        },
    }
</script>