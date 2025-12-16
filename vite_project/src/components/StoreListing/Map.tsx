import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import type {Center, Store} from "../../domain/store.types.ts";

interface StoreMapProps {
    readonly stores: readonly Store[];
    readonly currentCenter: Center;
}

export function StoreMap({ stores, currentCenter }: StoreMapProps) {
    const [selected, setSelected] = useState<Store | null>(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <div className="storeMap">
                <div className="storeMap__title">
                    {stores.length} store{stores.length !== 1 ? "s" : ""} found
                </div>

                <GoogleMap
                    key={stores.length}
                    mapContainerStyle={{ width: "100%", height: "400px" }}
                    center={currentCenter}
                    zoom={6}
                >
                    {stores.map(store => (
                        <Marker
                            key={`${store.lat},${store.lng}`}
                            position={{ lat: store.lat, lng: store.lng }}
                            onClick={() => setSelected(store)}
                        />
                    ))}

                    {selected && (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
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
    );
}
