import React from "react";
import type { Store } from "../Types";

interface Props {
    stores: (Store & { distanceKm?: number })[];
}

export const StoreResultsCards: React.FC<Props> = ({ stores }) => {
    if (stores.length === 0) {
        return <p style={{ marginTop: "20px" }}>No stores found within the selected distance.</p>;
    }

    return (
        <div style={wrapperStyle}>
            {stores.map((store, index) => (
                <div key={index} style={cardStyle}>
                    <div style={headerStyle}>
                        <h4 style={titleStyle}>{store.name}</h4>
                    </div>

                    <div style={bodyStyle}>
                        <p style={lineStyle}>{store.hours}</p>
                        <p style={distanceStyle}>
                            Distance: {store.distanceKm?.toFixed(1)} miles
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const wrapperStyle: React.CSSProperties = {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
};

const cardStyle: React.CSSProperties = {
    border: "1px solid #e1e1e1",
    borderRadius: "6px",
    padding: "16px",
    background: "white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
};

const headerStyle: React.CSSProperties = {
    marginBottom: "8px"
};

const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#222"
};

const bodyStyle: React.CSSProperties = {
    marginBottom: "12px"
};

const lineStyle: React.CSSProperties = {
    margin: "4px 0",
    color: "#555",
    fontSize: "14px"
};

const distanceStyle: React.CSSProperties = {
    margin: "4px 0",
    color: "#0071c2",
    fontSize: "14px",
    fontWeight: 600
};
