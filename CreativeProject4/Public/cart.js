var app = new Vue({
  el: '#cart',
  data: {
    items: [],
  },
  created() {
    this.getItems();
  },
  computed: {
    cartAmount() {
      if(this.items.length === 0) {return 0;}
      return this.items.reduce((total,item) => {return total += item.quantity}, 0);
    },
    totalPrice(){
      if(this.items.length === 0) {return 0;}
      return this.items.reduce((total,item) => {return total += (item.quantity * item.price)}, 0);
    }
  },
  methods: {
    async deleteItem(id) {
      try {
        let response = axios.delete("/api/items/" + id);
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
    async addToQuantity(id) {
      try {
        let response = await axios.put("/api/items/" + id, {
          quantity: 1
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async removeFromQuantity(id) {
      try {
        let response = await axios.put("/api/items/" + id, {
          quantity: -1
        });
        if(response.data == false) {
          try {
            this.deleteItem(id);
          } catch (error) {
            console.log(error);
          }
        }
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
  }
});
