Vue.component("Flower", {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
template: `
	<div class="product">
	    	<div class="product-image">
	    		<img :src="image">
	    	</div>
	    	<div class="product-info">
	    		<h1>{{ title }}</h1>
                
                <h4 v-if="property>10">The amont of Flower is more than 10</h4>
                <h4 v-else-if="property <= 10 && property>0">Just remining only {{ property }}</h4>
                <h4 v-else>Not remnant</h4>

                <p>shipping: {{ shipping }}</p>

	    		 <p>{{ productDescription }}</p>

                <ul>
                <li v-for="detail in Details">{{ detail }}</li>
                </ul>

                <h4 v-if="colorDiv">Color</h4>
                <h4 v-else>Have Not Color</h4>
                <div v-for="(variant, index) in variants" :key="variant.id" class="color-box"
                :style="{ backgroundColor: variant.color }"
                @mouseover="UpdateImage(index)">
                </div>
<!-- <button @click="cartNumber +=1">Add to Cart</button> -->
	    		<button @click="incrementNumber"
                 :disabled="!property"
                  :class="{ disabledButton: !property}"
                >Add to Cart</button>
	    	</div>

    </div>
`,
	data() {
		return{
		selectedVariant : 0,
		// imageSrc: "./img/blue.jpg",
		productTitle: "Name of Flower",
		brand: "Flowerstation",
		productDescription: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	    		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	    		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	    		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	    		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	    		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	    `,

	    Details: ["Nasrin", "Nargis", "Rose"],
	    variants:[
	    {id:1, color:"white", image:"./img/white.jpg", Quantity:10},
	    {id:2, color:"blue", image:"./img/blue.jpg", Quantity:20},
	    {id:3, color:"red", image:"./img/red.jpg", Quantity:0}
	    ],
	    colorDiv: true
	}
	}
		,
	methods:{
		incrementNumber() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
			// this.$emit('add-to-cart')
		},
		UpdateImage(index) {
			this.selectedVariant = index;
			console.log(index)
		}
	},
	computed: {
		title() {
			return this.brand +" "+ this.productTitle;
		},
		image() {
			return this.variants[this.selectedVariant].image;
		},
		property() {
			return this.variants[this.selectedVariant].Quantity
		},
		shipping() {
			if(this.premium) {
				return "Free"
			}
			return "3.99$"
		}
	}

})
var app = new Vue({
	el:"#app",
	data: {
	premium: false,
	cartNumber: []
	// cartNumber: 0	
	},
	methods: {
		updateCart(id) {
			this.cartNumber.push(id)
			// this.cartNumber++;
		}
	}
	})