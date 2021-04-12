<template>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgba(237, 246, 249, 1);">
  <a class="navbar-brand" href="/">
    <img id = "logo" src="https://www.flaticon.com/svg/vstatic/svg/892/892890.svg?token=exp=1618039722~hmac=99b1b851ced0bb4aec0991ab9e5749f5">
    Your Green Stop
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin: 0px 10px;">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#4e6657;font-family:EB Garamond; font-size: 17px">
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <b-input-group id="searchBar" size="sm" class="mb-2">
            <search-bar></search-bar>
            <!-- <b-input-group-prepend is-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" placeholder="Search products"></b-form-input>-->
          </b-input-group> 
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">View all products</a>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav-item justify-content-end">
        <a class="nav-link"><LoginSignup/></a>
      </li>
    </ul>
    
  </div>
</nav>
</template>

<script>
import LoginSignup from './LoginSignup.vue'
import SearchBar from './SearchBar.vue'
export default {
  components: {
    LoginSignup,
    SearchBar
  }
}
</script>

<style scoped>
header {
	background: #EDF6F9;
}
#searchBar {
  padding: 5px;
}
.navbar-brand{
  font-weight: 700;
  font-size: 16px;
  text-transform:uppercase;
  color: rgba(36,88,57,1);
  font-family: EB Garamond;
}
#logo {
    width: 30px;
    height: 30px; 
    margin-right: 7px;
}
</style>
