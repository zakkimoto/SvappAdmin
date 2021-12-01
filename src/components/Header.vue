<template>
    <header class="headerbox">
        
        <img src="../assets/logo.png" width="125" height="50" id="routingbar"/>
        <a id="routingbar" v-on:click="home()">Heim </a>
        <a id="routingbar" v-on:click="users()">Notendur </a>
        <a id="routingbar" v-on:click="messages()">Skilaboð </a>
        <a id="routingbar" v-on:click="properties()">Fasteignir </a>
        <a id="routingbar" v-on:click="logout()">Útskrá </a>
        
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
        properties(){
            this.$router.replace({name: "properties"});
        },
        logout(){
            this.$store.commit("setAuthentication", false);
            this.$router.replace({name: "login"});
        }
        

    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

    .headerbox {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 6vh;
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
        cursor: pointer;
        color: #ffff;
        padding-right: 10px;
        padding-left: 10px;
        text-decoration:none;
        font-family: Montserrat;
    }
</style>
