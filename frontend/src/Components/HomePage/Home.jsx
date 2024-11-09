import React, { useEffect } from "react";
import "./Home.css";
import MultiitemCarousal from "./MultiitemCarousal";
import { RestaurantCard } from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { get_all_restaurants } from "../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";

export const Home = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { restaurant } = useSelector((store) => store);
    
    useEffect(() => {
        dispatch(get_all_restaurants(token));
    }, []);

    return (
        <div className="pb-10">
            {/* Banner Section with Fading Effect */}
            <section className="banner relative flex flex-col justify-center items-center fade-in">
                <div className="w-[50vw] text-center z-10 text-white banner-text fade-in">
                    <p className="text-2xl lg:text-6xl font-bold py-5">Zosh Food</p>
                    <p className="text-gray-300 text-xl lg:text-4xl">Taste the Convenience</p>
                </div>
                <div className="cover absolute top-0 left-0 right-0 fade-in"></div>
                <div className="fadout fade-overlay"></div>
            </section>

            {/* Top Meals Carousel Section with Slide-Up Effect */}
            <section className="p-10 lg:py-10 lg:px-20 fade-in-up">
                <p className="text-2xl font-semibold text-gray-400 py-3 pb-10 px-5">Top Meals</p>
                <MultiitemCarousal />
            </section>

            {/* Our Handpicked Favourites Section with Fade-In for Cards */}
            <section className="px-5 lg:px-20 pt-10">
                <h1 className="text-2xl font-semibold text-gray-400 pb-5 px-5 fade-in-up">Our Handpicked Favourites</h1>
                <div className="flex flex-wrap items-center justify-around gap-4 fade-in-up">
                    {restaurant.restarants.map((item) => (
                        <RestaurantCard item={item} key={item.id} />
                    ))}
                </div>
            </section>
        </div>
    );
};
