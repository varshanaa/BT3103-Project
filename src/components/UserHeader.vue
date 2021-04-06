<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #C1D9CA;">
    <a class="navbar-brand" href="/user/home" style="font-family:EB Garamond; margin-right: 10px; font-size: 23px;">
      <img src="../../public/YGS-logo.png" width="30" height="30" class="d-inline-block align-top" style="margin: 0px 10px;">
      Your Green Stop
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown justify-content-end">
          <a class="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#4e6657; margin-right: 10px;">
            Welcome, {{this.name}}!
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/user/profile"><b-icon style="margin-right: 15px;" icon="person-circle"></b-icon>View Profile</a>
            <a class="dropdown-item" href="/user/editprofile"><b-icon style="margin-right: 15px;" icon="pencil-square"></b-icon>Edit Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" v-on:click="logout" style="cursor: pointer;"><b-icon style="margin-right: 15px;" icon="power"></b-icon>Logout</a>
          </div>
        </li>
        <li class="nav-item justify-content-end">
          <LikedProducts/>
        </li>
        <li>
          <b-icon icon="cart-2" width="30px" height="30px"></b-icon>
        </li>
      </ul>
      
    </div>
  </nav>
  <router-view/>
</div>
</template>

<script>
import LikedProducts from './LikedProducts.vue'
import {fb, database} from '../firebase';

export default {
  data() {
    return {
      name: null
    }
  },
  components: {
    LikedProducts
  },
  methods: {
    fetchUserData(){
      let id = fb.auth().currentUser.uid;
      database.collection("users").doc(id).get().then((doc) => {
        this.name = doc.data().name
        console.log(doc.data())
      })
    },
    logout(){
          fb.auth().signOut()
          .then(() => {
              this.$router.replace('/');
          })
          .catch((err) =>{
              console.log(err);
          });
      }
  },
  created() {
    this.fetchUserData()
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

.dropdown-item {
  padding: 7px 24px;
   margin: 7px 0px;
}
</style>
