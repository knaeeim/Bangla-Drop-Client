import React from "react";
import ReviewCarousel from "./ReviewCarousel";

const Reviews = () => {
    const dummyReviews = [
        { name: "Alice", message: "Great delivery service! Super fast." },
        { name: "Bob", message: "Loved the tracking features and support. Loved the tracking features and support." },
        { name: "Charlie", message: "Affordable and very reliable." },
        { name: "Dana", message: "Customer care was very helpful!" },
        { name: "Sulokkhona Chandra", message: "Delivery is so Fast!!" },
    ];

    return (
        <div>
            <div>
                {/* Other sections */}
                <section data-aos="fade-up" className="bg-gray-100 py-10 rounded-2xl md:px-10 px-3">
                    <h2 className="text-center text-3xl font-bold mb-6">
                        What Our Customers Say
                    </h2>
                    <ReviewCarousel reviews={dummyReviews} />
                </section>
            </div>
        </div>
    );
};

export default Reviews;
