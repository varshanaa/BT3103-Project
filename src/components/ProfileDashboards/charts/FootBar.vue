<template>
  <div>
    <h1 id="chart">Bar Chart</h1>
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
#chart {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>