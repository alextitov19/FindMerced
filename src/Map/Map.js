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

    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")



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

    function calculateDistance() {
        const dms = <DistanceMatrixService
            options={{
                destinations: [{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }],
                origins: [{ lat: lat, lng: lng }],
                travelMode: "WALKING",
            }}
            callback={(response) => {
                console.log("Got resp");
                console.log(response.rows[0].elements[0].distance.text);
                console.log(response.rows[0].elements[0].duration.text);
                // console.log(response);

            }}
        />
    }

    return (
        <div>
            <div>{distance}</div>
            <div>{duration}</div>
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
                    {props.marker ? <DistanceMatrixService
                        options={{
                            destinations: [{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }],
                            origins: [{ lat: lat, lng: lng }],
                            travelMode: "WALKING",
                        }}
                        callback={(response) => {
                            console.log("Got resp");
                            console.log(response.rows[0].elements[0].distance.text);
                            console.log(response.rows[0].elements[0].duration.text);
                            setDistance(response.rows[0].elements[0].distance.text);
                            setDuration(response.rows[0].elements[0].duration.text);
                            // console.log(response);

                        }}
                    /> : null}

                </GoogleMap>

            )}
        </div>
    );
}

export default Map;