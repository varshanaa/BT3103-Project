<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #C1D9CA;">
    <a
      class="navbar-brand"
      href="/"
      style="font-family:EB Garamond; margin-right: 10px; font-size: 23px;"
    >
      <img
        src="../../public/YGS-logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        style="margin: 0px 10px;"
      />
      Your Green Stop
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin: 0px 10px;">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle active"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style="color:#4e6657;"
          >Products</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <b-input-group id="searchBar" size="sm" class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
              <b-form-input type="search" placeholder="Search products"></b-form-input>
            </b-input-group>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">View all products</a>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item justify-content-end">
          <a class="nav-link">
            <LoginSignup />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LoginSignup from "./LoginSignup.vue";

export default {
  components: {
    LoginSignup
  }
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0%;
  background: #edf6f9;
}

#searchBar {
  padding: 5px;
}
</style>
