import React, { useEffect, useState } from "react";
// Import prime components
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";

export const Dashboard = (props) => {
    useEffect(() => {}, []);

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            <Card>
                <p style={{ width: "100%" }}>{"Welcome, please visit PAGES -> Pokédex to start discovering Pokémons!"}</p>
            </Card>
        </div>
    );
};
