import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import "./Map.css";

const Map = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB0pclggmDHDuKDKs4-2N5_eFUYGxAt7KA",
        mapIds: ["bee90f6129aa635c"]
    });

    const [lat, setLat] = useState(37.363577);
    const [lng, setLng] = useState(-120.424730);


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocation not supported");
    }

    function success(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading map...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: lat, lng: lng }}
                    zoom={16}
                    options={{ mapId: "bee90f6129aa635c" }}
                >
                    <Marker position={{ lat: 37.363577, lng: -120.424730 }} label={"CatCard Office"} />
                    <Marker position={{ lat: 37.364577, lng: -120.424730 }} />

                </GoogleMap>
            )}
        </div>
    );
}

export default Map;