import React, { useEffect, useState, useContext } from "react";

// Import prime components
import { Chart } from "primereact/chart";

// Import service
import PokemonDataService from "../service/PokemonDataService";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const PokemonStats = (props) => {
    /*
    Variables
    */
    const [lstStats, setLstStats] = useState([]);
    const [chartData, setChartData] = useState([]);

    /* 
    Init
    */
    useEffect(async () => {
        await queryPokemonStats();
        //await fillStatsChartData();
    }, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Methods
    */
    const queryPokemonStats = async () => {
        if (props.pokemon && props.pokemon.stats) {
            let _lstStats = [];
            await props.pokemon.stats.map((statX) => {
                PokemonDataService.queryByUrl(statX.stat.url).then((response) => {
                    _lstStats.push(response);
                });
            });
            setLstStats(_lstStats);
            fillStatsChartData(_lstStats);
            //console.log("_lstStats", _lstStats);
        }
    };

    const fillStatsChartData = async (_lstStats) => {
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
            props.pokemon.stats.map((statX) => {
                let filteredStat = _lstStats.filter((statZ) => statZ.name === statX.stat.name)[0];
                let filteredNameJson = !filteredStat ? null : filteredStat.names.filter((nameX) => nameX.language.name === context.selLanguage)[0];
                //_lstLabels.push(statX.stat.name);
                _lstLabels.push(filteredNameJson ? filteredNameJson.name : statX.stat.name);
                _lstDatasets[0].data.push(statX.base_stat);
            });
            setChartData({
                labels: _lstLabels,
                datasets: _lstDatasets,
            });
        }
    };

    /*
    Options
    */
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

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            {props.pokemon && props.pokemon.stats ? (
                <div className="card p-d-flex p-jc-center">
                    <Chart type="radar" data={chartData} options={lightOptions} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
