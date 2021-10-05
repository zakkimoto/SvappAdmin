<template>
  <div class="recoverpage">
    <h1 id="gradienttext">GLEYMT LYKILORÐ</h1>
    <input type="text" id="inputfieldrecover" placeholder="Email" v-model="input.email"/>
    <button type="button" v-on:click="recoverpass()" id="inputfieldrecover">Endurheimta Lykilorð</button>
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
    height: 100vh; /* For 100% screen height */
    width:  100vw;
    background-color: #30363D;
  }
  #gradienttext{
    font-family: Montserrat;
    font-size: 100px;
    padding: 0 auto;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 100px;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to right, #F27A54, #A154F2);
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
</style>
