<template>
  <div id="eco">
    <ul id="itemsList">
      <li id="listitem" v-for="i in rewards" :key="i.name">
        {{i.name}}
        <br />
        Points Needed: {{i.points}}
        <br />
        Code to redeem: {{i.code}}
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
#eco {
  position: absolute;
  top: 655px;
  background-color: white;
  margin-bottom: 1px;
}
#listitem {
  padding-top: 2%;
  padding-bottom: 2%;
  position: relative;
  left: 18%;
  background-color: #c1d9ca;
  margin-bottom: 2%;
  margin-right: 3%;
  flex-grow: 1;
  flex-basis: 300px;
}
#img1 {
  max-width: 100px;
}

#itemsList {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
}
</style>