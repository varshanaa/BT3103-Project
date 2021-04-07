<template>
  <div></div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      //product_ids: [],
      //products: [],
      purchased: []
    };
  },
  methods: {
    fetchUserData: function() {
      this.user_id = fb.auth().currentUser.uid;
    },
    // fetchProductIDs: function() {
    //   database
    //     .collection("purchased")
    //     .where("user_id", "==", this.user_id)
    //     .get()
    //     .then(snapshot => {
    //       snapshot.docs.forEach(doc => {
    //         this.product_ids.push(doc.data().pdt_id);
    //       });
    //     });
    // },
    // fetchProducts: function() {
    //   var arr = [];
    //   database
    //     .collection("products")
    //     .get()
    //     .then(snapshot => {
    //       snapshot.docs.forEach(doc => {
    //         arr.push([doc.id, doc.data()]);
    //       });
    //     });
    //   console.log(arr);

    // },

    fetchPurchased: function() {
      var ids = [];
      var products = [];
      database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            ids.push(doc.data().pdt_id);
          });
        });
      database
        .collection("products")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            products.push([doc.id, doc.data()]);
          });
        });
      console.log(ids);
      console.log(products);
      ids.forEach(x => {
        this.purchased.push(products[x - 1]);
      });
    }
    // fetchPurchased: function() {
    //   var arr = [];
    //   this.products.forEach(x => {
    //     arr.push(x);
    //   });
    //   console.log(arr);
    //   this.purchased = arr;
    // }
  },
  created() {
    this.fetchUserData();
    // this.fetchProductIDs();
    // this.fetchProducts();
    this.fetchPurchased();
  }
};
</script>


<style scoped>
</style>