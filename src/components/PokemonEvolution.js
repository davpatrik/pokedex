import React, { useEffect, useState } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Slider } from "primereact/slider";

// Import Services
import PokemonDataService from "../service/PokemonDataService";
import { Card } from "primereact/card";

export const PokemonEvolution = (props) => {
    /*
    Variables
    */
    const [lstEvolutionNames, setLstEvolutionNames] = useState([]);

    /* 
    Init
    */
    useEffect(() => {
        loadEvolutionData();
        props.pokemonMap.set("xx", "XxX");
        console.log("mapP2: ", props.pokemonMap);
    }, [lstEvolutionNames, props.evolution]);

    /*
    Methods
    */
    const loadEvolutionData = async () => {
        await extractEvolutionNames(props.evolution);
    };

    const extractEvolutionNames = async (evolution) => {
        if (evolution.species) {
            let _lstEvolutionNames = lstEvolutionNames;
            console.log("pushed", evolution.species.name);
            _lstEvolutionNames.push(evolution.species.name);
            setLstEvolutionNames(_lstEvolutionNames);
            if (evolution.evolves_to) {
                evolution.evolves_to.map((evoX) => {
                    extractEvolutionNames(evoX);
                });
            }
        }
    };

    /*
    Inner Components
     */
    const evoCart =
        props.evolution && props.evolution.species && lstEvolutionNames.length > 0
            ? lstEvolutionNames.map((nameX, key) => {
                  return (
                      <div className="p-col-12 p-lg-5" key={key}>
                          <div className="p-grid">{evoComp(nameX)}</div>
                      </div>
                  );
              })
            : "vacio";

    const evoComp = (name) => {
        let pokemonX = props.pokemonMap.get(name);
        console.log("pokemonX", pokemonX);
        if (pokemonX) {
            return (
                <Card>
                    <img src={pokemonX && pokemonX.sprites ? pokemonX.sprites.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="70" />
                    <p>{pokemonX.name}</p>
                    <Button title={pokemonX.name} onClick={() => props.handleSelectPokemon(pokemonX.name)} icon="pi pi-search" className="p-button-rounded p-button-success mr-2" title={"Discover " + pokemonX.name} />
                </Card>
            );
        } else {
            return <></>;
        }
    };

    /**
     * Return
     */
    return (
        <div>
            {props.evolution && props.evolution.species && lstEvolutionNames.length > 0
                ? lstEvolutionNames.map((nameX, key) => {
                      return (
                          <div className="p-col-12 p-lg-5" key={key}>
                              <div className="p-grid">{evoComp(nameX)}</div>
                          </div>
                      );
                  })
                : "vacio"}
        </div>
    );
};
