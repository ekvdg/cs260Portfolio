const productList=[{
  id:'0',
  name: 'Atom Shirt',
  price: 19.99,
  quantity: 0
}, {
  id: '1',
  name: 'Git Shirt',
  price: 24.99,
  quantity: 0
}, {
  id: '2',
  name: 'Function Shirt',
  price: 14.99,
  quantity: 0
}, {
  id: '3',
  name: 'Binary Shirt',
  price: 24.99,
  quantity: 0
}, {
  id: '4',
  name: 'Algebra Shirt',
  price: 14.99,
  quantity: 0
}, {
  id: '5',
  name: 'Programming Languages Shirt',
  price: 19.99,
  quantity: 0
}, {
  id: '6',
  name: 'HTML Shirt',
  price: 14.99,
  quantity: 0
}, {
  id: '7',
  name: 'CSS Shirt',
  price: 19.99,
  quantity: 0
}, {
  id: '8',
  name: 'Pi Shirt',
  price: 14.99,
  quantity: 0
}]


let app = new Vue({
  el:'#app',
  data:{
    list: productList,
    items: [],
  },
  created() {
    this.items = [];
    this.getItems();
  },
  computed: {
    cartAmount(){
      if(this.items.length === 0) { return 0; }
      return this.items.reduce((total,item) => {return total + item.quantity}, 0);
    },
  },
  methods:{
    async addItem(id) {
      let item = productList[id];
      try {
        let r2 = await axios.post('/api/items', {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(id){
      let item = productList[id];
      try {
        let response = axios.delete("/api/items/" + item.id);
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
