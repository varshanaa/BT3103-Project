<template>
  <div id="footer">
    <span id="motto">LIVE SUSTAINABLY</span>
    <span id="aboutUs">ABOUT US</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#footer {
  width: 1400px;
  height: 50px;
  bottom: 0px;

  background-color: #c1d9ca;
}

#aboutUs {
  position: absolute;
  left: 650px;
  padding: 10px;

  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 33px;
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration-line: underline;

  color: #000000;
}

#motto {
  position: absolute;
  padding: 10px;

  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #153827;
}
</style>