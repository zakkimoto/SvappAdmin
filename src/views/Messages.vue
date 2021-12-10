
<template>
<!-- hellingur af flexboxum, row og col eiga að vera til að hjálpa mér að átta mig á hvaða flex box ég er að notast við -->
  <div class="container">
    <div class="row-1">
      <Header />
    </div>
    <div class="row-2">
      <div class="col-1">
        <!-- hérna förum við inní lykkju sem býr til öll skilaboð sem við sóttum og renderar það vinstrameginn á síðunni okkar -->
        <!-- við gerum hvert einasta skilaboð "clickable" þar með getum við tengt function við hvert og einasta skilaboð. switch_message breytir focus skilaboðinu -->
        <div class="messages-container" v-on:click="switch_message(m.id)" v-for="m in messages" :key="m.id">
          <div class="message-box" >
            <div id="answered" v-if="m.done">
              {{ m.email }}
            </div>
            <!-- þetta er kóði sem keyrist ekki út á síðunni, eins og staðan er nú, en ákvað að hafa hann hérna inni ef menn vilja sækja svöruð skilaboð, gæti verið góð viðbót -->
            <div id="notanswered" v-else>
              {{ m.email }}
            </div>
          </div>
        </div>
        <h1>Skilaboð eftir: {{messages.length}}</h1>
      </div>
  
      <div class="col-2">
        <div class="col-3">
          <!-- hérna keyrum við út skilaboðið sem er focus, þar að segja skilaboðið sem við erum að svara -->
          <h1 id="message">{{ message_in_focus.question }} <br>
          -{{message_in_focus.email }}
          </h1>
        </div>
        <h1 id="popup" v-if="render" >
          Svar hefur verið sent á viðeigandi aðilla
        </h1>
        <div class="col-5">
          <input type="text" placeholder="TEXTI" v-model="answer" id="input" />
          <button type="button" id="button" v-on:click="send_answer()">
            Senda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";
import emailjs from "emailjs-com";

export default {
  name: "Messages",
  components: {
    Header,
  },

  data() {
    return {
      messages: null,
      loading: true,
      errored: false,
      message_in_focus: null,
      answer: null,
      users: null,
      key: 1,
      render: null,
      contactparams: {
        from_name: 'Svapp Admin',
        to_name: null,
        message: null,
        answer: null,
        question_id: null,
        user_email: null,
        reply_to: null,
      },
    };
  },
  methods: {
    switch_message(message_id) {
      this.answer = null;
      this.message_in_focus = this.messages.find(
        (message) => message.id == message_id
      );
    },
    send_answer() {
      this.loading = true;
      // hér förum við inn ef að svar er ekki null, þá sendum við patch request til þess að bæta svarinu við í gagnagrunninn
      if (this.answer !== null) {
        this.message_in_focus.answer = this.answer;
        axios
          .patch(
            `http://localhost:3000/api/v1/messages/${this.message_in_focus.id}`,
            {
              answer: this.answer,
            }
          )
          .then((response) => {
            this.messages = response.data;
            this.message_in_focus =
              this.messages.length > 0 ? this.messages[0] : null;
            
            axios
              .get("http://localhost:3000/api/v1/messages")
              .then((response) => {
                this.messages = response.data;
                console.log(this.messages);
                this.message_in_focus =
                  this.messages.length > 0 ? this.messages[0] : null;
              })
              .catch((error) => {
                console.error(error);
                this.errored = true;
              })
              .finally(() => (this.loading = false));

            this.answer = null;
            setTimeout(
              function () {
                this.render = false;
              }.bind(this),
              3000
            );
            this.render = true;
          })
          .catch((error) => {
            console.error(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
          // hér reynum við að senda email á notanda, ef það virkar ekki þá fáum við upp error
          try{
            this.contactparams.message = this.message_in_focus.question
            console.log(this.contactparams.message)
            this.contactparams.answer = this.message_in_focus.answer
            this.contactparams.to_name = this.message_in_focus.user_name
            this.contactparams.question_id = this.message_in_focus.id
            this.contactparams.user_email = this.message_in_focus.email

            console.log(this.message_in_focus.question)
            console.log("try eamil");
            emailjs.send('service_bkc5rum', 'template_aqgbrcc',this.contactparams, emailjs.init("user_I8Ill7xXvGcLUVWAQdKEH"));
          }catch(error){
            console.error(error);
          }
          
        
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/messages")
      .then((response) => {
        this.messages = response.data;
        console.log(this.messages);
        this.message_in_focus =
          this.messages.length > 0 ? this.messages[0] : null;
      })
      .catch((error) => {
        console.error(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#message{
  font-family: Montserrat;
  color: white;

}

#popup {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  color: #6FCF97;
  position: fixed;
  top: 10%;
  left: 28%;

  
}



#answered {
  background-color: red;
  width: 100%;
}



.messages-container{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  color: white;
  background-color: #6FCF97;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: #3C444C;
  border-bottom-width: 1px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 100px;
  cursor: pointer;


}

#input {
  width: 60%;
  height: 50px;
  border-radius: 4px;
  margin: 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
  background-color: #F2F4F7;
}

#input:focus {
  border-color: #a154f2;
  box-shadow: 0 0 8px 0 #a154f2;
}

#button {
  width: 10%;
  border-radius: 4px;
  margin: 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
  height: 50px;
  margin-right: 5px;
  background-color: #6FCF97;
  font-size: 100%;
  color:white;
  cursor: pointer;

}

#button:focus {
  border-color: #a154f2;
  box-shadow: 0 0 8px 0 #a154f2;
}

.container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-family: Montserrat;
}

.row-2 {
  display: flex;
  flex-direction: row;
}

.col-1 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  overflow-y: scroll;
  flex: 1;
  width: 20px;
  height: 94vh;
  background-color: #747D88;
  justify-content: start;
  align-items: center;
}
.col-2 {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  width: 80%;
  height: 94vh;
  background-color: #30363d;
}

.col-3 {
  transform: translatey(0px);
  animation: float 5s ease-in-out infinite;
  text-align: center;
  
  font-weight: bold;
  letter-spacing: 3px;
  font-size: 15px;
  color: #774f38;
  background-color: #F27A54;
  padding: 50px;
 
  margin: 5%;
  margin-bottom: 18%;
  border-radius: 11px;
  position: relative;
  box-shadow: 20px 20px #A154F2;
  font-family: "Montserrat", cursive;
}

.col-3:after {
  transform: translatey(0px);
  animation: float2 5s ease-in-out infinite;
  content: ".";
  font-weight: bold;
  -webkit-text-fill-color: #F27A54;
  text-shadow: 22px 22px #A154F2;
  text-align: left;
  font-size: 55px;
  width: 55px;
  height: 11px;
  line-height: 30px;
  border-radius: 11px;
  background-color: #F27A54;
  position: absolute;
  display: block;
  bottom: -30px;
  left: 0;
  box-shadow: 22px 22px #A154F2;
  z-index: -2;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

@keyframes float2 {
  0% {
    line-height: 30px;
    transform: translatey(0px);
  }
  55% {
    transform: translatey(-20px);
  }
  60% {
    line-height: 10px;
  }
  100% {
    line-height: 30px;
    transform: translatey(0px);
  }
}



.col-4 {
  height: 90%;
  width: 100%;
  display: flex;
}
.col-5 {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  position: fixed;
  left:0%;
  top:92%;
  
}
</style>
