<template>
  <div>
    <Header />
    <div class="col-1">
      <div class="user-box">
        <div class="user-img-name">
          <img
            v-bind:src="this.user[0].image_url"
            id="profile-photo"
            alt="Mynd ekki fundin"
          />
          <h2 id="text">
            {{
              this.user[0].user_name
                .replace(")", "")
                .replace("(", "")
                .split(",")[1] +
              " " +
              this.user[0].user_name
                .replace(")", "")
                .replace("(", "")
                .split(",")[3]
            }}
          </h2>
          <div v-if="this.user[0].verified == 0" class="approve-button">
            <button id="inputfieldlogin" v-on:click="verify()" type="button">
              samþykkja notanda
            </button>
          </div>
        </div>
        <div class="user-verified" v-if="this.user[0].verified == 1">
          <div class="user-userinfo">
            <div id="text2">
              <h2>Netfang: {{ this.user[0].email }}</h2>
              <h2>Kennitala: {{ this.user[0].user_ssn }}</h2>
              <h2>Sími: {{ this.user[0].phone }}</h2>
              <h2>Stig: {{ this.user[0].guest_points }}</h2>
            </div>

            <GmapMap
              id="Map"
              :center="this.center"
              :zoom="7"
              map-type-id="terrain"
              style="margin-left: 10%; width: 50%; height: 400px"
            >
              <GmapMarker 
                :key="1"
                :position="{
                  lat: this.location.results[0].geometry.location.lat,
                  lng: this.location.results[0].geometry.location.lng,
                }"
              />

              <!-- <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center=m.position"
                /> -->
            </GmapMap>
          </div>
        </div>

        <div class="pending" v-if="this.user[0].verified == 0">
          <div class="id-photos">
            <img
              v-bind:src="this.user[0].p_document"
              id="id_document"
              alt="Mynd ekki fundin"
            />
            <img
              v-bind:src="this.user[0].a_document"
              id="utilitybill"
              alt="Mynd ekki fundin"
            />
          </div>
          
        </div>
        <div v-if="this.user[0].verified == -1">
          <h2 id="text2">þessi notandi er ekki búinn að hlaða inn skjölum</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";


export default {
  name: "User",
  components: {
    Header,
  },
  data() {
    return {
      url_data: null,
      user: null,
      loading: true,
      errored: false,
      username: null,
      center: {
        lat: 16,
        lng: 10,
      },
      location: [],
      property: null,
    };
  },
  methods: {
    verify() {
      console.log("hérna" + this.url_data);
      axios
        .put("http://localhost:3000/api/v1/users/verified/" + this.url_data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => this.$router.replace({ name: "users" }));
    },
    
  },
  //methods: {
  //routeToUser(id) {
  //this.$router.push({ name: 'user', params: { id: id } })
  //}
  //},
  mounted() {
    this.url_data = this.$route.params.id;
    console.log(this.url_data);

    axios
      .get("http://localhost:3000/api/v1/properties/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.property = response.data;
        console.log(this.property[0].street_name);
        axios
          .get(
            "https://maps.googleapis.com/maps/api/geocode/json?address=," +
              this.property[0].street_name +
              " " +
              this.property[0].house_number +
              " Iceland&key=AIzaSyDImhMtVnZfl8Iim3YJqTbZLsHYs75NuLg"
          )
          .then((response) => {
            console.log(response.data);
            this.location = response.data;
            this.center = {
              lat: this.location.results[0].geometry.location.lat,
              lng: this.location.results[0].geometry.location.lng,
            };
            console.log(this.location.results[0].geometry.location.lat);
          })
          .catch((error) => {
            console.error(error);
            this.errored = true;
          });
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
        this.errored = true;
      });

    axios
      .get("http://localhost:3000/api/v1/users/" + this.$route.params.id)
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch((error) => {
        console.error(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<!-- <h1>user {{ $route.params.id }}</h1>-->
<style scoped>
.approve-button{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    width: 25%;
    padding:8px;
    height: 100%;
}

#inputfieldlogin{
    font-family: Montserrat;
    color: white;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    background-color: #30363D;
    border-radius:50px;
    margin:8px auto;
    outline:none;
    padding:20px;
    margin-left: 20px;
    box-sizing:border-box;
    transition:.3s;
  }
  #inputfieldlogin:focus{
    border-color:#6FCF97;
    box-shadow:0 0 8px 0 #6FCF97;
  }

.id-photos {
    display: flex;
    height: 50vh;
    width: 100%;
    justify-content: center;
}

.pending {
    display: flex;
    flex-direction: column;
    height:50vh;
    width: 100%;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
}


.user-userinfo {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;
}

#text {
  font-family: Montserrat;
  font-size: 300%;
  margin-bottom: 0px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, white, #faf9f6);
}
#text2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 10%;
  padding-left: 10%;
  font-family: Montserrat;
  font-size: 100%;
  margin-bottom: 0px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, white, #faf9f6);
}

.row-1 {
  width: 100%;
  height: 50%;
}

.col-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #30363d;
  height: 94vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

#profile-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin: 10px;
}

.user-box {
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  width: 98vw;
  height: 94vh;
  background-color: #db7082;
}

.user-img-name {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100vw;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
}
</style>

