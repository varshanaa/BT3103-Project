<template>
  <div>
    <input id="searchbar" placeholder="Search Products" v-on:keyup.enter="route($event)"/> 
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    route: function (event) {
      let keyword = event.target.value;
      this.$router
        .push({ path: "app", query: { searchTerm: keyword } }) //link to allProductsPage
        .then(() => location.reload());
    },
  },
};
</script>

<style scoped>
#searchbar {
  position: absolute;
  text-align: center;
  top: 58px;
  width: 300px;
  height: 25px;
  left: 40%;
  font-family: "EB Garamond";
  background: #c1d9ca;
  border-radius: 6px;
} 
</style>