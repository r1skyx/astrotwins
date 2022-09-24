<template>
    <div >
        <div class="d-flex bottom flex-row text-center justify-content-around" align-v="bottom">
            <nuxt-link to="/" class="w-100 border-right">
                <h3><fa icon="house"/></h3>
            </nuxt-link>
            <div class="border-right">
                <h3><fa icon="magnifying-glass"/></h3>
            </div>
            <nuxt-link to="user" class="w-100">
                <h3><fa icon="user"/></h3>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'NavigationMobile',
      components:{},
      props:{
        
      }
    }
</script>

<style scoped>
    .bottom{
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin:0 5px;
        padding:10px;
        border-radius: 25px;
        border-top: 1px solid var(--gold);
    }

    .border-right {
        width:100%;
        border-right: 1px solid var(--gold);
    }
    h3 {
        margin-top:5px;
    }

</style>
