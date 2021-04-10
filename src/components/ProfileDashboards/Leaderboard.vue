<template>
  <div id="lead">
    <ol>
      <li v-for="j in users" :key="j[0]">{{j[0]}}, {{j[1]}}</li>
    </ol>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      users: []
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
            this.users.push([doc.data().name, doc.data().points]);
          });
        });
    }
  },
  created() {
    this.fetchUserData();
    this.fetchUsers();
  }
};
</script>

<style scoped>
#lead {
  position: absolute;
  top: 655px;
  padding-bottom: 30px;
}
</style>