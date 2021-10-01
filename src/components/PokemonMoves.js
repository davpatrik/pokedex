import React, { useEffect, useState } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { ProgressBar } from "primereact/progressbar";

// Import Services
import PokemonDataService from "../service/PokemonDataService";

// Import Utils
import { typeColorsMapping } from "../util/PokemonTypeColor";

export const PokemonMoves = (props) => {
    /*
    Variables
    */
    const [lstMoves, setLstMoves] = useState([]);
    const MAX_MOVE_COUNT = 4;

    /* 
    Init
    */
    useEffect(() => {
        queryPokemonMoves();
    }, []);

    /*
    Methods
    */
    const queryPokemonMoves = async () => {
        if (props.pokemon && props.pokemon.moves) {
            let _lstMoves = [];
            let count = 0;
            await props.pokemon.moves.map((moveX) => {
                if (count < MAX_MOVE_COUNT) {
                    PokemonDataService.queryByUrl(moveX.move.url).then((response) => {
                        _lstMoves.push(response);
                    });
                    count++;
                }
            });
            setLstMoves(_lstMoves);
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
            {props.pokemon && props.pokemon.moves
                ? lstMoves.map((moveX, key) => {
                      return (
                          <div className="p-col-12 p-lg-5" key={key}>
                              <div className="p-grid">
                                  <b>{moveX.name + ": "}</b>
                                  <ProgressBar value={moveX.power}></ProgressBar>
                              </div>
                          </div>
                      );
                  })
                : ""}
        </div>
    );
};
