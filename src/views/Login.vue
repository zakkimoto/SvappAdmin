<template>
  <div class="loginpage">
    <h1 id="gradienttext">SKRÁ INN</h1>
    <img src="../assets/logo.png" width="125" height="50" id="logo"/>
    <input type="text" name="username" v-model="input.username" placeholder="Notendanafn" id="inputfieldlogin"/>
    <input type="password" name="password" v-model="input.password" placeholder="Lykilorð" id="inputfieldlogin"/>
    <!-- þegar það er búið að setja inn lykilorð og notendanafn þá getur notandi ýtt á skrá inn takka, sem fer með okkur í login() function -->
    <button type="button" v-on:click="login()" id="loginbutton">Skrá inn</button>
    <!-- hér fer notandi yfir á gleymt lykilorð síðu -->
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
    // þetta er harðkóðað inn núna, en við þurfum að tengja við firebase, firebase mun sjá um að encrypta gögnunum fyrir okkur og þar með halda utanum öryggi
    login(){
      if(this.input.username == "admin" && this.input.password == "pass"){
        //breytum starfsmanni í auðkenndur
        this.$store.commit("setAuthentication", true);
        //förum í gegnum secure padding, sem þýðir að þetta er ghost síða sem redirectar á heim, en hún fær traffíkina í gegnum sig, (las um að það sé sniðugt)
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
  

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Montserrat');
  .loginpage{
    display: flex;
    flex-direction: column;
    align-items:center;
    height: 100vh; /* fyrir 100% skjá hæð */
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

  #loginbutton{
    width: 50%;
    border-radius:4px;
    margin:8px auto;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    color: white;
    background-color: #6FCF97;
    transition:.3s;
  }
  #loginbutton:focus{
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
