import React, { useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaQuoteLeft,
    FaQuoteRight,
} from "react-icons/fa";
import humanIcon from "../../../assets/lotties/human-icon.json";
import Lottie from "lottie-react";

const ReviewCarousel = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const length = reviews.length;

    const prevSlide = () => {
        console.log("Previous Slide", currentIndex);
        setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
    };

    const nextSlide = () => {
        console.log("Next Slide", currentIndex);
        setCurrentIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    };

    const getIndex = (offset) => (currentIndex + offset + length) % length;

    const positions = ["left", "center", "right"];

    return (
        <div className="w-full flex flex-col items-center py-10 relative overflow-hidden">
            <div className="relative w-full max-w-7xl h-60 flex items-center justify-center rounded-2xl">
                {positions.map((pos, idx) => {
                    const cardIndex = getIndex(idx - 1); // -1 for left, 0 center, +1 right
                    const isFocused = idx === 1;

                    return (
                        <div
                            data-aos="fade-up"
                            key={cardIndex}
                            className={`
                                absolute transition-all duration-700 ease-in-out
                                ${
                                    pos === "left"
                                        ? "left-0 scale-90 opacity-70 blur-xs"
                                        : ""
                                }
                                ${
                                    pos === "center"
                                        ? "left-1/2 -translate-x-1/2 scale-100 z-10"
                                        : ""
                                }
                                ${
                                    pos === "right"
                                        ? "right-0 scale-90 opacity-70 blur-xs"
                                        : ""
                                }
                                w-[100%] md:w-[30%]
                            `}
                        >
                            <ReviewCard
                                review={reviews[cardIndex]}
                                focused={isFocused}
                            />
                        </div>
                    );
                })}

                {/* Arrows */}
                <button
                    onClick={() => {
                        console.log("clicked");
                        prevSlide();
                    }}
                    className="btn btn-circle absolute left-2 top-1/2 -translate-y-1/2 z-50"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={() => {
                        console.log("clicked");
                        nextSlide();
                    }}
                    className="btn btn-circle absolute right-2 top-1/2 -translate-y-1/2 z-50"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Dots */}
            <div className="mt-6 flex gap-2">
                {reviews.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            currentIndex === idx ? "bg-blue-500" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

const ReviewCard = ({ review, focused }) => {
    return (
        <div
            className={`relative shadow-xl rounded-xl p-6 text-center md:h-52 transition-all duration-700 bg-primary overflow-hidden ${
                focused ? "ring-2 ring-primary" : " "
            }`}
        >
            <Lottie className="absolute -top-8 md:right-2 right-[65px] transform -translate-x-1/2 w-44" animationData={humanIcon}></Lottie>
            <h3 className="text-lg font-bold mb-2 mt-20">{review.name}</h3>
            <p className="text-black text-lg text-center leading-relaxed">
                <FaQuoteLeft size={15} className="inline align-top mr-1" /> {review.message.split(" ").length > 9 ? review.message.split(" ", 8).join(" ") + "...." : review.message}
                <FaQuoteRight size={15} className="inline align-bottom ml-1" />{" "}
            </p>
        </div>
    );
};

export default ReviewCarousel;
