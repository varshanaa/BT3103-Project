<template>
  <div>
    <br />
    <div id="pagebody">
      <div id="filters">
        <ul id="filtersUL">
          <b>FILTERS:</b>
          <li id="filtersLI" v-for="opt in optionsAPP" v-bind:key="opt">{{ opt }}</li>
        </ul>
      </div>

      <div v-if="products.length > 0">
        <ul id="pdtlist">
          <li id="pdt" v-for="product in products" v-bind:key="product[0]">
            <img
              v-bind:id="product[0]"
              width="250px"
              height="250px"
              :src="product[1].img_url"
              v-on:click="route($event)"
            />
            <br />
            <span id="name_like">
              {{ product[1].name }}
              <likebutton v-bind:id="product[0]"></likebutton>
            </span>
            <span id="cost">${{ product[1].price }}</span>
            <span id="productPoints">
              <span id="leafIcon">
                <i class="fa fa-leaf"></i>
              </span>
              {{ product[1].points }} points
            </span>
            <br />
            <br />
          </li>
        </ul>
      </div>
      <div v-else-if="show == false">
        <div id="noPdt">No products found.</div>
      </div>
    </div>
    <footercomp></footercomp>
  </div>
</template>

<script>
import Footer from "./FooterComponent.vue";
// import {fb, database} from './firebase';
import { database } from "../firebase";
import LikeButton from "./LikeButton.vue";
export default {
  data() {
    return {
      products: [], //products is an array, where each element is an array -> [doc.id, doc.data()]
      optionsAPP: ["PRICE RANGE", "SHOP"],
      //user: fb.auth().currentUser,
      //user_id: user.uid
      show: true
    };
  },
  components: {
    footercomp: Footer,
    likebutton: LikeButton
  },
  methods: {
    fetchProducts: function() {
      const keyword = this.$route.query.searchTerm;
      database
        .collection("products")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            if (keyword === "" || keyword == null) {
              this.products.push([doc.id, doc.data()]);
            } else {
              let pdtName = doc.data().name;
              if (pdtName.toLowerCase().includes(keyword.toLowerCase())) {
                this.products.push([doc.id, doc.data()]);
              } else {
                this.show = false; //product is not what user wants
              }
            }
          });
        });
    },
    route: function(event) {
      let product_id = event.target.getAttribute("id");
      this.$router.push({ name: "ipp", params: { id: product_id } });
    }
  },
  created() {
    this.fetchProducts();
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
#filters {
  background-color: #81af93;
}
#filtersUL {
  width: 100%;
  max-width: 30%;
  text-align: center;
  font-size: 20px;
  display: flex;
  list-style-type: none;
  color: white;
  font-family: "EB Garamond";
}
#filtersLI {
  flex-grow: 0.3;
  text-align: center;
  font-size: 20px;
}
#pdtlist {
  width: 100%;
  margin: 0px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#pdt {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  flex-basis: 300px;
  min-width: 33.3%;
  max-width: 33.3%;
  font-family: "EB Garamond";
  font-size: 24px;
  font-weight: bold;
  color: #00565e;
}
#cost {
  margin-left: 20%;
  font-size: 25px;
  margin-top: 0px;
  font-weight: normal;
}
#productPoints {
  background-color: #8ec693;
  border-radius: 20px;
  padding: 6px;

  color: #006d77;
  font-family: EB Garamond;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;

  margin-left:8%;
}
#leafIcon {
  width: 3%;
  height: 3%;
  border: none;
}
#name_like {
  display: flex;
  /*justify-content: center;*/
  gap: 10px;
  margin-left: 30%;
  align-items: center;
}
/* noPdt: style of page when no prdts found */
#noPdt {
  font-family: "EB Garamond";
  font-size: 32px;
  font-weight: bold;
  color: #00565e;
  text-align: center;
  padding: 5%;
}
</style>