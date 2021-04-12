<template>
<div>
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
          <a class="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"  aria-expanded="false" style="color:#4e6657;font-family:EB Garamond; font-size: 17px">
            Products
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <b-input-group id="searchBar" size="sm" class="mb-2">
            <UserSearchBar/>
            </b-input-group> 
            <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/user/products">View all products</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown justify-content-end">
          <a class="nav-link dropdown-toggle active" id="welcome-user" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Welcome, {{this.name}}!
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" id="view-profile" href="/user/profile"><b-icon style="margin-right: 15px;" icon="person-circle"></b-icon>View Profile</a>
            <a class="dropdown-item" id="edit-profile" href="/user/editprofile"><b-icon style="margin-right: 15px;" icon="pencil-square"></b-icon>Edit Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item"  id="logout" v-on:click="logout" style="cursor: pointer;"><b-icon style="margin-right: 15px;" icon="power"></b-icon>Logout</a>
          </div>
        </li>
        <li class="nav-item justify-content-end" id="like-button">
          <LikedProducts/>
        </li>
        <li>
          <b-icon id="cart-logo" icon="cart-2" width="30px" height="30px"></b-icon>
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
import UserSearchBar from './UserSearchBar.vue'

export default {
  data() {
    return {
      name: null
    }
  },
  components: {
    LikedProducts,
    UserSearchBar
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
#logo {
    width: 30px;
    height: 30px; 
    margin-right: 7px;
}

.navbar-brand{
  font-weight: 700;
  font-size: 16px;
  text-transform:uppercase;
  color: rgba(36,88,57,1);
  font-family: EB Garamond;
}

#searchBar {
  padding: 5px;
}

.dropdown-item {
  padding: 7px 24px;
   margin: 7px 0px;
}

#welcome-user{
  color:#4e6657; 
  margin-right: 10px;
  font-family: EB Garamond;
  text-transform: capitalize;
  font-size: 16px;
  font-weight:600;
}

#view-profile{
  font-family: EB Garamond;
}

#edit-profile{
  font-family: EB Garamond;
}

#logout{
  font-family: EB Garamond;
}

#cart-logo{
  margin-top:5px;
  width:25px;
  height:25px;
}

#like-button{
  margin-right:15px;
}
</style>
