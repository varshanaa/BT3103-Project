<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #B0E0E6;">
    <a class="navbar-brand" href="/company/home">
      <img src="../../../public/YGS-logo.svg" width="30" height="30" class="d-inline-block align-top" style="margin: 0px 10px;" >
      Your Green Stop
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin: 0px 10px;">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown justify-content-end" style="align-self: center;">
          <a class="nav-link dropdown-toggle active" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:#4e6657; font-size: 17px; margin-right: 10px;">
            Welcome, {{this.name}}!
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <a class="dropdown-item" href="/user/profile" style="padding: 0.5rem 1.5rem;"><b-icon style="margin-right: 15px;" icon="person-circle"></b-icon>View Profile</a>
            <a class="dropdown-item" href="/user/editprofile" style="padding: 0.5rem 1.5rem;"><b-icon style="margin-right: 15px;" icon="pencil-square"></b-icon>Edit Profile</a>
            <div class="dropdown-divider"></div> -->
            <a class="dropdown-item" v-on:click="logout" style="cursor: pointer;padding: 0.5rem 1.5rem;"><b-icon style="margin-right: 15px;" icon="power"></b-icon>Logout</a>
            </div>
        </li>
      </ul>
    </div>
  </nav>
  <router-view/>
</div>
</template>

<script>
import {fb, database} from '../../firebase';

export default {
 data() {
    return {
      name: null
    }
  },
  methods: {
    fetchUserData(){
      //might need to change code for company?
      let id = fb.auth().currentUser.uid;
      database.collection("users").doc(id).get().then((doc) => {
        this.name = doc.data().name
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
.navbar-brand{
  font-weight: 700;
  font-size: 23px;
  font-family: EB Garamond;
  font-variant-caps: small-caps;
}
</style>
