import { GoogleMap, MarkerF, useLoadScript, DistanceMatrixService } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./Map.css";

function Map(props) {

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
                    {props.marker}
                    <MarkerF position={{ lat: lat, lng: lng }} icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} />
                    <DistanceMatrixService
                        options={{
                            destinations: [{ lat: 37, lng: -120 }],
                            origins: [{ lat: 37.1, lng: -120 }],
                            travelMode: "WALKING",
                        }}
                        callback={(response) => {
                            console.log("Got resp");
                            console.log(response.rows[0].elements[0].distance.text);
                            console.log(response.rows[0].elements[0].duration.text);

                        }}
                    />
                </GoogleMap>
            )}
        </div>
    );
}

export default Map;