<template>
    <div>
        <img class="logo" src="../assets/logo2.png">

    </div>
</template>

<script>


export default {

}
</script>

<style scoped>

    @keyframes myanimation{
        100% {transform: rotate(360deg);}
    }

    img {
        display:flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        animation-name: myanimation;
        animation-duration: 30s ;
        animation-iteration-count: infinite;
    }

    


</style>
