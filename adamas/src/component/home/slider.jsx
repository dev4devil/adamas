import React from "react";
import Slider1 from "react-slick";
import image from "../../images/slider-content-img.jpg";

function Slider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const slideImages = [
    {
      url: image,
      h1: "RINGS ON SALE",
      p: "Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce at justo eget lorem port titor tincidunt.",
      a: "Visit Store",
    },
    {
      url: image,
      h1: "RINGS ON SALE",
      p: "Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce at justo eget lorem port titor tincidunt.",
      a: "Visit Store",
    },
    {
      url: image,
      h1: "RINGS ON SALE",
      p: "Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce at justo eget lorem port titor tincidunt.",
      a: "Visit Store",
    },
  ];
  return (
    <section className="slider-section">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center single-item-rtl ">
          <Slider1 {...settings}>
            {slideImages.map((slideImage, index) => (
              <div className="d-flex" key={index}>
                <div className="carousel-img col-md-6 d-flex justify-content-center align-items-center">
                  <img
                    src={slideImage.url}
                    className="d-block w-100"
                    alt="ring"
                  />
                </div>
                <div className="carousel-text col-md-6 d-flex flex-column justify-content-center align-items-center">
                  <h1>{slideImage.h1}</h1>
                  <p className="text-center">{slideImage.p}</p>
                  <a href="/">{slideImage.a}</a>
                </div>
              </div>
            ))}
          </Slider1>
        </div>
      </div>
    </section>
  );
}

export default Slider;
