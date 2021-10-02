import React, { useEffect, useState } from "react";
// Import prime components

import { Chart } from "primereact/chart";

export const PokemonStats = (props) => {
    /*
    Variables
    */
    const [chartData, setChartData] = useState([]);

    /* 
    Init
    */
    useEffect(() => {
        fillStatsChartData();
    }, []);

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#495057",
                },
            },
        },
        scales: {
            r: {
                pointLabels: {
                    color: "#495057",
                },
                grid: {
                    color: "#ebedef",
                },
                angleLines: {
                    color: "#ebedef",
                },
                min: 0,
                max: 100,
            },
        },
    };

    /*
    Methods
    */
    const fillStatsChartData = async () => {
        if (props.pokemon && props.pokemon.stats) {
            let _lstLabels = [];
            let _lstDatasets = [];
            _lstDatasets.push({
                label: props.pokemon.name + " stats",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                data: [],
            });
            await props.pokemon.stats.map((statX) => {
                _lstLabels.push(statX.stat.name);
                _lstDatasets[0].data.push(statX.base_stat);
            });
            setChartData({
                labels: _lstLabels,
                datasets: _lstDatasets,
            });
        }
    };

    /*
    Inner Components
     */

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            {props.pokemon && props.pokemon.stats ? (
                <div className="card p-d-flex p-jc-center">
                    <Chart type="radar" data={chartData} options={lightOptions} style={{ position: "relative", width: "70%" }} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
