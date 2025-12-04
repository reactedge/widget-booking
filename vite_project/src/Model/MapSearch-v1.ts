import type { Store } from "../components/Types.ts";

export class MapSearchV1 {
    markers: google.maps.marker.AdvancedMarkerElement[] = [];
    map: google.maps.Map | null = null;

    setMapInstance(map: google.maps.Map) {
        this.map = map;
    }

    updateMap(filteredStores: Store[]) {
        if (!this.map) return;

        // Clear old markers
        this.markers.forEach(marker => marker.map = null);

        // Add new markers
        this.markers = filteredStores.map(store =>
            new google.maps.marker.AdvancedMarkerElement({
                map: this.map!,
                position: { lat: store.lat, lng: store.lng },
                title: store.name
            })
        );

        // Fit bounds
        if (filteredStores.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            filteredStores.forEach(s =>
                bounds.extend({ lat: s.lat, lng: s.lng })
            );
            this.map!.fitBounds(bounds);
        }
    }

    calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;

        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    async geocodePostcode(postcode: string): Promise<{ lat: number; lng: number } | null> {
        const geocoder = new google.maps.Geocoder();

        return new Promise((resolve) => {
            geocoder.geocode({ address: postcode }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                    const loc = results[0].geometry.location;
                    resolve({ lat: loc.lat(), lng: loc.lng() });
                } else {
                    resolve(null);
                }
            });
        });
    }
}
