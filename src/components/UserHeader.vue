<template>
<div>
  <header>
    <button id = "signout">SIGN OUT</button>
    <button id = "product"> PRODUCT </button> 
    <b id="websitename">Your Green Stop</b>
    <img id = "logo" src="https://www.flaticon.com/svg/vstatic/svg/892/892890.svg?token=exp=1617044888~hmac=66b5bcb898e1d36f484dee081ee57d81">
    <input id = "searchbar" placeholder="Search">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button id="userprofile"><i class='fa fa-user-circle-o' style='font-size:28px'></i></button>
    <button id="searchicon"><i class="fa fa-search" style='font-size:24px'></i></button>
    <p id="userdata">Welcome {{user}}!</p>
   <button id="likedicon"><i class="fa fa-heart" style='font-size:26px'></i></button>
    <button id="carticon"><i class="fa fa-shopping-cart" style="font-size:28px"></i></button>
  </header>
</div>
</template>

<script>
import {fb} from "../firebase.js"

export default {
  data() {
    return {
      user : "Sarah",
    }
  },
  methods:{
    printProfile: function(){
      const user = fb.auth().currentUser;
      console.log(user);
    }
  },
}
</script>
<style scoped>

 header{
	background: #EDF6F9;
	position: sticky;
  min-height: 120px;
 }

#product{
  position: absolute;
    width: 95px;
    height: 40px;
    left: 20px;
    top: 60px;
    border-radius: 10px;
    font-family: 'EB Garamond';
    font-size: 13px;
    color: #D8E2DC;
    background: #688A75;
}
#signout {
    position: absolute;
    width: 95px;
    height: 40px;
    right:20px;
    top: 60px;
    border-radius: 10px;
    font-family: 'EB Garamond';
    font-size: 13px;
    color: #D8E2DC;
    background: #688A75;
}

#websitename {
  position: absolute;
  font-weight: 500;
  font-size: 20px;
	left: 44%;
  text-transform: uppercase;
  color: rgba(36,88,57,1);
  font-family: EB Garamond;
  margin-top: 10px;
}


#logo {
    position: absolute;
    margin-top: 10px;
    margin-left:190px;
    width: 30px;
		left: 44%;
    height: 30px; 
}

#userdata {
    position: absolute;
    top: 5px;
    left: 80%;
    height: 30px;
}

#userprofile {
   color:#688A75;
   margin-top:14px;
   margin-left: 88%;
   background-color: Transparent;
   background-repeat: no-repeat;
   border: none;
}


#likedicon {
  position: absolute;
  top: 16px;
  left: 92%;
  color:#688A75;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
}

#carticon {
  position: absolute;
  top: 14px;
  left: 96%;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  color:#688A75;
}

#searchbar {
    position: absolute;
    text-align: center;
    top: 58px;
    width: 300px;
    height: 25px;
    left: 40%;
    font-family: 'EB Garamond';
    background: #C1D9CA;
    border-radius: 6px;
}

#search{
   position: absolute;
    margin-top: 58px;
    margin-left:190px;
    width: 30px;
    height: 30px; 
}

#searchicon{
  margin-left:62%;
  margin-top:15px;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  color:#688A75;
}
 </style>
