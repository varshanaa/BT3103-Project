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
        .push({ path: "/user/app", query: { searchTerm: keyword } }) //link to AllProductsPage.vue
        .then(() => location.reload());
    },
  },
};
</script>

<style scoped>
#searchbar {
  border-radius: 6px;
}
</style>