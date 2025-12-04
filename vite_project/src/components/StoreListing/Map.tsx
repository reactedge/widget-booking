import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import React, {useState} from "react";
import type {Center, Store} from "../Types.ts";

const containerStyle = {
    width: '100%',
    height: '400px'
};

interface StoreMapProps {
    stores: Store[]
    currentCenter: Center
}

export const StoreMap: React.FC<StoreMapProps> = ({stores, currentCenter}: StoreMapProps) => {
    const [selected, setSelected] = useState<Store | null>(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <div style={mapWrapperStyle}>
                <div style={titleStyle}>
                    {stores.length} store{stores.length !== 1 ? "s" : ""} found
                </div>
                <GoogleMap key={stores.length}
                           mapContainerStyle={containerStyle}
                           center={currentCenter}
                           zoom={6}>
                    {stores.map((store, index) => (
                        <Marker
                            key={index}
                            position={{lat: store.lat, lng: store.lng}}
                            onClick={() => setSelected(store)}
                        />
                    ))}

                    {selected && (
                        <InfoWindow
                            position={{lat: selected.lat, lng: selected.lng}}
                            onCloseClick={() => setSelected(null)}
                        >
                            <div>
                                <h4>{selected.name}</h4>
                                <p>{selected.hours}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
)};

const mapWrapperStyle: React.CSSProperties = {
    position: "relative"
};

const titleStyle: React.CSSProperties = {
    position: "absolute",
    top: "100px",
    left: "12px",
    background: "white",
    padding: "6px 12px",
    borderRadius: "2px",
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--sf-color-text)",
    boxShadow: "var(--sf-shadow-card)",
    zIndex: 5,
    pointerEvents: "none"
};