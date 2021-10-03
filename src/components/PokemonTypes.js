import React, { useEffect, useState, useContext } from "react";

// Import prime components
import { Button } from "primereact/button";

// Import service
import PokemonDataService from "../service/PokemonDataService";

// Import Utils
import { typeColorsMapping } from "../util/PokemonTypeColor";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const PokemonTypes = (props) => {
    /*
    Variables
    */
    const [lstTypes, setLstTypes] = useState([]);

    /* 
    Init
    */
    useEffect(() => {
        queryPokemonTypes();
    }, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Methods
    */
    const queryPokemonTypes = async () => {
        if (props.pokemon && props.pokemon.types) {
            let _lstTypes = [];
            await props.pokemon.types.map((typeX) => {
                PokemonDataService.queryByUrl(typeX.type.url).then((response) => {
                    _lstTypes.push(response);
                });
            });
            setLstTypes(_lstTypes);
        }
    };

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            {props.pokemon && props.pokemon.types && lstTypes.length > 0
                ? lstTypes.map((typeX) => {
                      let color = typeColorsMapping[typeX.name];
                      let nameJson = typeX.names.filter((nameX) => nameX.language.name === context.selLanguage)[0];
                      return (
                          <div className="p-col-12 p-lg-5" key={typeX.name}>
                              <div className="p-grid">
                                  <Button label={nameJson.name} className="p-button-rounded" style={{ backgroundColor: color, borderColor: color }} />
                              </div>
                          </div>
                      );
                  })
                : ""}
        </div>
    );
};
