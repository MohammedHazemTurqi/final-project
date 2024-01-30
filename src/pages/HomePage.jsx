import { useEffect, useState } from "react";
import "./HomePage.css";
import Banner from "../Components/Banner/banner";
import Header from "../Components/Header/header";
import Container from "../Components/Container/container";
import ItemCard from "../Components/ItemCard/itemCard";
import Space from "../Components/Space";
import { useAppStore } from "../store";
import Sheet from "react-modal-sheet";
import Footer from "../Components/Footer/footer";
import {  Link,useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("aonToken");
  };

    
  const [products, setProducts] = useState([]);

  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { searchKey, isOpen, setOpen, cart } = useAppStore();

  const getProducts = async () => { 
    setIsLoading(true);
    try {
      let resp = await fetch(
        `https://dummyjson.com/products/search?q=${searchKey}&limit=4&skip=${skip}`
      );
      let data = await resp.json();
      if (searchKey === "") {
        setProducts([...products, ...data.products]);
      } else {
        setProducts(data.products);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchKey, skip]);

  const handleLoadMore = () => {
    setSkip(skip +4);
  };
 
  const getTotalPrice = () => {
    return cart
      .map((el) => el.product.price * el.qt)
      .reduce((a, b) => a + b, 0);
  };

  return (
    <div>
      <Header />
    
      <Container>
     
        <Space height={24} />
        <Banner image={"https://picsum.photos/800/200"} />
        <Space height={24} />
        <h3 >Products List</h3>
        <div className="products-grid">
          {products.map((el) => (
            <ItemCard item={el} />
          ))}
        </div>
        <button className="load-more" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
        {/* /////////////// */}
        <h3><Link to="/men">men List</Link></h3>
        <div className="products-grid">
          {products.map((el) => (
            <ItemCard item={el} />
          ))}
        </div>
        <button className="load-more" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
          {/* /////////////// */}
          <h3><Link to="/women">Women List</Link></h3>
        <div className="products-grid">
          {products.map((el) => (
            <ItemCard item={el} />
          ))}
        </div>
        <button className="load-more" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
        {/* /////////////// */}
        <h3><Link to="/kids">kids List</Link></h3>
        <div className="products-grid">
          {products.map((el) => (
            <ItemCard item={el} />
          ))}
        </div>
        <button className="load-more" onClick={handleLoadMore}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
       

      </Container>
   
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div>
              <Container>
                <h2>Cart List</h2>
                <br />
                <div className="products-grid">
                  {cart.map((el) => (
                    <ItemCard item={el.product} />
                  ))}
                </div>
              </Container>

              <div className="cart-action">
                <Container>
                  <button>
                    Checkout - {Number(getTotalPrice()).toLocaleString("en")} $
                  </button>
                </Container>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      <div className="home-screen">
 
      <button onClick={handleLogout}>Logout</button>
    </div>

<Footer/>
    </div>
    

  );
}

export default HomePage;
