import {StoreMap} from "./StoreListing/Map.tsx";
import {StoreSearchForm} from "./StoreListing/StoreSearch.tsx";
import React, {useMemo, useState} from "react";
import {MapSearch} from "../Model/MapSearch.ts";
import {StoreResultsCards} from "./StoreListing/StoreResultsCards.tsx";
import {defaultStoreDataset} from "../domain/store.dataset.ts";
import {StoreSearchService} from "../domain/storeSearch.service.ts";
import type {StoreWithDistance} from "../domain/store.types.ts";

export function StoreFinder() {
    const mapSearch = React.useMemo(() => new MapSearch(), []);
    const [listedStores, setListedStores] = useState(defaultStoreDataset.stores);
    const [currentCenter, setCurrentCenter] = useState(defaultStoreDataset.defaultCenter);
    const [error, setError] = useState<string | null>(null);
    const storeSearchService = useMemo(
        () => new StoreSearchService(defaultStoreDataset, mapSearch),
        [mapSearch]
    );

    const handleSearch = async (postcode: string, distanceMiles: number) => {
        const result = await storeSearchService.search(postcode, distanceMiles);

        if (!result) {
            setError("Postcode not found");
            return;
        }

        setListedStores(result.stores);
        setCurrentCenter(result.center);
    }

    if (error) return <>{error}</>

    return (
        <>
            <StoreSearchForm onSearch={handleSearch} />
            <StoreMap stores={listedStores} currentCenter={currentCenter} />
            <StoreResultsCards stores={listedStores as StoreWithDistance[]} />
        </>
    );
};
