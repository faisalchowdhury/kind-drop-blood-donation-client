import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../App.css";

const Mission = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,

    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // md
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="my-20 px-4">
      <div className=" mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text section */}
        <div className="md:w-2/6 space-y-4 text-left">
          <h2 className="text-primary text-3xl md:text-4xl font-semibold">
            One Mission.
          </h2>
          <p className="text-slate-600">
            We connect donors and recipients, making blood donation simple and
            accessible, saving lives through kindness, community support, and
            technology-driven care.
          </p>
          <button className="btn rounded-full border-accent border-1 font-medium hover:bg-primary hover:text-white hover:border-primary">
            Donation Requests
          </button>
        </div>

        {/* Slider section */}
        <div className="md:w-4/6 w-full">
          <Slider {...settings}>
            {[
              {
                src: "https://i.ibb.co/R4zLXVBF/pexels-rdne-6646917.jpg",
                title: "Join The Mission",
              },
              {
                src: "https://i.ibb.co/60Psfcsd/pexels-rdne-6646778.jpg",
                title: "Save Lives Together",
              },
              {
                src: "https://i.ibb.co/CKr7xrS7/pexels-francis-agyemang-opoku-89810425-10794860.jpg",
                title: "Connect With Donors",
              },
              {
                src: "https://i.ibb.co/dwvY07WF/pexels-lazymonkey-1164531.jpg",
                title: "Support Every Drop",
              },
            ].map((slide, index) => (
              <div key={index} className="px-2 space-y-3">
                <LazyLoadImage
                  src={slide.src}
                  effect="blur"
                  placeholderSrc=""
                  className="rounded-lg h-[250px] md:h-[300px] w-full object-cover"
                  alt={slide.title}
                />
                <h3 className="text-lg md:text-xl text-slate-700 text-center">
                  {slide.title}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Mission;
