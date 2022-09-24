<template>
    <div class="vh-100 bg-grey">
        <GradientBox backArrow="" logo="true" linkTo="sign-up" style="background-color:#2E2E30;"/>
        <section-label sectionName="Your Signs"></section-label>
        <section-signs></section-signs>
        <navigation-mobile ></navigation-mobile>
    </div>
</template>

<script>
    import GradientBox from './GradientBox.vue';
    import SectionLabel from './SectionLabel.vue';
    import SectionSigns from './SectionSigns.vue';
    import NavigationMobile from './NavigationMobile.vue';
    export default{
        name:'SignedIndex',
        components:{GradientBox, SectionLabel, SectionSigns, NavigationMobile},
        data(){
            return {
            }
        }
    }
</script>