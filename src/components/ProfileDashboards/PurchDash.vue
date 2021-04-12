<template>
  <div id="hist">
    <h2>This section contains details regarding the carbon footprint of the items that you have purchased</h2>
    <div id="lowest">
      <h5>Product with lowest footprint</h5>
      <img id="img1" v-bind:src="this.products[0].img_url" />
      <div id="pdtname">{{ this.products[0].name }}</div>
      <div>
        <img
          id="img2"
          src="https://www.flaticon.com/svg/vstatic/svg/22/22722.svg?token=exp=1618114398~hmac=9ebae6196e612ac4564166adfb5820cb"
        />
        {{ this.products[0].footprint }} g
      </div>
    </div>
    <br />
    <br />
    <br />
    <div id="highest">
      <h5>Product with highest footprint</h5>
      <img id="img1" v-bind:src="this.products[this.products.length - 1].img_url" />
      <div id="pdtname">{{ this.products[this.products.length - 1].name }}</div>
      <div>
        <img
          id="img2"
          src="https://www.flaticon.com/svg/vstatic/svg/22/22722.svg?token=exp=1618114398~hmac=9ebae6196e612ac4564166adfb5820cb"
        />
        {{ this.products[this.products.length - 1].footprint }} g
      </div>
    </div>
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

#img2 {
  max-width: 20px;
}

ul {
  list-style-type: none;
}

#lowest {
  width: 450px;
  height: 230px;
  background: #c1d9ca;
  border-radius: 25px;
  position: absolute;
  top: 100px;
  left: 15%;
}

#highest {
  width: 450px;
  height: 230px;
  background: #c1d9ca;
  border-radius: 25px;
  position: absolute;
  top: 100px;
  left: 56%;
}

h5 {
  padding: 2%;
}

#pdtname {
  padding: 2%;
}
</style>
