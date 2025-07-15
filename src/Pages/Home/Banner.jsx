import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
const Banner = () => {
  return (
    <section className="my-5">
      <div className="relative bg-[url('https://i.ibb.co/Rk8xkKWd/pexels-kirill-dratsevich-237907001-12227661-1.jpg')] bg-cover h-[500px] rounded-2xl overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-950/40 rounded-2xl"></div>

        {/* Content */}
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex items-center h-full max-w-[60%] px-10">
          <div className="space-y-3">
            <p className="text-white">
              Join us in building a healthier tomorrow by giving the gift of
              life today.
            </p>
            <h1 className="text-white text-5xl font-semibold">
              Your <span className="text-accent">blood</span> can give others a
              tomorrow.
            </h1>

            <div className="space-x-3">
              <button className="btn bg-accent hover:bg-primary duration-500 text-white border-none rounded-full">
                Join as a donor
              </button>
              <Link
                to={"/search"}
                className="btn bg-primary hover:bg-accent duration-500 text-white border-none rounded-full">
                Search Donors
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
