import React, { Component } from "react";
// Import prime components
import { Button } from "primereact/button";

// Import Services
import { Card } from "primereact/card";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export class PokemonEvolution extends Component {
    /*
    Variables
    */
    constructor(props) {
        super(props);
        this.state = {
            lstEvolutionNames: [],
        };
    }

    /* 
    Init
    */
    componentDidMount() {
        this.loadEvolutionData();
    }

    /*
    Methods
    */
    async loadEvolutionData() {
        await this.extractEvolutionNames(this.props.evolution);
    }

    async extractEvolutionNames(evolution) {
        if (evolution.species) {
            let _lstEvolutionNames = this.state.lstEvolutionNames;
            _lstEvolutionNames.push(evolution.species.name);
            //setLstEvolutionNames(_lstEvolutionNames);
            this.setState({ lstEvolutionNames: _lstEvolutionNames });
            if (evolution.evolves_to) {
                evolution.evolves_to.map((evoX) => {
                    this.extractEvolutionNames(evoX);
                });
            }
        }
    }

    render() {
        /*
        Inner Components
        */
        const evoComp = (name) => {
            let pokemonX = this.context.getPokemonByNameFromMap(name);
            if (pokemonX) {
                return (
                    <Card>
                        <img src={pokemonX && pokemonX.sprites ? pokemonX.sprites.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="70" />
                        <p>{pokemonX.name}</p>
                        <Button title={pokemonX.name} disabled={pokemonX.name === this.props.parentPokemonName} onClick={() => this.props.handleSelectPokemon(pokemonX.name)} icon="pi pi-search" className="p-button-rounded p-button-success mr-2" title={"Discover " + pokemonX.name} />
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
            <div className="p-col-12 p-lg-12">
                {this.props.evolution
                    ? this.state.lstEvolutionNames.map((nameX, key) => {
                          return (
                              <div className="p-col-12 p-lg-5" key={key}>
                                  <div className="p-grid">{evoComp(nameX)}</div>
                              </div>
                          );
                      })
                    : "vacio"}
            </div>
        );
    }
}

/*
Context  
*/
PokemonEvolution.contextType = AuthContext;
