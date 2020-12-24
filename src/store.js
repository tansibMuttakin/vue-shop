import { createStore } from 'vuex'
let cart  = window.localStorage.getItem('cart');

// Create a new store instance.
const store = createStore({
  state () {
    return {
        cart:cart ? JSON.parse(cart) : [],
    }
  },
  mutations:{
    addToCart(state,payload){
      let found = state.cart.find(item => item.itemId == payload.itemId);
      if (found) {
        found.itemQuantity++;
        console.log(payload.itemPrice);
        // found.itemPrice = found.itemQuantity*payload.itemPrice;
      } else {
        state.cart.push(payload);
      }
      this.commit('saveData');
    },
    saveData(state){
      window.localStorage.setItem('cart',JSON.stringify(state.cart));
    },
    removeItemFromCart(state,item){
      let itemIndex = state.cart.indexOf(item);
      state.cart.splice(itemIndex,1);
      this.commit('saveData');
    },
    emptyCart(state){
      state.cart = [];
      window.localStorage.clear();
    },
    addItemQuantity(state,payload){
      let found = state.cart.find(item => item.itemId == payload.itemId);
      found.itemQuantity++;
    },
    subItemQuantity(state,payload){
      let found = state.cart.find(item => item.itemId == payload.itemId);
      if (found.itemQuantity>1) {
        found.itemQuantity--;
      }
    }
  }
})
export default store;