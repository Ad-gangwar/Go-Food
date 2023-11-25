import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Card from '../Card';
require('dotenv').config();
const url=process.env.BASE_URL;

export default function Home() {
  const [category, setCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setsearch] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch(`${url}/api/displayData`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.json();
      setFoodItem(data[0]);
      setCategory(data[1]);

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" style={{ maxHeight: "68vh", objectFit: "contain", position: "relative" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              style={{
                maxWidth: "80%",
                position: "absolute",
                top: "15%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "10",
              }}
            />
            <div className="carousel-item active">
              <img
                src="https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202307/ezgif-sixteen_nine_346.jpg?size=948:533"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.spicypunch.com/wp-content/uploads/2020/08/veg-noodles-recipe-1.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(40%)" }}
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className="container">
        {category.length !== 0 ? (
          category.map((data, index) => {
            return (<div className='row m-3'>
              <div key={index} className='fs-3'>{data.CategoryName}</div>
              <hr />
              {
                foodItem.length !== 0 ? (
                  foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                  ).map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col col-12 col-md-6 col-lg-3'>
                        <Card foodInfo={filterItems} />
                      </div>
                    )
                  })
                ) : " "
              }
            </div>
            )
          })
        ) : " "}
      </div>
      <Footer />
    </div>
  );
}
