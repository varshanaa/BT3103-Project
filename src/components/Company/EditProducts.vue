<template>
  <div style="min-height: 100vh;">
  <div class="editDescription" style="margin: 100px;">    
    <div class="intro h-100">
      <div class="h-100 align-items-center">
        <h3 style="margin: 40px;">Edit Product Details</h3>
      </div>
    </div>

    <div>
      <div class="container">

          <div>
            <div class="form-group"> 
              <label>Product Name</label>
              <input type="text"  v-model="name" placeholder="Name" class="form-control">             
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Price</label>
              <input type="text" v-model="care" placeholder="Eg. 5.60" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text"  v-model="description" placeholder="Describe your product" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Ingredients Specifications</label>
              <textarea type="text" v-model="ingred_spec" placeholder="Let consumers know what it is made up of!" class="form-control"/>
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Product Specifications</label>
              <input type="text" v-model="pdt_spec" placeholder="Eg. 10cm x 8cm x 5cm" class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group">
              <label>Caring For Me</label>
              <input type="text" v-model="care" placeholder="Eg. Store in cool places." class="form-control">
            </div>
          </div>

          <div>
            <div class="form-group" style="text-align: right;">
              <input type="submit" v-on:click="updateDetails()" value="Save Changes" class="btn btn-primary">
            </div>
          </div>

        </div>
      </div> 

    </div>
    <Footer/>         
    </div>
</template>

<script>
// import {fb, database} from '../firebase';
import Footer from '../Footer.vue';

export default {
  data(){
    return {
      /* account: {
        name: null,
        email: null
      },
      name:null,
      email:null,
      password:null,
      confirmPassword:null,     */   
    }
  },
  components: {
    Footer
  },
  methods: {
    updateDetails() {

    },
      /* fetchProfile() {
        var user = fb.auth().currentUser;
        database.collection("users").doc(user.uid).get().then((doc) => {
            this.account.name = doc.data().name
          })
        this.account.email = user.email
      },
      updateProfile(){
        var flag = false;
        var user = fb.auth().currentUser;

        if (this.password !== this.confirmPassword) {
            flag = true;
            alert("Passwords do not match!")
        } else if (this.password !== null) {
          user.updatePassword(this.password)
          .catch(function(error) {
            console.error(error);
            flag = true;
          }); 
          this.alertUser(flag);
        }       
        
        if (this.email !== null) {
          user.updateEmail(this.email)
          .catch(function(error) {
            console.error(error);
            flag = true;
          });
          database.collection("users").doc(user.uid).update({
            email:this.email
          })
          .catch((error) => {
              console.error("Error updating document: ", error);
              flag = true;
          });
          this.alertUser(flag);
        }

        if (this.name !== null) {
          database.collection("users").doc(user.uid).update({
            name:this.name
          })
        }
      },
      alertUser(flag) {
        if (!flag) {
        this.$router.replace('/');
        alert("Updated successfully! Sign in again with your new email and password");
        }
      } */
  },
  /* created() {
    this.fetchProfile()
  }  */
};
</script>

<style scoped>
.container {
  max-width: 600px;
  padding-bottom: 15px;
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

label {
  float: left;
}
</style>


