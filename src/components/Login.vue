<template>
  <div class="loginpage">
    <h1 id="gradienttext">SKRÁ INN</h1>
    <img src="../assets/logo.png" width="125" height="50" id="logo"/>
    <input type="text" name="username" v-model="input.username" placeholder="Notendanafn" id="inputfieldlogin"/>
    <input type="password" name="password" v-model="input.password" placeholder="Lykilorð" id="inputfieldlogin"/>
    <button type="button" v-on:click="login()" id="inputfieldlogin">Skrá inn</button>
    <a id="gleymtlykilordhyperlink" v-on:click="recover()">Gleymt Lykilorð</a>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data(){
    return{
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    recover(){
      this.$router.replace({name: "recover"});
    },
    login(){
      if(this.input.username == "admin" && this.input.password == "pass"){
        this.$store.commit("setAuthentication", true);
        this.$router.replace({name: "secure"});
        
        
      }else{
        const test = this.$.auth.login(this.input.username, this.input.password);
        console.log(test);
        console.log("username or password is not correct")
      }
    }

  }
  
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat');
  .loginpage{
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 100vh; /* For 100% screen height */
    width:  100vw;
    justify-content:center;
    align-items:center;
    
    background-color: #30363D;
  }

  #gleymtlykilordhyperlink{
    color: #ffff;
    margin: 0 auto;
    font-family: Montserrat;
    text-decoration:none;
    font-weight: bold;
  }

  #inputfieldlogin{
    width: 50%;
    border-radius:4px;
    margin:8px auto;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
  }
  #inputfieldlogin:focus{
    border-color:#A154F2;
    box-shadow:0 0 8px 0 #A154F2;
  }

  #gradienttext{
    font-family: Montserrat;
    font-size: 150px;
    padding: 0 auto;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 0px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #F27A54, #A154F2);
    

  }
  #logo{
    padding-bottom: 10%;
  }
</style>
