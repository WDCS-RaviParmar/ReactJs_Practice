import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Home from "./Home";
import Navbar from "./Navbar";
import { ProductContextProvider } from "./Context/ProductContext";

function App() {
  return (
    <BrowserRouter>
      <ProductContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ProductContextProvider>
    </BrowserRouter>
  );
}

export default App;
