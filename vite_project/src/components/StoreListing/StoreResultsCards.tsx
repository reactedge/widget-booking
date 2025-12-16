import type {StoreWithDistance} from "../../domain/store.types.ts";

interface StoreResultsCardsProps {
    readonly stores: readonly StoreWithDistance[];
}

export function StoreResultsCards({ stores }: StoreResultsCardsProps) {
    if (stores.length === 0) {
        return (
            <p className="storeResults__empty">
                No stores found within the selected distance.
            </p>
        );
    }

    return (
        <div className="storeResults">
            {stores.map(store => (
                <div
                    key={`${store.lat},${store.lng}`}
                    className="storeCard"
                >
                    <div className="storeCard__header">
                        <h4 className="storeCard__title">{store.name}</h4>
                    </div>

                    <div className="storeCard__body">
                        <p className="storeCard__line">{store.hours}</p>
                        {typeof store.distanceKm === "number" && Number.isFinite(store.distanceKm) && (
                            <p className="storeCard__distance">
                                Distance: {store.distanceKm.toFixed(1)} miles
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
