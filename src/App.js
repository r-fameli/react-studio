import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import { BakeryItem } from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  /* add your cart state code here */
  const [cart, setCart] = useState({}); // {name: quantity}

  // Set this up to look up prices later
  const priceMap = {};
  bakeryData.forEach(({ name, price }) => {
    priceMap[name] = price;
  });

  const updateCart = (name) => {
    if (name in cart) {
      cart[name] = cart[name] + 1;
      setCart({ ...cart });
    } else {
      cart[name] = 1;
      setCart({ ...cart });
    }
    console.log(cart);
  };

  let cartTotal = 0;
  for (const itemName in cart) {
    cartTotal += cart[itemName] * priceMap[itemName];
  }
  cartTotal = Math.round(cartTotal * 100) / 100;

  return (
    <div className="App">
      <h1>My Bakery</h1>
      <main>
        <div className="items">
          {bakeryData.map((item, index) => {
            const { name, description, price, image } = item;
            return (
              <BakeryItem
                updateCart={updateCart}
                name={name}
                description={description}
                price={price}
                image={image}
                key={index}
              ></BakeryItem>
            );
          })}
        </div>
        <div className="cart-container">
          <div className="cart">
            <h2>Cart</h2>
            <div className="inner-cart">
              {Object.keys(cart).map((itemName, index) => {
                const quantity = cart[itemName];
                const itemTotal =
                  Math.round(priceMap[itemName] * cart[itemName] * 100) / 100;
                return (
                  <div key={index}>
                    <strong>{itemName}</strong>
                    <br />
                    {quantity} x ${priceMap[itemName]} = ${itemTotal}
                  </div>
                );
              })}
            </div>
            <h1>Total: ${cartTotal}</h1>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
