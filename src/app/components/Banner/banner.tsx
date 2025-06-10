'use client'

import React from "react";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";

export default function Banner(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <Slider {...settings}>
            <div className="max-h-[500px]">
                <img src="/imagensSite/gravidez-img.jpg" alt="" />
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
