<template>
	<div class="homepage">
		<div class="newspaper-content">
			<div class="newspaper-feed">
			</div>
			<div class="stores-title"> Partner Stores </div>
			<div class = "filters"> 
				<div class= "categories-filter"> Categories </div>
			</div>
			<ul>
				<li v-for="shop in shopsList" v-bind:key="shop.name">
					<img v-bind:src="shop.img_url">
					<h2> {{shop.name}} </h2>
				</li>
			</ul>
		</div>
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
		}
	},

	created(){
		this.fetchItems()
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
	width: 75%;
	height: 500px;
    border: 2px solid rgba(104, 138, 117, 1);
    display: inline-block;
    margin: 50px;
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
</style>
