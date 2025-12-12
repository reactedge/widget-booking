import type {Center, Store, StoreWithDistance} from "./Types.ts";
import {StoreMap} from "./StoreListing/Map.tsx";
import {StoreSearchForm} from "./StoreListing/StoreSearch.tsx";
import React, {useState} from "react";
import {MapSearch} from "../Model/MapSearch.ts";
import {StoreResultsCards} from "./StoreListing/StoreResultsCards.tsx";

const stores: Store[] = [
    { name: "London Central", lat: 51.5074, lng: -0.1278, hours: "Mon–Sat: 9am–6pm" },
    { name: "Manchester Hub", lat: 53.4808, lng: -2.2426, hours: "Mon–Fri: 10am–5pm" },
    { name: "Bournemouth Branch", lat: 50.7192, lng: -1.8808, hours: "Tue–Sat: 9am–5:30pm" },
    { name: "Birmingham City", lat: 52.4862, lng: -1.8904, hours: "Mon–Sat: 9am–6pm" },
    { name: "Liverpool Store", lat: 53.4084, lng: -2.9916, hours: "Mon–Sat: 9am–6pm" },
    { name: "Leeds Retail Park", lat: 53.8008, lng: -1.5491, hours: "Mon–Sun: 10am–4pm" },
    { name: "Glasgow Central", lat: 55.8642, lng: -4.2518, hours: "Mon–Fri: 9am–6pm" },
    { name: "Edinburgh Princes St", lat: 55.9533, lng: -3.1883, hours: "Mon–Sat: 9am–6pm" },
    { name: "Aberdeen Harbour", lat: 57.1497, lng: -2.0943, hours: "Mon–Fri: 10am–5pm" },
    { name: "Cardiff Bay", lat: 51.4816, lng: -3.1791, hours: "Mon–Sun: 10am–4pm" },
    { name: "Swansea Marina", lat: 51.6214, lng: -3.9436, hours: "Mon–Sat: 9am–6pm" },
    { name: "Newport Station", lat: 51.5877, lng: -2.9984, hours: "Mon–Fri: 10am–5pm" },
    { name: "Belfast City Centre", lat: 54.5973, lng: -5.9301, hours: "Mon–Sat: 9am–6pm" },
    { name: "Derry Riverside", lat: 55.0068, lng: -7.3183, hours: "Tue–Sat: 10am–5pm" },
    { name: "York Centre", lat: 53.9590, lng: -1.0815, hours: "Mon–Fri: 9am–6pm" },
    { name: "Sheffield Meadowhall", lat: 53.3811, lng: -1.4701, hours: "Mon–Sat: 9am–6pm" },
    { name: "Nottingham Market Square", lat: 52.9548, lng: -1.1581, hours: "Mon–Sun: 10am–4pm" },
    { name: "Southampton Docks", lat: 50.9097, lng: -1.4044, hours: "Mon–Fri: 10am–5pm" },
    { name: "Portsmouth Harbour", lat: 50.8198, lng: -1.0880, hours: "Mon–Sat: 9am–6pm" },
    { name: "Cambridge Riverside", lat: 52.2053, lng: 0.1218, hours: "Mon–Sun: 10am–4pm" }
];

const center: Center = {
    lat: 52.3555,
    lng: -1.1743
};

export const StoreFinder = () => {
    const mapSearch = React.useMemo(() => new MapSearch(), []);
    const [listedStores, setListedStores] = useState<Store[]>(stores);
    const [currentCenter, setCurrentCenter] = useState<Center>(center);

    const handleSearch = async (postcode: string, distanceMiles: number) => {
        const userLocation = await mapSearch.geocodePostcode(postcode);

        if (!userLocation) {
            alert("Postcode not found");
            return;
        }

        const maxDistanceKm = distanceMiles * 1.60934;

        const filteredStores: StoreWithDistance[] = stores
            .map(store => {
                const distanceKm = mapSearch.calculateDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    store.lat,
                    store.lng
                );
                return { ...store, distanceKm };
            })
            .filter(store => store.distanceKm <= maxDistanceKm)
            .sort((a, b) => a.distanceKm - b.distanceKm);

        setListedStores(filteredStores)
        setCurrentCenter(userLocation)
    }

    return (
        <>
            <StoreSearchForm onSearch={handleSearch} />
            <StoreMap stores={listedStores} currentCenter={currentCenter} />
            <StoreResultsCards stores={listedStores} />
        </>
    );
};
