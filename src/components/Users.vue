
<template>
  
  <div class ="container">
    <div class ="row-1">
      <Header/> 
    </div>
    <div class ="row-2">
      <div class ="col-1">
        <h1 id = "texthvitur">LEITA</h1>
        <input type="text" placeholder="TEXTI" id="input"/>


        <input type="checkbox" id="checkbox-1" name="vehicle1" value="verified">
        <label for="vehicle1"> Búið að auðkenna </label>
        <input type="checkbox" id="checkbox-2" name="vehicle2" value="pending">
        <label for="vehicle2"> Auðkenning í bið </label>
        <input type="checkbox" id="checkbox-3" name="vehicle3" value="not-verified">
        <label for="vehicle3"> Ekki búið að auðkenna </label>

        <input type="radio" id="paid" name="radio-1" value="paid">
        <label for="active">Búinn að borga</label>
        <input type="radio" id="notpaid" name="radio-1" value="notpaid">
        <label for="notactive">Ekki búið að borga</label>


        <input type="radio" id="active" v-model="active" name="radio-2" value="active">
        <label for="active">Virkur</label>
        <input type="radio" id="notactive" name="radio-2" value="notactive">
        <label for="notactive">Ekki Virkur</label>
      
        <button type="button" id="input">LEITA</button>
        <button type="button" id="input">HREINSA</button>

      </div>
      <div class ="col-2">
        <div class = "userbox" v-for="u in users" :key="u.id">
          {{u.name}}
          <img src="../assets/profilepic.jpeg" id="profile-photo" width=70% height=70% alt="Mynd ekki fundin">
          {{u.email}}
          <div class="not-verified" v-if="u.veri == -1">
          </div>
          <div class="pending-verified" v-if="u.veri == 0">
          </div>
          <div class="active-verified" v-if="u.veri == 1">
          </div>
          
        </div>
      </div>
    </div>

   
    
  </div>
</template>

<script>
import Header from './Header.vue'

export default {
  name: 'Users',
  components: {
    Header
  },
  data(){
    return{
      users: [
      {
        id: 1,
        name: 'Zakarias Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: -1,
        paid: 0
      },
      {
        id: 2,
        name: 'Jónas Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: -1,
        paid: 1
      },
      {
        id: 3,
        name: 'Oliver Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: 1,
        paid: 1
      },
      {
        id: 4,
        name: 'Bjarni Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: 1,
        paid: 0
      },
      {
        id: 5,
        name: 'Kalli Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: 0,
        paid: 0
      },
      {
        id: 6,
        name: 'Þórður Fridriksson',
        email: 'zakkitv@gmail.com',
        veri: 1,
        paid: 1
      },
      
      ]
    }
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
.row-2 {
  background-color: yellow;
  display:flex;
  
}

.row-2 div{
  border: 1px solid black;
  
}-->
<style scoped>
#profile-photo{
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: auto;
}

.active-verified{
  height: 25px;
  width: 25px;
  background-color: #6FCF97;
  border-radius: 50%;
}

.pending-verified{
  height: 25px;
  width: 25px;
  background-color: #F27A54;
  border-radius: 50%;
}

.not-verified{
  height: 25px;
  width: 25px;
  background-color: #30363D;
  border-radius: 50%;
}

.userbox{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 30%;
  background-color: #DB7082;
  border-radius: 25px;
  margin: 15px;
}
#texthvitur{
  color: white;
}
#input{
  width: 70%;
  border-radius:4px;
  margin:8px auto;
  outline:none;
  padding:8px;
  box-sizing:border-box;
  transition:.3s;
}

#input:focus{
  border-color:#A154F2;
  box-shadow:0 0 8px 0 #A154F2;
}

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
  display:flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
  height: 93vh;
  background-color: #30363D;

}
</style>
