import "../App.css";

// TODO: create a component that displays a single bakery item
export const BakeryItem = ({
  updateCart,
  name,
  description,
  price,
  image,
}) => {

  return (
    <div className="BakeryItem">
      <div>
        <img src={image} alt={name} />
        <strong>
          {name} (${price})
        </strong>
        <p>{description}</p>
      </div>
      <div className="flex-center">
        <button onClick={() => updateCart(name)}>Add to Cart</button>
      </div>
    </div>
  );
};
