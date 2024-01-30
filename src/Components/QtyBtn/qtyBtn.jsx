import { useAppStore } from "../../store";
import "./qtyBtn.css";

const QtyBtn = ({ item }) => {
  const { cart, setCart } = useAppStore();

  let qt = cart.find((el) => el.product.id === item.id)?.qt || 0;

  const handleChange = (newQt) => {
    // check if qt === 0 then we should remove it from cart
    if (newQt === 0) {
      setCart(cart.filter((el) => el.product.id !== item.id));
    } else {
      // create item object for the cart
      let newItem = {
        product: item,
        qt: newQt,
      };

      // find index of the item in cart if no exist it will return -1 and we should add new obj in the cart
      let index = cart.findIndex((el) => el?.product?.id === item?.id);
      if (index === -1) {
        // add new obj in the cart if it no exist
        setCart([...cart, newItem]);
      } else {
        // if the object exist in the cart then we should update it by index
        let arr = [...cart];
        arr[index] = newItem;
        setCart(arr);
      }
    }
  };

  return (
    <div className="qty-btn">
      {qt === 0 ? (
        <button className="add-btn" onClick={() => handleChange(1)}>
          Add
        </button>
      ) : (
        <div className="qty-group">
          <button className="dec-btn" onClick={() => handleChange(qt - 1)}>
            -
          </button>
          <span className="value">{qt}</span>
          <button className="inc-btn" onClick={() => handleChange(qt + 1)}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default QtyBtn;
