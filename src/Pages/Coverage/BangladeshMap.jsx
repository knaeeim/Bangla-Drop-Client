import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const position = [23.685, 90.3563]; // Center of Bangladesh

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 });
    }
    return null;
}

const BangladeshMap = ({ serviceCenters }) => {
    const [searchText, setSearchText] = useState("");
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();

        const district = serviceCenters.find((d) =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );

        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center my-10 max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="input w-full"></input>
                    <button className="btn btn-primary text-black">Search</button>
                </form>
            </div>
            <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg relative">
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-full w-full z-0">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <FlyToDistrict coords={activeCoords} />

                    {serviceCenters.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                            icon={customIcon}>
                            <Popup
                                autoOpen={center.district === activeDistrict}>
                                <strong>{center.district}</strong>
                                <br />
                                {center.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default BangladeshMap;
