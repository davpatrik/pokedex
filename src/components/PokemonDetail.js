import React, { useState, useEffect, useRef } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { ProgressBar } from "primereact/progressbar";

// Import Services
import PokemonDataService from "../service/PokemonDataService";
import { PokemonTypes } from "./PokemonTypes";
import { PokemonMoves } from "./PokemonMoves";
import { PokemonStats } from "./PokemonStats";
import { PokemonAbilities } from "./PokemonAbilities";
import { PokemonEvolution } from "./PokemonEvolution";
import { PokemonEvolutionClass } from "./PokemonEvolution";

export const PokemonDetail = (props) => {
    /*
    Variables
    */
    const [pokemonEvolution, setPokemonEvolution] = useState(null);
    const [pokemonSpecie, setPokemonSpecie] = useState(null);

    const [lstEvolutionNames, setLstEvolutionNames] = useState([]);

    /* 
    Init
    */
    useEffect(() => {
        queryPokemonSpeciesThenEvolution();
        //queryPokemonEvolution();
    }, []);

    /*
    Methods
    */
    const queryPokemonSpeciesThenEvolution = () => {
        PokemonDataService.queryPokemonSpecies(props.pokemon.id).then((response) => {
            //console.log("Species: ", response);
            setPokemonSpecie(response);
            queryPokemonEvolution(response.evolution_chain.url);
        });
    };

    const queryPokemonEvolution = (url) => {
        PokemonDataService.queryByUrl(url).then((response) => {
            //console.log("Evolution: ", response);
            setPokemonEvolution(response);
            //extractEvolutionNames(response.chain);
        });
    };

    const extractEvolutionNames = async (evolution) => {
        if (evolution.species) {
            let _lstEvolutionNames = lstEvolutionNames;
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
    const bioComp = pokemonSpecie && pokemonSpecie.flavor_text_entries.length > 0 ? <p>{pokemonSpecie.flavor_text_entries.filter((val) => val.language.name === "en")[0].flavor_text}</p> : <div />;

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            <Dialog header={props.pokemon.name} visible={props && props.pokemon} onHide={() => props.hideDetail()} style={{ width: "90vw" }} modal={true}>
                <div className="p-col-12 p-lg-12">
                    <div className="p-grid">
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <img src={props.pokemon ? props.pokemon.sprites.other.dream_world.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="150" />
                                {<PokemonTypes pokemon={props.pokemon} />}
                            </Panel>
                        </div>
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <h4>BIO</h4>
                                {bioComp}
                            </Panel>
                        </div>
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <h4>Stats</h4>
                                {<PokemonStats pokemon={props.pokemon} />}
                            </Panel>
                        </div>
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <h4>Abilities</h4>
                                {<PokemonAbilities pokemon={props.pokemon} />}
                            </Panel>
                        </div>
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <h4>Moves</h4>
                                {<PokemonMoves pokemon={props.pokemon} />}
                            </Panel>
                        </div>
                        <div className="p-col-12 p-md-4">
                            <Panel>
                                <h4>Evolution</h4>
                                {pokemonEvolution && pokemonEvolution.chain ? <PokemonEvolutionClass evolution={pokemonEvolution.chain} pokemonMap={props.pokemonMap} handleSelectPokemon={(name) => props.handleSelectPokemon(name)} /> : "vacioDetail"}
                            </Panel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
