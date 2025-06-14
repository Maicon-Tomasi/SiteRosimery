'use client'

import React, { FC } from "react";
import Slider from "react-slick";

const Banner: FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
             <div className="max-h-[800px] relative">
                <img src="/imagensSite/banner/banner1.jpg" alt="" className="w-full h-auto" />
                <button
                    className="absolute 2xl:bottom-58 left-83 px-6 py-2 bg-transparent text-[#d49f43] rounded-4xl border-2 border-[#d49f43] shadow-lg cursor-pointer hover:bg-[#d49f43] hover:text-white transition-colors duration-300"
                >
                    Saiba Mais
                </button>
            </div>
            <div>
                <img src="/imagensSite/banner/banner2.jpg" alt="" className="w-full h-auto" />
            </div>
            </Slider>

    )
}

export default Banner;
