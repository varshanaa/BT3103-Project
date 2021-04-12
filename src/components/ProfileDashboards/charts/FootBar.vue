<template>
  <div>
    <h2>Footprint of Products Purchased</h2>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./FootBar.js";
export default {
  components: {
    chart: Chart
  }
};
</script>

<style scoped>
div {
  position: relative;
  top: 240px;
}
</style>