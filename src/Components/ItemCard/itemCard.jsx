import QtyBtn from "../QtyBtn/qtyBtn";
import "./itemCard.css";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-img">
        <img src={item?.thumbnail} />
        <div className="card-qty">
          <QtyBtn item={item} />
        </div>
      </div>
      <div className="item-info">
        <p className="title">{item?.title}</p>
        <p className="price">{item?.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
