import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { ProductService } from "../service/ProductService";

/*
Store
*/
import store from "../store/store";

/*
Services
*/
import PokemonDataService from "../service/PokemonDataService";
import { PokemonList } from "../components/PokemonList";

export const Crud = () => {
    /*
    Variables
    */
    const [lstPokemon, setLstPokemon] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        loadPokemonList();
    }, []);

    const loadPokemonList = () => {
        lstPokemon && lstPokemon.length > 0 ? setLstPokemon(lstPokemon) : PokemonDataService.list("?offset=0&limit=150").then((response) => setLstPokemon(response.results));
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    {lstPokemon.length === 0 ? "Loading.." : <PokemonList lstPokemon={lstPokemon} />}
                </div>
            </div>
        </div>
    );
};
