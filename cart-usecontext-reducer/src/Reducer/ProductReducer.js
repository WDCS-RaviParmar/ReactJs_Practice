export default function ProductReducer(state, action) {
  switch (action.type) {
    case "add": {
      let flag = true;
      for (let index in state) {
        if (state[index].id === action.product.id) {
          let copyProducts = JSON.parse(JSON.stringify(state));
          copyProducts[index].quantity += 1;
          copyProducts[index].total = copyProducts[index].price * copyProducts[index].quantity;
          localStorage.setItem("cart", JSON.stringify(copyProducts));
          flag = false;
          break;
        }
      }
      if (flag) {
        localStorage.setItem(
          "cart",
          JSON.stringify([...state, { ...action.product, quantity: 1, total: action.product.price }])
        );
      }
      return JSON.parse(localStorage.getItem("cart"));
    }
    case "minus": {
      let productssss;
      if(action.quantity > 1){
        productssss = state.map((product) => {
          return product.id === action.productId
            ? { ...product, quantity: product.quantity - 1, total: (product.price * (product.quantity - 1)) }
            : product;
        });
      }
      else{
        productssss = state.filter((product)=>{
          return product.id != action.productId
        })
      }
      localStorage.setItem("cart", JSON.stringify(productssss));
      return productssss;
    }
    case "clear": {
      // alert('clear')
      localStorage.setItem("cart", JSON.stringify([]));
      return;
    }
  }
}
