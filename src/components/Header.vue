<template>
    <header class="headerbox">
        <h1 id="sporlofrout" > SVAPP </h1>
        <a id="routingbar" v-on:click="home()">Heim </a>
        <a id="routingbar" v-on:click="numbers()">Tölur </a>
        <a id="routingbar" v-on:click="users()">Notendur </a>
        <a id="routingbar" v-on:click="messages()">Skilaboð </a>
        
    </header>
</template>

<script>
export default {
    name: "Header",
    methods:{
        home(){
            this.$router.replace({name: "home"});
        },
        numbers(){
            this.$router.replace({name: "numbers"});
        },
        users(){
            this.$router.replace({name: "users"});
        },
        messages(){
            this.$router.replace({name: "messages"});
        },
        

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

    .headerbox {
        width: 100%;
        min-height: 50px;
        max-height: 60px;  
    }
    header {
        display: flex;
        align-items: center;
        background-size: cover;
        
        background-color: #3C444C;
    }
    #sporlofrout {
        color: #DB7082;
        padding-right: 60px;
        padding-left: 10px;
        font-family: Montserrat;
    }

    #routingbar {
        color: #ffff;
        padding-right: 10px;
        padding-left: 10px;
        text-decoration:none;
        font-family: Montserrat;
    }
</style>
