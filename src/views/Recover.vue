<template>
  <div class="recoverpage">
    <h1 id="gradienttext">GLEYMT LYKILORÐ</h1>
    <img src="../assets/logo.png" width="125" height="50" id="logo"/>
    <input type="text" id="inputfieldrecover" placeholder="Email" v-model="input.email"/>
    <!-- ef þessi takki er ýttur á, þá ertu sendur aftur á skrá inn skjá, ég er með kóðann til að klára þetta, en vantar að kaupa emailJS -->
    <button type="button" v-on:click="recoverpass()" id="reoverbutton">Endurheimta Lykilorð</button>
  </div>
</template>

<script>
export default {
  name: 'Recover',
  data(){
    return{
      input:{
        email: ""
      }
    }
  },
  methods: {
    // mjög einfalt, kemur alert á skjá, þegar þú ýtir á ok, þá ferðu aftur á skrá inn skjáinn
    recoverpass(){
      alert("Email Hefur verið sent áfram á netfangið: " + this.input.email + "\n" + "ýttu á ok til að halda áfram");
      this.$router.replace({name: "login"});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
  .recoverpage{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100vh; /* For 100% screen height */
    width:  100vw;
    background-color: #30363D;
    align-items:center;
    justify-content:center;
  }
  #gradienttext{
    font-family: Montserrat;
    font-size: 100px;
    display: flex;
    justify-content:center;
    flex-wrap: wrap;
    align-items:center;
    padding: 0 auto;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 0px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #F27A54, #A154F2);
  }

  

  #reoverbutton{
    width: 50%;
    border-radius:4px;
    margin:8px auto;
    outline:none;
    padding:8px;
    color: white;
    background-color: #6FCF97;
    box-sizing:border-box;
    transition:.3s;
  }
  #reoverbutton:focus{
    border-color:#A154F2;
    box-shadow:0 0 8px 0 #A154F2;
  }

    #inputfieldrecover{
    width: 50%;
    border-radius:4px;
    margin:8px auto;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
  }
  #inputfieldrecover:focus{
    border-color:#A154F2;
    box-shadow:0 0 8px 0 #A154F2;
  }
  #logo{
    padding-bottom: 10%;
  }
</style>
