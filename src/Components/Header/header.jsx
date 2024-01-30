import { useAppStore } from "../../store";
import Container from "../Container/container";
import SearchBox from "../SearchBox/searchBox";
import "./header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';

const Header = () => {
  const {cart, setOpen} = useAppStore();

  return (
    <header>
      <Container>
        <div className="content">
          <h2><Link to="/">Aon Store</Link></h2>
          
          <li>
            <Link to="/women">Women</Link>
          </li>
          
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/kids">Kids</Link>
          </li>
      
          <SearchBox/>
          <button className="cart-btn" onClick={()=> setOpen(true)}>
            {cart?.length !== 0 &&<div className="label">{cart?.length}</div>}
            <AiOutlineShoppingCart />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
