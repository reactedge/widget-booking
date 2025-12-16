import type { Center, StoreWithDistance } from "./store.types";
import type { StoreDataset } from "./store.dataset";
import { MapSearch } from "../Model/MapSearch";

export interface StoreSearchResult {
    readonly stores: readonly StoreWithDistance[];
    readonly center: Center;
}

export class StoreSearchService {
    private readonly dataset: StoreDataset;
    private readonly mapSearch: MapSearch;

    constructor(dataset: StoreDataset, mapSearch: MapSearch) {
        this.dataset = dataset;
        this.mapSearch = mapSearch;
    }

    async search(
        postcode: string,
        distanceMiles: number
    ): Promise<StoreSearchResult | null> {

        const userLocation = await this.mapSearch.geocodePostcode(postcode);
        if (!userLocation) return null;

        const maxDistanceKm = distanceMiles * 1.60934;

        const stores: StoreWithDistance[] = this.dataset.stores
            .map(store => ({
                ...store,
                distanceKm: this.mapSearch.calculateDistanceKm(
                    userLocation.lat,
                    userLocation.lng,
                    store.lat,
                    store.lng
                )
            }))
            .filter(store => store.distanceKm <= maxDistanceKm)
            .sort((a, b) => a.distanceKm - b.distanceKm);

        return {
            stores,
            center: userLocation
        };
    }
}
