
<template>
  <div class="container">
    <div class="row-1">
      <Header/>
    </div>
    <div class="row-2">
      <div class="col-1">
      </div>
      <div class="col-2">
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Messages',
  components: {
    Header
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
  display:flex;
  justify-content: flex-end;
  flex-direction: column;
  font-family: Montserrat;
}

.row-2{
  display:flex;
  flex-direction: row;
}

.col-1{
  display:flex;
  flex-direction: column;
  border: 4px black;
  width: 30%;
  height: 93vh;
  background-color: #747D88;
  align-items: center;
  
}
.col-2{
  width: 70%;
  height: 93vh;
  background-color: #30363D;

}

</style>
