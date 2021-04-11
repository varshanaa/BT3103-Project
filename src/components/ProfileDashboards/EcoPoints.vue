<template>
  <div id="hist">
    <ul>
      <li v-for="i in rewards" :key="i.name">
        {{i.name}}
        <br />
        Points Needed: {{i.points}}
        <br />
        Code to redeem: {{i.code}}
        <br />
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import { database } from "../../firebase.js";

export default {
  data() {
    return {
      rewards: []
    };
  },
  methods: {
    fetchRewards: function() {
      database
        .collection("rewards")
        .orderBy("name")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.rewards.push(doc.data());
          });
        });
    }
  },
  created() {
    this.fetchRewards();
  }
};
</script>

<style>
#hist {
  position: absolute;
  top: 655px;
  background-color: white;
}
#item {
  padding-bottom: 20px;
  padding-top: 10px;
}
#img1 {
  max-width: 100px;
}

ul {
  list-style-type: none;
}
</style>