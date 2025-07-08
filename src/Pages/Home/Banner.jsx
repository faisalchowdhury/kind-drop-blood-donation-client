import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="relative bg-[url('https://i.ibb.co/Rk8xkKWd/pexels-kirill-dratsevich-237907001-12227661-1.jpg')] bg-cover h-[500px] rounded-2xl overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-full max-w-[50%] px-10">
          <div className="space-y-3">
            <p className="text-white">
              Join us in building a healthier tomorrow by giving the gift of
              life today.
            </p>
            <h1 className="text-white text-4xl   ">
              Your Blood Can Give Others a Tomorrow.
            </h1>

            <div className="space-x-3">
              <button className="btn bg-accent hover:bg-primary duration-500 text-white border-none rounded">
                Join as a donor
              </button>
              <button className="btn bg-primary hover:bg-accent duration-500 text-white border-none rounded ">
                Join as a donor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
