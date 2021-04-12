<template>
  <div>
    <div id="pagebody">
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <span>
          <hr />
          <i class="fa fa-shopping-cart fa-5x cart-icon"></i>
          <i class="fa fa-credit-card-alt fa-5x card-icon"></i>
          <i class="fa fa-check fa-5x tick-icon"></i>
        </span>
      </div>
      <div id="cartlist">
        <ul id="headings">
          <li id="productheader">Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>ECO Points</li>
          <br />
        </ul>
        <br />
        <ul>
          <li v-for="item in products" v-bind:key="item.id">
            <ul id="itemrow">
              <li id="itemname">
                <span id="item_span"><img id="item_img" :src="item.img" /></span
                ><br />
                <span id="item_span"
                  ><b>{{ item.name }}</b
                  ><br />
                  <a id="co2footprint"></a
                  ><span> {{ item.footprint }}g</span></span
                ><br />
                <span id="item_span"><CartRemoveBtn v-bind:pdt_id="item.id">Remove</CartRemoveBtn></span>
              </li>
              <li>${{ item.price }}</li>
              <li>{{ item.qty }}</li>
              <li>${{ item.price * item.qty }}</li>
              <li>{{ item.qty * item.points }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div id="details">
        <button id="view_total" v-on:click= "findTotal" >View Total</button><br><br>
        <span v-show= "this.totalpoints>0"><i class="fa fa-leaf leaf-icon"></i><b> Total ECO-Points: {{ totalpoints }}</b></span><br />
        <span v-show= "this.subtotal>0">Subtotal: ${{ subtotal }}</span><br>
        <span v-show= "this.subtotal>0">Discount: ${{ discount }}</span><br>
        <span v-show= "this.subtotal>0"><b>Grand Total: ${{ grand_total() }}</b></span><br>
      </div>
      <div>
        <!-- v-bind:arr= "[this.products, this.grand_total, this.totalpoints]" -->
      <!-- <button id="checkout" v-on:click="route()">Check Out</button> -->
      <router-link id="checkout" :to="{ name: 'cartshipping', params: {products: this.products, total: this.total_final, totalpoints: this.totalpoints }}">Check Out</router-link>
      <router-link id="browse" to="/user/APP" exact>Continue Browsing</router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../FooterComponent.vue";
import { fb, database } from "../../firebase.js";
import CartRemoveBtn from "./CartRemoveBtn.vue";

export default {
  data() {
    return {
      products: {},
      totalpoints: 0,
      discount: 0,
      subtotal: 0,
      total_final: 0
    };
  },
  components: {
    Footer,
    CartRemoveBtn,
  },
  methods: {
    retrieveCart: function () {
      let userid = fb.auth().currentUser.uid;
      database
        .collection("cart")
        .doc(userid)
        .get()
        .then((doc) => {
          this.cart = doc.data();
        });
      database
        .collection("products")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            let data = doc.data();
            let pdtID = data.pdt_id;
            if (this.cart[pdtID] != null) {
              let val = parseInt(data.price).toFixed(2);
              this.products[pdtID] = {
                name: data.name,
                img: data.img_url,
                footprint: data.footprint,
                price: val,
                points: data.points,
                qty: this.cart[pdtID],
                id: pdtID,
              };
            }
          });
        });
    },
    grand_total: function() {
      this.total_final = this.subtotal - this.discount;
      return this.total_final;
    },
    findTotal: function() {
      this.subtotal = 0;
      this.totalpoints = 0;
      for (var key in this.products) {
        let entry = this.products[key]
        this.subtotal += entry.price * entry.qty;
        this.totalpoints += entry.points * entry.qty;
      }
    }
  },
  mounted() {
    this.retrieveCart();
  },
};
</script>

<style scoped>
#pagebody {
  background-color: #d8e2dc;
  width: 100%;
  min-height: 900px;
  position: relative;
}

.cart-icon {
  position: absolute;
  font-size: 40px;
  width: 70px;
  height: 70px;
  background: #67a9a2;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;
  align-content: center;

  left: 25%;
  top: 14%;
}

hr {
  position: absolute;
  width: 47%;
  height: 0px;
  border-top: 2px dashed #006d77;

  top: 16%;
  left: 28%;
}

.card-icon {
  position: absolute;
  font-size: 35px;
  width: 70px;
  height: 70px;
  background: #91ccc6;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;

  left: 46%;
  top: 14%;
}

.tick-icon {
  position: absolute;
  font-size: 40px;
  width: 70px;
  height: 70px;
  background: #91ccc6;
  border-radius: 50%;
  text-align: center;
  line-height: 70px;
  vertical-align: middle;

  left: 71%;
  top: 14%;
}

.leaf-icon {
  font-size: 20px;
  color: #006d77;
}

#cartlist {
  width: 65%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  max-height: 350px;
  background-color: whitesmoke;
  border-radius: 25px;
  position: relative;
  float: left;
  margin-top: 14%;
  margin-left: 18%;
  overflow-y: scroll;
  padding-right: 0.5%;
}

#headings {
  display: flex;
  list-style-type: none;
  border-bottom: 1px solid black;
  padding: 2%;
}

#itemrow {
  display: flex;
  list-style-type: none;
}

ul {
  list-style-type: none;
}

li {
  flex: 1.5;
  text-align: center;
}

#productheader {
  flex: 8.5;
  text-align: center;
  margin-right: 10%;
}

#itemname {
  flex: 8.5;
  text-align: center;
  margin-right: 10%;
  display: flex;
}

#co2footprint {
  content: url("https://api.iconify.design/iwwa:co2.svg?height=30");
  vertical-align: -0.5em;
}

#details {
  margin-top: 1%;
  position: relative;
  float: right;
  margin-right: 18%;
}

#item_img {
  width: 80px;
  height: 80px;
}

#item_span {
  flex-basis: 200px;
}

#checkout {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 7px;
  position: relative;
  float: right;
  margin-right: -12%;
  margin-top: 12%;
}

#view_total {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 5px;
}

#browse {
  font-family: "Garamond";
  font-size: 15px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  padding: 7px;
  position: relative;
  float: right;
  margin-right: -5%;
  margin-top: 12%;
}
</style>