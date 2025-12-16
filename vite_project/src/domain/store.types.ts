export interface Store {
    name: string,
    lat: number,
    lng: number,
    hours: string
}

export type StoreWithDistance = Store & { distanceKm: number | null };

export interface Center {
    lat: number,
    lng: number,
}

export type DistanceOption = {
    label: string;
    miles: number;
};

export const DISTANCE_OPTIONS: DistanceOption[] = [
    { label: "10 miles", miles: 10 },
    { label: "30 miles", miles: 30 },
    { label: "100 miles", miles: 100 },
    { label: "300 miles", miles: 300 }
];