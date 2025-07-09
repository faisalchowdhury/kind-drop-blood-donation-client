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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <section className="my-20">
      <div className="grid grid-cols-7 items-center">
        <div className="col-span-2 space-y-3">
          <h2 className="text-primary text-4xl font-semibold">One Mission.</h2>
          <p>
            We connect donors and recipients, making blood donation simple and
            accessible, saving lives through kindness, community support, and
            technology-driven care.
          </p>
          <button className="btn rounded-full border-accent border-1 font-medium hover:bg-primary hover:text-white hover:border-primary">
            Donation Requests
          </button>
        </div>
        <div className="col-span-5 ">
          <div className="slider-container">
            <Slider {...settings}>
              <div className="px-2 space-y-3">
                <LazyLoadImage
                  src="https://i.ibb.co/35DbMKR2/phlebotomist-8892-square310x310.jpg"
                  effect="blur"
                  placeholderSrc=""
                  className="rounded-lg h-[300px] object-cover"
                  width={"100%"}
                />
                <h3 className="text-xl text-slate-700"> Join The Mission</h3>
              </div>
              <div className="px-2 space-y-3">
                <LazyLoadImage
                  src="https://i.ibb.co/60Psfcsd/pexels-rdne-6646778.jpg"
                  effect="blur"
                  placeholderSrc=""
                  className="rounded-lg h-[300px] object-cover"
                  width={"100%"}
                />
                <h3 className="text-xl text-slate-700">Save Lives Together</h3>
              </div>
              <div className="px-2 space-y-3">
                <LazyLoadImage
                  src="https://i.ibb.co/CKr7xrS7/pexels-francis-agyemang-opoku-89810425-10794860.jpg"
                  effect="blur"
                  placeholderSrc=""
                  className="rounded-lg h-[300px] object-cover"
                  width={"100%"}
                />
                <h3 className="text-xl text-slate-700">Connect With Donors</h3>
              </div>
              <div className="px-2 space-y-3">
                <LazyLoadImage
                  src="https://i.ibb.co/dwvY07WF/pexels-lazymonkey-1164531.jpg"
                  effect="blur"
                  placeholderSrc=""
                  className="rounded-lg h-[300px] object-cover"
                  width={"100%"}
                />
                <h3 className="text-xl text-slate-700">Support Every Drop</h3>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
