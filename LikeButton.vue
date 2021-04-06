<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <Button
      v-bind:class="{ clicked: isClicked, unclicked: !isClicked }"
      v-on:click="
        toggleLike();
        onChange();
      "
    >
      <i class="fa fa-heart"></i>
    </Button>
  </div>
</template>

<script>
import { database } from "../firebase";
import firebase from "firebase/app";
export default {
  data() {
    return {
      isClicked: false,
    };
  },
  methods: {
    toggleLike: function () {
      this.isClicked = !this.isClicked;
    },
    onChange: function () {
      if (this.isClicked) {
        database
          .collection("users")
          .doc("1")
          .update({
            liked: firebase.firestore.FieldValue.arrayUnion(this.id),
          });
      } else {
        database
          .collection("users")
          .doc("1")
          .update({
            liked: firebase.firestore.FieldValue.arrayRemove(this.id),
          });
      }
    },
  },
  props: {
    id: String,
  },
};
</script>

<style scoped>
.clicked {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #d8e2dc;
  color: red;
}

.unclicked {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #d8e2dc;
  color: white;
}
</style>