import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./Map.css";

const Map = ({ mlat, mlng }) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB0pclggmDHDuKDKs4-2N5_eFUYGxAt7KA",
        mapIds: ["bee90f6129aa635c"]
    });

    const [lat, setLat] = useState(37.363577);
    const [lng, setLng] = useState(-120.424730);



    function success(position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                console.log("Geolocation not supported");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                    <MarkerF position={{ lat: mlat, lng: mlng }} label={"CatCard Office"} />
                    <MarkerF position={{ lat: lat, lng: lng }} icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} />
                </GoogleMap>
            )}
        </div>
    );
}

export default Map;