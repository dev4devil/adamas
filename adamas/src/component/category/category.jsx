import React, { useState, useEffect } from "react";
import axios from "axios";
import ring from "../../images/ring.jpg";
import redRing from "../../images/red-ring.jpg";
import barRing from "../../images/sider-bar-ring.jpg";
import { Link, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Slider from "react-slick";
function Category() {
  const { id } = useParams();
  const slideImages = [
    {
      url: barRing,
      h4: "Silver ring With a Diamond",
    },
    {
      url: barRing,
      h4: "Silver ring With a Diamond",
    },
  ];

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const paginate = (num) => setCurrentPage(num);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shared/productsUnderCategory/${id}`)
      .then((res) => {
        setProducts([...res.data.data]);
      })
      .catch((err) => {
        console.log("Error couldn't fetch products");
        console.log(err.message);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shared/productcount/${id}`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log("Error couldn't fetch category");
        console.log(err.message);
      });
  }, [id]);
  useEffect(() => {
    console.log("cat:", products);
  }, [products]);
  const handleSort = (val) => {
    if (val === "latest") {
      const sor = [...products].sort(function (a, b) {
        return a.createdAt > b.createdAt
          ? -1
          : a.createdAt < b.createdAt
          ? 1
          : 0;
      });
      setProducts(sor);
    } else {
      const sor = [...products].sort(function (a, b) {
        return a.createdAt < b.createdAt
          ? -1
          : a.createdAt > b.createdAt
          ? 1
          : 0;
      });
      setProducts(sor);
    }
  };

  return (
    <section className="catagories-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-md-3">
            <div className="top-sidebar-ul">
              <h3>Catagories</h3>
              <ul>
                {categories.map((category, i) => (
                  <li key={i}>
                    <Link to={"/category/" + category._id}>
                      {category.name}{" "}
                      {category.productCount !== 0
                        ? "(" + category.productCount + ")"
                        : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Best Sellers</h4>
              <div className="">
                <Slider>
                  {slideImages.map((slideImage, index) => (
                    <div className="side-slider" key={index}>
                      <img src={slideImage.url} alt="Image Not Found" />
                      <h4>{slideImage.h4}</h4>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="top-sidebar-ul">
              <h4>Price Range</h4>
              <ul>
                <li>
                  <a href="/">$5.0 - $50.0</a>
                </li>
                <li>
                  <a href="/">$50.0 - $100.0</a>
                </li>
                <li>
                  <a href="/">$100.0 - $150.0</a>
                </li>
                <li>
                  <a href="/">$150.0 - $200.0</a>
                </li>
                <li>
                  <a href="/">$200.0 - $300.0</a>
                </li>
              </ul>
            </div>
            <div className="topside-recent">
              <div className="topside-recent-child">
                <div>
                  <img src={ring} alt="" />
                </div>
                <div className="topside-recent-subchild">
                  <ul>
                    <li>
                      <a href="/">
                        <p>Blue Sky Diamond</p>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        {" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/">$2789.0</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="topside-recent-child">
                <div>
                  <img src={redRing} alt="" />
                </div>
                <div className="topside-recent-subchild">
                  <ul>
                    <li>
                      <a href="/">
                        <p>Fiery Red Ring</p>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        {" "}
                        <i className="fa fa-star"></i>{" "}
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>{" "}
                      </a>
                    </li>
                    <li>
                      <a href="/">$2789.0</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-10 col-md-9">
            <div className="container">
              <div className="row bg-white p-3 mb-5">
                <div className="col-md-8"></div>
                <div className="col-md-2">Sort By:</div>
                <div className="col-md-2">
                  <select
                    size="sm"
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="latest">latest</option>
                    <option value="earliest">earliest</option>
                  </select>
                </div>
              </div>
              <ProductList products={currentProducts} />
              <div className="pagination-links">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={products.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
