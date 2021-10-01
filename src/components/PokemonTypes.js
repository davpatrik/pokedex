import React, { useEffect } from "react";

// Import prime components
import { Button } from "primereact/button";

// Import Utils
import { typeColorsMapping } from "../util/PokemonTypeColor";

export const PokemonTypes = (props) => {
    /* 
    Init
    */
    useEffect(() => {}, []);

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            {props.pokemon && props.pokemon.types
                ? props.pokemon.types.map((typeX, key) => {
                      let color = typeColorsMapping[typeX.type.name];
                      return (
                          <div className="p-col-12 p-lg-5" key={key}>
                              <div className="p-grid">
                                  <Button label={typeX.type.name} className="p-button-rounded" style={{ backgroundColor: color, borderColor: color }} />
                              </div>
                          </div>
                      );
                  })
                : ""}
        </div>
    );
};
