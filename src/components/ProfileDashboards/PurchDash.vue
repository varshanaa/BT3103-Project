<template>
  <div id="hist">
    <h4>This section contains details regarding the carbon footprint of the items that you have purchased</h4>
    <div>Product with lowest footprint</div>
    <img id="img1" v-bind:src="this.products[0].img_url" />
    {{ this.products[0].name }}, Footprint: {{ this.products[0].footprint }}
    <br />
    <br />
    <br />

    <div>Product with highest footprint</div>
    <img id="img1" v-bind:src="this.products[this.products.length - 1].img_url" />
    {{ this.products[this.products.length - 1].name }}, Footprint:
    {{ this.products[this.products.length - 1].footprint }}
    <bar></bar>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";
import Bar from "./charts/FootBar.vue";

export default {
  components: {
    bar: Bar
  },
  data() {
    return {
      user_id: null,
      // product_ids: [],
      products: []
      // purchased: [],
    };
  },
  methods: {
    fetchUserData: function() {
      this.user_id = fb.auth().currentUser.uid;
    },
    fetchProducts: function() {
      var prods = [];
      database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            prods.push(doc.data());
          });
        });
      console.log(prods);
      this.products = prods;
      //console.log(this.product_ids);
      //console.log(this.products);
      //console.log(this.products[4]);
      //   ids.forEach(x => {
      //     this.purchased.push(products[x - 1]);
      //   });
    }
    // fetchPurchased: function() {
    //   database
    //     .collection("products")
    //     .where("pdt_id", "in", [1, 2])
    //     .get()
    //     .then((snapshot) => {
    //       snapshot.docs.forEach((doc) => {
    //         this.products.push(doc.data());
    //       });
    //     });
    //   //console.log(this.products[0]);
    //   // this.product_ids.forEach(x => {
    //   //   this.purchased.push(this.products[x - 1]);
    //   // });
    // },
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
    // console.log(this.product_ids);
    this.fetchProducts();
    //this.fetchPurchased();
  }
  // mounted() {
  //   this.fetchPurchased();
  // },
};
</script>

<style scoped>
#hist {
  position: absolute;
  top: 655px;
  padding-bottom: 40px;
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
