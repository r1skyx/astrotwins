<template>
    <div class="vh-100 bg-grey">
        <GradientBox backArrow="<" linkTo="" style="background-color:#2E2E30;"/>
        <Nuxt/>
    </div>
</template>

<script>
    import GradientBox from '../components/GradientBox.vue';
    export default {
    components:{ GradientBox }
    }
</script>