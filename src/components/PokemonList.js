import React, { useState, useEffect, useRef, useContext } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

// Import Services
import PokemonDataService from "../service/PokemonDataService";
import { PokemonDetail } from "./PokemonDetail";
// Import Utils
import { label } from "../util/Internationalization";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const PokemonList = (props) => {
    /*
    Variables
    */
    const [pokemonDialog, setPokemonDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    /* 
    Init
    */
    useEffect(() => {}, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Methods
    */
    const fillPokemonMap = (name) => {
        let _pokemonFromContext = context.getPokemonByNameFromMap(name);
        if (!_pokemonFromContext) {
            PokemonDataService.queryPokemonData(name).then((response) => {
                context.putPokemonByNameInMap(name, response);
                return response;
            });
        } else {
            return _pokemonFromContext;
        }
    };

    const selectPokemon = async (name) => {
        await setPokemonDialog(false);
        let pokemon = context.getPokemonByNameFromMap(name);
        await context.setSelPokemon(pokemon);
        setPokemonDialog(true);
    };

    const hideDetail = () => {
        setPokemonDialog(false);
    };

    /*
    Table header & filter
    */
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">{label[context.selLanguage]["selectPokemon"]}</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder={label[context.selLanguage]["quickSeaarch"]} />
            </span>
        </div>
    );

    /* 
    Table templates
    */
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">{label[context.selLanguage]["name"]}</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        fillPokemonMap(rowData.name);
        let strAux = "pokemon/";
        let idFromList = rowData.url.substring(rowData.url.lastIndexOf(strAux) + strAux.length, rowData.url.length - 1);
        return (
            <>
                <span className="p-column-title">{label[context.selLanguage]["image"]}</span>
                <img src={require("./pokemons/" + idFromList + ".png")} className="shadow-2" width="70" />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-search" className="p-button-rounded p-button-success mr-2" title={label[context.selLanguage]["discover"] + " " + rowData.name} onClick={() => selectPokemon(rowData.name)} />
            </div>
        );
    };

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            <DataTable
                ref={dt}
                value={context.lstPokemon}
                dataKey="name"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 15]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                globalFilter={globalFilter}
                emptyMessage="Loding Pokémons.."
                header={header}
            >
                <Column header={label[context.selLanguage]["pokemon"]} field="name" sortable body={nameBodyTemplate}></Column>
                <Column header={label[context.selLanguage]["image"]} body={imageBodyTemplate}></Column>
                <Column header={label[context.selLanguage]["discover"]} body={actionBodyTemplate}></Column>
            </DataTable>

            {pokemonDialog && context.selPokemon ? <PokemonDetail pokemon={context.selPokemon} hideDetail={() => hideDetail()} handleSelectPokemon={(name) => selectPokemon(name)} /> : ""}
        </div>
    );
};
