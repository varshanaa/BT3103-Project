<template>
  <div class="editProfile">  
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 30px;">Profile settings</h3>
      </div>
    </div>
    <div class="profile-content">
      <div class="container">
          <div class="col-sm">
            <div class="form-group">
              <input type="text"  v-model="name" :placeholder="this.account.name" class="form-control">
            </div>
          </div>

          <div class="col-sm">
            <div class="form-group">
              <input type="text"  v-model="email" :placeholder="this.account.email" class="form-control">
            </div>
          </div>

          <div class="col-sm">
            <div class="form-group">
              <input type="text"  v-model="password" placeholder="New password" class="form-control">
            </div>
          </div>

          <div class="col-sm">
            <div class="form-group">
              <input type="text" v-model="confirmPassword" placeholder="Confirm password" class="form-control">
            </div>
          </div>

          <div class="col-sm">
            <div class="form-group" style="text-align: right;">
              <input type="submit" v-on:click="updateProfile" value="Save Changes" class="btn btn-primary">
            </div>
          </div>
        </div>
      </div>            
    </div>
</template>

<script>
import {fb, database} from '../firebase';
export default {
  data(){
    return {
      account: {
        name: null,
        email: null
      },
      name:null,
      email:null,
      password:null,
      confirmPassword:null,       
    }
  },
  methods:{
      fetchProfile() {
        var user = fb.auth().currentUser;
        database.collection("users").doc(user.uid).get().then((doc) => {
            this.account.name = doc.data().name
          })
        this.account.email = user.email
      },
      updateProfile(){
        let flag = false;
        var user = fb.auth().currentUser;

        if (this.password !== this.confirmPassword) {
              alert("Passwords do not match!")
        } else if (this.password !== null) {
          user.updatePassword(this.password).then(function() {
            console.log("Password updated successfully")
          }).catch(function(error) {
            console.error(error);
            flag = true;
          }); 
        }       
        
        if (this.email !== null) {
          user.updateEmail(this.email).then(function() {
            console.log("Password updated successfully")
          }).catch(function(error) {
            console.error(error);
            flag = true;
          });
        }

        if (this.name !== null) {
          database.collection("users").doc(user.uid).update({
            name:this.name
          })
          .then(() => {
              console.log("Document successfully updated!");
          })
          .catch((error) => {
              console.error("Error updating document: ", error);
              flag = true;
          });
        }
        if (!flag) {
          alert("Updated successfully!");
        }
        
      }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

.btn-primary {
    background-color: #688A75;
    border-color: #688A75;
    font-family: 'Work Sans';
    color: white;
}

.btn-primary:hover {
    background-color: #516e5c;
    border-color: #516e5c;
}
</style>