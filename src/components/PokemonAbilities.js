import React, { useEffect, useState, useContext } from "react";

// Import Services
import PokemonDataService from "../service/PokemonDataService";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const PokemonAbilities = (props) => {
    /*
    Variables
    */
    const [lstAbilities, setLstAbilities] = useState([]);

    /* 
    Init
    */
    useEffect(() => {
        queryPokemonAbilities();
    }, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Methods
    */
    const queryPokemonAbilities = () => {
        if (props.pokemon && props.pokemon.abilities) {
            let _lstAbilities = [];
            props.pokemon.abilities.map((abilityX) => {
                PokemonDataService.queryByUrl(abilityX.ability.url).then((response) => {
                    _lstAbilities.push(response);
                });
            });
            setLstAbilities(_lstAbilities);
        }
    };

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            {props.pokemon && props.pokemon.abilities
                ? lstAbilities.map((abilityX, key) => {
                      let slotX = props.pokemon.abilities.filter((val) => val.ability.name === abilityX.name)[0];
                      let flavotX = abilityX.flavor_text_entries.filter((val) => val.language.name === context.selLanguage)[0];

                      return (
                          <div className="p-col-12 p-lg-5" key={key}>
                              <div className="p-grid">
                                  <b>{abilityX.name}</b>
                                  <b>{" (slots " + slotX.slot + "):"}</b>
                                  <p>{flavotX.flavor_text}</p>
                              </div>
                          </div>
                      );
                  })
                : ""}
        </div>
    );
};
