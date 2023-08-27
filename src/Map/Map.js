import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Map.css";

const Map = () => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB0pclggmDHDuKDKs4-2N5_eFUYGxAt7KA",
        mapIds: ["bee90f6129aa635c"]
    });

    const center = useMemo(() => ({ lat: 37.363577, lng: -120.424730 }), []);

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading map...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={16}
                    options={{ mapId: "bee90f6129aa635c" }}
                >
                    <Marker position={{ lat: 37.363577, lng: -120.424730 }} />
                    <Marker position={{ lat: 37.364577, lng: -120.424730 }} />

                </GoogleMap>
            )}
        </div>
    );
}

export default Map;