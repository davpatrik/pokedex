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
import { PokemonEvolutionClass } from "./PokemonEvolutionClass";

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
        //console.log("PokemonDetail: ", props.pokemon);
        //console.log(JSON.stringify(props.pokemon));
        //<img src={props.pokemon ? props.pokemon.sprites.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="100" />
        queryPokemonSpecies();
        //queryPokemonEvolution();
    }, [lstEvolutionNames]);

    /*
    Methods
    */
    const queryPokemonSpecies = () => {
        PokemonDataService.queryPokemonSpecies(props.pokemon.id).then((response) => {
            //console.log("Species: ", response);
            setPokemonSpecie(response);
            queryPokemonEvolution(response.evolution_chain.url);
        });
    };

    const queryPokemonEvolution = (url) => {
        //console.log("url:", url);
        PokemonDataService.queryByUrl(url).then((response) => {
            //console.log("Evolution: ", response);
            setPokemonEvolution(response);
            extractEvolutionNames(response.chain);
        });
        console.log("lstEvolutionNames", lstEvolutionNames.length);
    };

    const extractEvolutionNames = async (evolution) => {
        if (evolution.species) {
            let _lstEvolutionNames = lstEvolutionNames;
            console.log("pushedDet", evolution.species.name);
            _lstEvolutionNames.push(evolution.species.name);
            setLstEvolutionNames(_lstEvolutionNames);
            if (evolution.evolves_to) {
                evolution.evolves_to.map((evoX) => {
                    extractEvolutionNames(evoX);
                });
            }
        }
        console.log("lstEvolutionNamesX", lstEvolutionNames.length);
    };

    /*
    Inner Components
     */
    const bioComp = pokemonSpecie && pokemonSpecie.flavor_text_entries.length > 0 ? <p>{pokemonSpecie.flavor_text_entries.filter((val) => val.language.name === "en")[0].flavor_text}</p> : <div />;

    /*
    const evoCart =
        lstEvolutionNames.length > 0
            ? lstEvolutionNames.map((nameX, key) => {
                  return (
                      <div className="p-col-12 p-lg-5" key={key}>
                          <div className="p-grid">{evoComp(nameX)}</div>
                      </div>
                  );
              })
            : "vacio";
            */

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
                                <h4>Evolution + {lstEvolutionNames.length}</h4>
                                {pokemonEvolution && pokemonEvolution.chain ? <PokemonEvolutionClass evolution={pokemonEvolution.chain} pokemonMap={props.pokemonMap} handleSelectPokemon={(name) => props.handleSelectPokemon(name)} /> : "vacioDetail"}
                            </Panel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
