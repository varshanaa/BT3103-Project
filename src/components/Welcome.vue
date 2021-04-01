<template>
  <div id="welcome">
    <img
      id="dp"
      src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/50hESIkAMqvhBx2QqP4JUT/13ec29c832a1a3022d836cd48ad481ee/profile-picture-04.png?w=278&q=70"
    />
    <div id="hello">Hello, {{ user_name }}!</div>
    <div id="greeting">Welcome back!</div>
    <div id="thanks">Thank you for being part of our community to preserve our mother Earth</div>
    <div id="points">
      {{points}}
      <img id="icon" src="https://image.flaticon.com/icons/png/128/53/53775.png" />
    </div>
  </div>
</template>

<script>
import db from "../firebase.js";
export default {
  data() {
    return {
      users: [],
      points: 30,
      user_name: "Sarah Jane",
      user_img: ""
    };
  },
  methods: {
    fetchUsers: function() {
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.users.push([doc.id, doc.data()]);
          });
        });
    },
    fetchUserData: function() {
      this.points = this.users[0][1]["points"];
      this.user_name = this.users[0][1]["name"];
      this.user_img = this.users[0][1]["user_img"];
    }
  },
  created() {
    this.fetchUsers();
    this.fetchUserData();
  }
};
</script>

<style scoped>
#welcome {
  width: 500px;
  height: 250px;
  background: #81af93;
  border-radius: 25px;
  position: fixed;
  top: 170px;
  left: 40%;
}

#hello {
  font-family: "EB Garamond";

  padding: 2%;
  color: dimgrey;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
}

#greeting {
  font-family: "Apple Chancery";

  padding: 2%;
  color: #00565e;
  font-weight: bold;
  font-size: 30px;
}

#thanks {
  font-family: "EB Garamond";

  padding: 2%;
  color: #00565e;
  font-weight: normal;
  font-size: 15px;
}

#points {
  font-family: "Apple Chancery";

  padding: 2%;
  color: black;
  font-weight: bold;
  font-size: 30px;
}

#icon {
  max-width: 30px;
}

#dp {
  max-width: 80px;
  position: absolute;
  left: 5%;
  top: 10%;
  border-radius: 1000px;
}
</style>