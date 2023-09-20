import { GoogleMap, MarkerF, useLoadScript, DistanceMatrixService, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./Map.css";

function Map(props) {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB0pclggmDHDuKDKs4-2N5_eFUYGxAt7KA",
        mapIds: ["bee90f6129aa635c"],
    });

    const [lat, setLat] = useState(37.363577);
    const [lng, setLng] = useState(-120.424730);

    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")

    const google = window.google;

    const [directions, setDirections] = useState()


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


    function getDirections() {
        const directionsService = new google.maps.DirectionsService();

        const origin = { lat: lat, lng: lng };
        const destination = { lat: parseFloat(props.lat), lng: parseFloat(props.lng) };
        directionsService.route(
            {
                origin: origin,
                destination: props.destination,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(`Success ${result}`);
                    setDirections(result);

                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }




    return (
        <div>
                <div className="description">
                    <div className="button-85" onClick={getDirections} >
                        <div className="distance">{distance}</div>
                        Get Directions
                        <div className="duration">{duration}</div>

                    </div>
                </div>

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
                    <MarkerF position={{ lat: lat, lng: lng }} icon={"https://maps.gstatic.com/mapfiles/ms2/micons/man.png"} />
                     <DistanceMatrixService
                        options={{
                            destinations: props.destination,
                            origins: [{ lat: lat, lng: lng }],
                            travelMode: "WALKING",
                        }}
                        callback={(response) => {
                            console.log("Got resp");
                            console.log(response.rows[0].elements[0].distance.text);
                            console.log(response.rows[0].elements[0].duration.text);
                            setDistance(response.rows[0].elements[0].distance.text);
                            setDuration(response.rows[0].elements[0].duration.text);
                        }}
                    />
                     <DirectionsRenderer
                        directions={directions}
                    />

                </GoogleMap>

            )}
        </div>
    );
}

export default Map;