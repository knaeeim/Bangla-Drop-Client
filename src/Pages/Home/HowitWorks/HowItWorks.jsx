import React from "react";
import { FiBox } from "react-icons/fi"; // Feather Icons
import { MdDeliveryDining } from "react-icons/md"; // Material Design
import { FaWarehouse } from "react-icons/fa"; // Font Awesome
import { HiOfficeBuilding } from "react-icons/hi"; // Heroicons

const howItWorksData = [
    {
        title: "Booking Pick & Drop",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: <FiBox className="text-5xl text-primary" />,
    },
    {
        title: "Cash On Delivery",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: <MdDeliveryDining className="text-5xl text-primary" />,
    },
    {
        title: "Delivery Hub",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: <FaWarehouse className="text-5xl text-primary" />,
    },
    {
        title: "Booking SME & Corporate",
        description:
            "From personal packages to business shipments — we deliver on time, every time.",
        icon: <HiOfficeBuilding className="text-5xl text-primary" />,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-10 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
                How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {howItWorksData.map((item, idx) => (
                    <div
                        data-aos="fade-up"
                        key={idx}
                        className="flex items-start gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="space-y-5">
                            <div>{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-1">
                                {item.title}
                            </h3>
                            <p className="text-base-content/70">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
