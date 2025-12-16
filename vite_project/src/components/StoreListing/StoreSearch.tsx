import { useState } from "react";
import { DISTANCE_OPTIONS } from "../../domain/store.types";

interface SearchFormProps {
    readonly onSearch: (postcode: string, distanceMiles: number) => void;
}

export function StoreSearchForm({ onSearch }: SearchFormProps) {
    const [postcode, setPostcode] = useState("");
    const [distance, setDistance] = useState(DISTANCE_OPTIONS[0].miles);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!postcode.trim()) return;
        onSearch(postcode.trim(), distance);
    }

    return (
        <form className="storeSearchForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
                className="storeSearchForm__input"
            />

            <select
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="storeSearchForm__select"
            >
                {DISTANCE_OPTIONS.map(option => (
                    <option key={option.miles} value={option.miles}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button type="submit" className="storeSearchForm__button">
                Search
            </button>
        </form>
    );
}
