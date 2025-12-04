import type { Store } from "../Types";

interface Props {
    stores: (Store & { distanceKm?: number })[];
}

export const StoreResultsTable: React.FC<Props> = ({ stores }) => {
    if (stores.length === 0) {
        return <p>No stores found within the selected distance.</p>;
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Stores Found ({stores.length})</h3>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                <tr style={{background: "#f4f4f4"}}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Opening Hours</th>
                    <th style={thStyle}>Distance</th>
                </tr>
                </thead>

                <tbody>
                {stores.map((store, index) => (
                    <tr key={index} style={{borderBottom: "1px solid #ddd"}}>
                        <td style={tdStyle}>{store.name}</td>
                        <td style={tdStyle}>{store.hours}</td>
                        <td style={tdStyle}>{store.distanceKm?.toFixed(1)} km</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const thStyle = {
    padding: "10px",
    textAlign: "left" as const,
    borderBottom: "2px solid #ccc"
};

const tdStyle = {
    padding: "10px"
};
