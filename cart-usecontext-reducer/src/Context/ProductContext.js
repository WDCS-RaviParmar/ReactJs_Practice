import { createContext, useContext, useEffect, useReducer, useState} from "react";
import ProductReducer from "../Reducer/ProductReducer";

export let ProductContext = createContext([]);

// function countTotalPrice(){
 
// }

export function ProductContextProvider({ children }) {
  let intialVal = JSON.parse(localStorage.getItem("cart")) || [];
  let [cartProducts, dispatch] = useReducer(ProductReducer, intialVal);
  let [totalPrice, setTotalPrice] = useState(0)

  useEffect(() =>{
    if(JSON.parse(localStorage.getItem('cart')) != []){
      let total = cartProducts?.reduce((total, obj) => {
        return total + (obj.price * obj.quantity);
      }, 0);
      setTotalPrice(total)
    }
  }, [cartProducts])

  // let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0

  return (
    <ProductContext.Provider value={{ cartProducts, dispatch, totalPrice }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext(){
  return useContext(ProductContext)
}
