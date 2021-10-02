import React, { useState, useEffect, useRef } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";

// Import Services
import PokemonDataService from "../service/PokemonDataService";
import { PokemonTypes } from "./PokemonTypes";
import { PokemonMoves } from "./PokemonMoves";
import { PokemonStats } from "./PokemonStats";
import { PokemonAbilities } from "./PokemonAbilities";
import { PokemonEvolution } from "./PokemonEvolution";
import { PokemonSprites } from "./PokemonSprites";

export const PokemonDetail = (props) => {
    /*
    Variables
    */
    const [pokemonEvolution, setPokemonEvolution] = useState(null);
    const [pokemonSpecie, setPokemonSpecie] = useState(null);
    const [lstEvolutionNames, setLstEvolutionNames] = useState([]);
    const [showSprites, setShowSprites] = useState(false);

    /* 
    Init
    */
    useEffect(() => {
        queryPokemonSpeciesThenEvolution();
    }, []);

    /*
    Methods
    */
    const queryPokemonSpeciesThenEvolution = () => {
        PokemonDataService.queryPokemonSpecies(props.pokemon.id).then((response) => {
            setPokemonSpecie(response);
            queryPokemonEvolution(response.evolution_chain.url);
        });
    };

    const queryPokemonEvolution = (url) => {
        PokemonDataService.queryByUrl(url).then((response) => {
            setPokemonEvolution(response);
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

    const doNothing = (event) => {};

    /*
    Inner Components
     */
    const bioComp = pokemonSpecie && pokemonSpecie.flavor_text_entries.length > 0 ? <p>{pokemonSpecie.flavor_text_entries.filter((val) => val.language.name === "en")[0].flavor_text}</p> : <div />;

    const spritesComp = showSprites ? <PokemonSprites pokemon={props.pokemon} onHide={(e) => setShowSprites(false)} /> : "";

    /**
     * Return
     */
    return (
        <Dialog header={props.pokemon.name} visible={props && props.pokemon} onHide={() => props.hideDetail()} style={{ width: "90vw", display: "flex", justifyContent: "center" }} modal={true}>
            <div className="p-col-12 p-lg-12" style={{ alignItems: "center" }}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-4">
                        <Panel>
                            <div>
                                <img src={props.pokemon && props.pokemon.sprites ? props.pokemon.sprites.other.dream_world.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="180" />
                                <Button icon="pi pi-images" className="p-button-rounded p-button-success mr-2" title={"View " + props.pokemon.name + " images"} onClick={() => setShowSprites(true)} />
                                {spritesComp}
                            </div>
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
                        <Panel style={{ alignItems: "center" }}>
                            <h4>Evolution</h4>
                            {pokemonEvolution && pokemonEvolution.chain ? <PokemonEvolution evolution={pokemonEvolution.chain} handleSelectPokemon={(name) => props.handleSelectPokemon(name)} parentPokemonName={props.pokemon.name} /> : "Empty.."}
                        </Panel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
