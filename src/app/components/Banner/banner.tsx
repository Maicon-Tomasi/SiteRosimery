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
        // autoplay: true,
        // autoplaySpeed: 1000,
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
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
            </Slider>

    )
}

export default Banner;
