<template>
	<div class="homepage">
		<div class="newspaper-content">
			<a href="#" class="nav-prev arrow left" v-on:click="prevNews()"></a>
			<div class="newspaper-feed">
				<img class="news" v-bind:src="this.newsfeed[this.index].image" v-bind:href="this.newsfeed[this.index].link"/> 
			</div>
			<a href="#" class="nav-next arrow right" v-on:click="nextNews()"></a>
		</div>
			<div class="stores-title"> Partner Stores </div>
			<ul>
				<li v-for="shop in shopsList" v-bind:key="shop.name">
					<img v-bind:src="shop.img_url" :id="shop.name" v-on:click="route($event)">
					<h2> {{shop.name}} </h2>
				</li>
			</ul>
		<Footer/>
	</div> 
</template>

<script>
import {database} from "../firebase.js"
import Footer from './FooterComponent.vue'

export default({
	data(){
		return{
			shopsList:[],
			newsfeed:[],
			index: 0,
		}
	},

	components: {
		Footer
	},

	methods: {
		fetchItems: function(){
			database.collection("companies").get().then((querySnapShot) =>{
				let shop = {};
				querySnapShot.forEach(doc => {
					shop = doc.data();
					this.shopsList.push(shop);
				})
			})
		},
		fetchnews: function(){
			database.collection("newsfeed").get().then((querySnapShot) => {
				let news ={};
				querySnapShot.forEach(doc =>{
					news = doc.data();
					this.newsfeed.push(news);
				})
			}) 
		},

		prevNews: function(){
			if(this.index != 0){
				this.index -= 1;
			} else{
				this.index == 0;
			}
		},

		nextNews: function(){
			if(this.index < this.newsfeed.length){
				this.index += 1;
				console.log(this.index)
			} else{
				this.index = this.newsfeed.length;
			}
		},

		route: function(event) {
			let shop_name = event.target.getAttribute("id");
			this.$router.push({ name: "isp", params: { id: shop_name } });
		},

	},

	created(){
		this.fetchItems(),
		this.fetchnews()
	}

})
</script>


<style scoped>
.homepage {
	width: 100%;
    margin: 0px;
    box-sizing: border-box;
}

.newspaper-feed {
	width: 70%;
	height: 500px;
  border: 6px solid rgba(104, 138, 117, 1);
  display: inline-block;
  margin: 50px;
}
.news{
	margin-top:5px;
	width: 100%;
	height: 480px;
}

.stores-title {
	font-size: 40px;
	font-family: 'EB Garamond';
}

.filters {
	margin-top: 40px;
	margin-bottom: 20px;
	font-size: 30px;
}

ul {
  display: inline-flex;
	flex-wrap: wrap;
	gap:60px;
  list-style-type: none;
	justify-content: center;
  padding-left: 0px;
}

li {
  text-align: center;
	list-style-type: none;
}

img {
    width: 380px;
    height: 300px;
}

h2{
	font-family: 'EB Garamond';
	font-size: 20px;
	color: rgba(0, 86, 94, 1);
	padding:10px;
}

.arrow{
	position:absolute;
	top: 48%;z-index:9999;
	width: 2rem;
  height: 2rem;
  background: transparent;
  border-top: .2rem solid #fff;
  border-right: .2rem solid #fff;
  box-shadow: 0 0 0 lightgray;
  transition: all 200ms ease;
  mix-blend-mode: difference;
}

.arrow.left{
  left: 20px;
  transform: translate3d(0,-50%,0) rotate(-135deg);
}

.arrow.right{
	right: 20px;
  transform: translate3d(0,-50%,0) rotate(45deg);
}

.nav-prev,.nav-next{
  top:48%;
}


</style>