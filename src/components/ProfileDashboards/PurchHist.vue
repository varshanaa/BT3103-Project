<template>
  <div id="hist">
    <ul>
      <li v-for="j in products" :key="j[0]">{{j}}</li>
    </ul>
  </div>
</template>

<script>
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      user_id: null,
      product_ids: [],
      products: [],
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

    fetchProducts: function() {
      database
        .collection("purchased")
        .where("user_id", "==", this.user_id)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.product_ids.push(doc.data().pdt_id);
          });
        });

      //console.log(this.product_ids);
      //console.log(this.products);
      //console.log(this.products[4]);
      //   ids.forEach(x => {
      //     this.purchased.push(products[x - 1]);
      //   });
    },
    fetchPurchased: function() {
      database
        .collection("products")
        .where("pdt_id", "in", this.product_ids)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.products.push(doc.data());
          });
        });
      //console.log(this.products[0]);
      // this.product_ids.forEach(x => {
      //   this.purchased.push(this.products[x - 1]);
      // });
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
    console.log(this.product_ids);
    this.fetchProducts();
    //this.fetchPurchased();
  },
  mounted() {
    this.fetchPurchased();
  }
};
</script>


<style scoped>
#hist {
  position: absolute;
  top: 655px;
}
</style>