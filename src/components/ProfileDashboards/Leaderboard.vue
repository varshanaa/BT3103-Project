<template>
  <div id="lead">
    <button v-on:click="getCurrentStanding()">Get Your Current Position</button>
    <ol>
      <li v-for="j in users" :key="j[0]">{{j[0]}}: {{j[1]}} Points</li>
    </ol>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      users: [],
      position: 0,
      usrArr: []
    };
  },
  methods: {
    fetchUserData: function() {
      this.user_id = fb.auth().currentUser.uid;
    },
    fetchUsers: function() {
      database
        .collection("users")
        .orderBy("points", "desc")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.users.push([doc.data().name, doc.data().points, doc.id]);
          });
        });
      //var usrArr = [];
    },
    getUserArray: function() {
      database
        .collection("users")
        .doc(this.user_id)
        .get()
        .then(snapshot => {
          this.usrArr = [
            snapshot.data().name,
            snapshot.data().points,
            this.user_id
          ];
        });
      console.log(this.usrArr);
    },
    getCurrentStanding: function() {
      // var usrArr = [];
      // database
      //   .collection("users")
      //   .doc(this.user_id)
      //   .get()
      //   .then(snapshot => {
      //     usrArr = [snapshot.data().name, snapshot.data().points, this.user_id];
      //   });
      // console.log(usrArr);
      // var position = this.users.indexOf(usrArr) + 1;
      this.position = this.users.indexOf(this.usrArr) + 1;
      alert("Your current rank is: " + 2);
    }
  },
  created() {
    this.fetchUserData();
    this.fetchUsers();
    this.getUserArray();
  }
};
</script>

<style scoped>
#lead {
  position: absolute;
  top: 655px;
  left: 40%;
  padding-bottom: 17px;
  background-color: white;
}
ol {
  padding: 5%;
  position: relative;
  top: 65px;
}

li {
  background-color: #c1d9ca;
  border-radius: 10px;
  width: 250px;
  margin-bottom: 20px;
}
button {
  background-color: #c1d9ca;
  position: absolute;
  top: 15px;
  left: 5%;
  width: 250px;
}
</style>