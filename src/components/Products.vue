<template>
   <div> 
    <!-- <headercomp></headercomp><br /> -->
    <div id="pagebody">
      <div id="filters">
        <ul id="filtersUL">
          <b> FILTERS: </b>
          <li id="filtersLI" v-for="opt in optionsAPP" v-bind:key="opt">
            {{ opt }}
          </li>
        </ul>
      </div>
      <div>
        <ul id="pdtlist">
          <li id="pdt" v-for= "product in products" v-bind:key= "product[0]">
            <img v-bind:id= "product[0]" width = 250px height= 250px :src= "product[1].img_url" v-on:click= "notLoggedIn"/> <br />
            <span id="name">{{ product[1].name}}</span>
            <br />
            <span id="cost">${{ product[1].price  }}</span>
            <span id="points"> <img id="ecopointslogo" src= "https://www.flaticon.com/svg/vstatic/svg/525/525891.svg?token=exp=1616770944~hmac=76d70d7e6dedc91d7bd2ad46d38d22f4">
            {{ product[1].points }} pts </span>
            <br /><br />
          </li>
        </ul>
      </div>
    </div>
    <footercomp></footercomp>
  </div>
</template>

<script>
// this page is for non-logged in users

    //import Header from "./HeaderComponent.vue";
    import Footer from "./FooterComponent.vue";
    import {firebase, database} from '../firebase';
    import LikeButton from './LikeButton.vue';
export default {
    data() {
        return {
        products: [], //products is an array, where each element is an array -> [doc.id, doc.data()]
        optionsAPP: ["PRICE RANGE", "SHOP"],
        };
    },
    components: {
        //headercomp: Header,
        footercomp: Footer,
        likebutton: LikeButton
    },
    methods: {
        fetchProducts: function () {
        database
        .collection('products')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
              this.products.push([doc.id, doc.data()]);
            });
        });
    },
    notLoggedIn: function() {
        alert("Please log in to view this product.")
        // user is not able to view individual product unless logged in
    }
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
#pdt {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  flex-basis: 300px;
  min-width: 33.3%;
  max-width: 33.3%;
  font-family: 'EB Garamond';
  font-size: 24px;
  font-weight: bold;
  color: #00565E;
}

#cost {
    margin-left: 100px;
    font-size: 20px;
}

#points {
    text-align: left;
    background: #8EC693;
    font-weight: normal;
    font-size: 14px;
    padding: 8px;
    border-radius: 12px;
    margin-left: 40px;
}

</style>