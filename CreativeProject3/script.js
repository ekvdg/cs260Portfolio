const items=[{
  id:'0',
  name: 'Atom Shirt',
  price: 19.99
}, {
  id: '1',
  name: 'Git Shirt',
  price: 24.99
}, {
  id: '2',
  name: 'Function Shirt',
  price: 14.99
}, {
  id: '3',
  name: 'Binary Shirt',
  price: 24.99
}, {
  id: '4',
  name: 'Algebra Shirt',
  price: 14.99
}, {
  id: '5',
  name: 'Programming Languages Shirt',
  price: 19.99
}, {
  id: '6',
  name: 'HTML Shirt',
  price: 14.99
}, {
  id: '7',
  name: 'CSS Shirt',
  price: 19.99
}, {
  id: '8',
  name: 'Pi Shirt',
  price: 14.99
}]


let app = new Vue({
  el:'#app',
  data:{
    list: items,
    cart: [],
    totalPrice: 0,
    cartAmount: 0
  },
  methods:{
    addToCart: function (id) {
      this.cartAmount = this.cartAmount + 1;
      this.totalPrice = Math.round((this.totalPrice + items[id].price) * 100) / 100;
      this.cart.push(items[id]);
    },
    deleteFromCart: function(id){
      if(this.cart.includes(items[id])){
        if(this.cartAmount > 0){
          this.cartAmount = this.cartAmount - 1
        }
        if(this.totalPrice - items[id].price > 0){
          this.totalPrice = Math.round((this.totalPrice - items[id].price) * 100) / 100;
        }
        else {
          this.totalPrice = 0;
        }
        removeIndex = this.cart.indexOf(items[id]);
        if(removeIndex > -1) {
          this.cart.splice(removeIndex, 1);
        }
      }
    }
  }
});
