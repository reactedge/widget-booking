import { useState } from "react";
import {DISTANCE_OPTIONS} from "../Types.ts";

interface SearchFormProps {
    onSearch: (postcode: string, distanceMiles: number) => void;
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
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                alignItems: "center"
            }}
        >
            {/* Postcode input */}
            <input
                type="text"
                placeholder="Enter postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
                style={{
                    padding: "8px",
                    fontSize: "14px",
                    width: "140px"
                }}
            />

            {/* Distance select */}
            <select
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                style={{
                    padding: "8px",
                    fontSize: "14px"
                }}
            >
                {DISTANCE_OPTIONS.map(option => (
                    <option key={option.miles} value={option.miles}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Submit button */}
            <button
                type="submit"
                style={{
                    padding: "8px 14px",
                    fontSize: "14px",
                    cursor: "pointer"
                }}
            >
                Search
            </button>
        </form>
    );
}
