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
        <ul>
          <li><b id="amount">Total: SGD ${{total}}</b></li><br><br>
          <li><input v-model="card_name" placeholder="Card Holder's Name" type="text"></li><br>
          <li><input v-model="card_number" placeholder="Card Number" type="number"></li><br>
          <li><input v-model="expiry" placeholder="Expiry Date" type="text"></li><br>
          <li><input v-model="cvv" placeholder="CVV" type="number" ></li>
        </ul><br><br>
      <div id="buttons"> 
      <button id="cancel" v-on:click="goback()">Cancel</button>
      <button id="continue" v-on:click="route()">Continue</button><br><br>
      </div>
      </div>
    </div>
    <Footer/>
  
  </div>
</template>

<script>
import Footer from "../Footer.vue";
import { fb, database } from "../../firebase.js";

export default {
  data() {
    return {
      card_name: '',
      card_number: '',
      expiry: '',
      cvv: ''
    };
  },
  components: {
    Footer
  },
  props: {
    products: {
      type: Object
    },
    total: {
      type: Number
    },
    totalpoints: {
      type: Number
    }
  },
  methods: {
    route: function() {
      if (this.card_name == '' || this.card_number == '' || this.expiry == '' || this.cvv == '') {
        alert("Fill in all details before proceeding.");
      }
      else {
      let userid = fb.auth().currentUser.uid;
      for (var pdt_id in this.products) {
        let pdt = this.products[pdt_id];
      let new_purchase = {}
      new_purchase.footprint = pdt.footprint
      new_purchase.img_url = pdt.img
      new_purchase.name = pdt.name
      new_purchase.pdt_id = pdt.id
      new_purchase.points = pdt.points
      new_purchase.status = 'purchased'
      new_purchase.user_id = userid
      new_purchase.qty = pdt.qty
      console.log(new_purchase)
      database.collection("purchased").doc().set(new_purchase)
      }
      this.$router.push({ name: "cartconfirm", params: {points: this.totalpoints}});
      }
    },
    goback: function() {
      this.$router.push({name: "cartshipping"});
    }
  }
  };
</script>

<style scoped>
#pagebody {
  background-color: #d8e2dc;
  width: 100%;
  min-height: 800px;
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
  background: #67a9a2;
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
  height: 70%;
  background-color: whitesmoke;
  border-radius: 25px;
  position: relative;
  float: left;
  margin-top: 14%;
  margin-left: 18%;
  padding-right: 0.5%;
}

#amount {
    font-size: 30px;
}

ul {
    list-style-type: none;
}

input {
  width: 60%;
}

#buttons {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}

#continue {
  float: right;
  font-family: "Garamond";
  font-size: 20px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  height: 50px;
  width: 150px;
  margin-right: 30%;

}

#cancel {
  float: left;
  font-family: "Garamond";
  font-size: 20px;
  background-color: #688a75;
  border-color: #688a75;
  color: white;
  border-radius: 5px;
  height: 50px;
  width: 150px;
  margin-left: 30%;
}
</style>
