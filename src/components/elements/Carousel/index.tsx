"use client"
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselCardProps } from "../interface";
import CarouselCard from "../CarouselCard";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

type CarouselProps = {
    list: CarouselCardProps[]
}


const CarouselSlider: React.FC<CarouselProps> = ({list}) => {
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        className="z-20"
      >
        {list.map((data, index) => {
          return (
            <CarouselCard key={index} carouselData={data}/>
          );
        })}
      </Carousel>
    </div>
  );
};
export default CarouselSlider;
