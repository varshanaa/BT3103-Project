<template>
<div>
    <!-- <headercomp></headercomp><br> -->
    <div> 
        <div id="left-side">
            <ul>
                <li><img id="productimg" :src= "this.pdt.data.img_url"></li><br>
                <li>Price: ${{this.pdt.data.price}}</li><br>
                <li><img src= "https://www.flaticon.com/svg/vstatic/svg/3428/3428273.svg?token=exp=1616926045~hmac=2c10a9d1a2633e89766b08ad8957415a">
                Carbon Footprint: {{this.pdt.data.footprint}}</li><br>
                <li><img id="ecopointslogo" src= "https://www.flaticon.com/svg/vstatic/svg/525/525891.svg?token=exp=1616770944~hmac=76d70d7e6dedc91d7bd2ad46d38d22f4">
                <b> ECO Points: {{this.pdt.data.points}}</b></li><br>
                <li><span>Quantity: </span><input type="number" id="qtyinput"></li><br><br>
                <li><button id="addtocart">Add to Cart</button></li>
            </ul>
        </div>
        <div id="right-side">
            <ul>
                <li id="name"><b>{{this.pdt.data.name}}</b>
                <likebutton v-bind:id="this.id" v-on:like= "onLike"></likebutton></li>
                <li id="company_name"> From: {{this.company_name}}</li><br><br><br>
                <li id="green"><u>DESCRIPTION</u></li>
                <li id="black">{{this.pdt.data.description}}</li><br><br>
                <li id="green"><u>INGREDIENT SPECIFICATIONS</u></li>
                <li id="black">{{this.pdt.data.ingred_spec}}</li><br><br>
                <li id="green"><u>PRODUCT SPECIFICATIONS</u></li>
                <li id="black">{{this.pdt.data.product_spec}}</li><br><br>
                <li id="green"><u>CARING FOR ME</u></li>
                <li id="black">{{this.pdt.data.care}}</li>
            </ul>
        </div>
    </div>
    <footercomp></footercomp>
</div>
</template>

<script>
// import Header from './HeaderComponent.vue';
import Footer from "./FooterComponent.vue";
import {fb, database} from "../firebase.js";
import LikeButton from './LikeButton.vue';


export default {
    data() {
        return {
            pdt: {
                pdtID: this.id,
                data: []
            },
            user: fb.auth().currentUser,
            //user_id: user.uid,
            company_id: '',
            company_name: ''
        }
    },
    props: {
    id: {
      type: String,
        }   
    },
    components: {
        //headercomp: Header,
        footercomp: Footer,
        likebutton: LikeButton
    },
    methods: {
        fetchItems: function() {
            database
            .collection("products")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id == this.id) {
                        this.pdt.data = doc.data();
                        this.company_id = this.pdt.data.company_id
                    }
                });
            });
        },
        fetchCompany: function() {
            database
            .collection("companies")
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id == this.company_id) {
                        this.company_name = doc.data().name;
                    }
                });
            });
        },
        onChange: function (id, isClicked) {
        // need to use this.user_idß
            if (isClicked) { //if liked, add to likedProducts
            this.likedProducts.push(id);
            } else { //if unliked, remove from likedProducts
                for (let i = 0; i < this.likedProducts.length; i++) {
                const curr_prdt = this.likedProducts[i];
                    if (curr_prdt === id) {
                        this.likedProducts.splice(i, 1); 
                        break;
                    }
                }
            }
            let listOfId = new Object;
            listOfId["pdt_id"] = this.likedProducts;
            database.collection("liked").doc("3").set(listOfId); //doc id is user id
        }
    },
    created() {
        this.fetchItems();
        this.fetchCompany();
  },
}
</script>



 <style scoped>

#left-side {
    background-color: #D8E2DC;
    width: 40%;
    min-height: 850px; 
    font-family: 'EB Garamond';
    font-size: 22px;
    float: left;
}



#productimg {
    width: 350px;
    height: 350px;
    border: 8px solid #B3CDBD;
    margin-top: 70px;
}

ul {
    list-style-type: none;
}

#qtyinput {
    text-align: center;
    width: 70px;
    height: 25px;
    font-family: 'EB Garamond';
    background: #C1D9CA;
    border-radius: 6px;
}

img {
    width: 30px ;
    height: 30px; 
    vertical-align: middle;
}

#addtocart {
    background: #006D77;
    color: #FFFFFF;
    font-size: 22px;
    border-radius: 6px;
    padding: 8px;
    border: 0px;
    font-family: 'EB Garamond';
}

#right-side {
    background-color: #D8E2DC;
    width: 60%;
    margin-left: 40%;
    min-height: 850px; 
    font-family: 'EB Garamond';
    font-size: 22px;
}

#name {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-left: 55px;
    padding-top: 10%;
    color: #00565E;
    font-size: 48px;
}

#company_name {
    color: #006D77;
    font-size: 26px;
}

#green {
    text-align: left;
    color: #006D77;
    margin-left: 15%;
}

#black {
    font-size: 20px;
    text-align: left;
    width: 65%;
    margin-left: 15%;
}

 </style>