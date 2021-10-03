import React, { useEffect, useRef, useContext } from "react";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

/*
Services
*/
import PokemonDataService from "../service/PokemonDataService";
import { PokemonList } from "../components/PokemonList";

/*
Utils
*/
import { label } from "../util/Internationalization";

export const PokedexPage = (props) => {
    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Init
    */
    useEffect(() => {
        loadPokemonList();
    }, []);

    const loadPokemonList = () => {
        if (!context.lstPokemon || context.lstPokemon.length === 0) {
            PokemonDataService.list("?offset=0&limit=300").then((response) => {
                context.setLstPokemon(response.results);
            });
        }
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">{!context.lstPokemon || context.lstPokemon.length === 0 ? label[context.selLanguage]["loading"] : <PokemonList lstPokemon={context.lstPokemon} />}</div>
            </div>
        </div>
    );
};
