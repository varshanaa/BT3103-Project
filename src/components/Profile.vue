<template>
  <div>
    <Welcome />
    <button v-on:click="redeemPoints()" id="redeem">Redeem Eco-Points</button>
    <nav id="profnav">
      <button v-on:click="showDash()" id="navbut1">Purchase Dashboard</button>
      <button v-on:click="showHist()" id="navbut2">Purchase History</button>
      <button v-on:click="showLead()" id="navbut3">Leaderboard</button>
    </nav>
    <div v-if="this.display == ''"></div>
    <div v-else-if="this.display == 'Leaderboard'">
      <Leaderboard />
    </div>
    <div v-else-if="this.display == 'PurchDash'">
      <PurchDash />
    </div>
    <div v-else-if="this.display == 'PurchHist'">
      <PurchHist />
    </div>
    <div v-else-if="this.display == 'EcoPoints'">
      <EcoPoints />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./FooterComponent.vue";
import Welcome from "./Welcome.vue";
import EcoPoints from "./ProfileDashboards/EcoPoints.vue";
import Leaderboard from "./ProfileDashboards/Leaderboard.vue";
import PurchDash from "./ProfileDashboards/PurchDash.vue";
import PurchHist from "./ProfileDashboards/PurchHist.vue";
import { fb, database } from "../firebase.js";

export default {
  data() {
    return {
      name: null,
      display: ""
    };
  },
  components: {
    Footer,
    Welcome,
    EcoPoints,
    Leaderboard,
    PurchDash,
    PurchHist
  },
  methods: {
    fetchUserData: function() {
      let id = fb.auth().currentUser.uid;
      database
        .collection("users")
        .doc(id)
        .get()
        .then(doc => {
          this.name = doc.data().name;
        });
    },
    redeemPoints: function() {
      this.display = "EcoPoints";
    },
    showDash: function() {
      this.display = "PurchDash";
    },
    showHist: function() {
      this.display = "PurchHist";
    },
    showLead: function() {
      this.display = "Leaderboard";
    }
  },
  created() {
    this.fetchUserData();
  },
  beforeDestroy() {
    this.display = "";
  }
};
</script>

<style scoped>
#redeem {
  position: absolute;
  width: 200px;
  height: 40px;
  left: 62%;
  top: 500px;
  border-radius: 10px;
  font-family: "EB Garamond";
  font-size: 20px;
  color: #d8e2dc;
  background: #006d77;
}
#profnav {
  position: absolute;
  width: 100%;
  min-height: 30px;
  top: 600px;
  background: #81af93;
}
#navbut1 {
  font-family: "EB Garamond";
  font-size: 20px;
  color: black;
  background: #81af93;
  position: absolute;
  left: 30px;
  border: none;
}
#navbut2 {
  font-family: "EB Garamond";
  font-size: 20px;
  color: black;
  background: #81af93;
  position: absolute;
  left: 330px;
  border: none;
}
#navbut3 {
  font-family: "EB Garamond";
  font-size: 20px;
  color: black;
  background: #81af93;
  position: absolute;
  left: 630px;
  border: none;
}
</style>