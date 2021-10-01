import React, { useState, useEffect, useRef } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";

// Import Services
import PokemonDataService from "../service/PokemonDataService";
import { PokemonDetail } from "./PokemonDetail";

/*
Store
*/
import { connect } from "react-redux";
import * as actions from "../store/actions";

export const PokemonList = (props) => {
    /*
    Variables
    */
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonDialog, setPokemonDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const pokemonMap = new Map();

    /* 
    Init
    */
    useEffect(() => {}, []);

    /*
    Methods
    */
    const fillPokemonMap = (name) => {
        if (!pokemonMap.has(name)) {
            PokemonDataService.queryPokemonData(name).then((response) => {
                //console.log("queryPokemonData", response);
                pokemonMap.set(name, response);
                return response;
            });
        } else {
            return pokemonMap.get(name);
        }
    };

    const selectPokemon = async (name) => {
        //console.log("selectPokemon:", name);
        setPokemonDialog(false);
        let pokemon = await pokemonMap.get(name);
        //console.log("pokemonFromMap", pokemon);
        setSelectedPokemon(pokemon);
        setPokemonDialog(true);
    };

    const hideDetail = () => {
        setPokemonDialog(false);
    };

    /*
    Table Columns
    */
    const columnsForLstPokemon = [
        { field: "name.name", header: "Producto" },
        { field: "supplierObj.businessName", header: "Proveedor" },
        { field: "cost", header: "Costo" },
    ];
    const dynamicColumnsForLstPokemon = columnsForLstPokemon.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    /*
    Table header & filter
    */
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Select your Pokemon</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    /* 
    Table templates
    */
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        let pokemon = fillPokemonMap(rowData.name);
        //console.log("pokemon: ", pokemon);
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={pokemon && pokemon.sprites ? pokemon.sprites.front_default : null} alt={"assets/layout/images/unknowPokemon.png"} className="shadow-2" width="70" />
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-search" className="p-button-rounded p-button-success mr-2" title={"Discover " + rowData.name} onClick={() => selectPokemon(rowData.name)} />
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
                value={props.lstPokemon}
                //selection={selectedProducts}
                //onSelectionChange={(e) => setSelectedProducts(e.value)}
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
                <Column field="name" header="Pokémon" sortable body={nameBodyTemplate}></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column header="Discover" body={actionBodyTemplate}></Column>
            </DataTable>

            {pokemonDialog && selectedPokemon ? <PokemonDetail pokemon={selectedPokemon} hideDetail={() => hideDetail()} handleSelectPokemon={(name) => selectPokemon(name)} pokemonMap={pokemonMap} /> : ""}
        </div>
    );
};

/*
Map state and dispatch
*/
const mapStateToProps = (state) => {
    return {
        lstPokemon: state.lstPokemon,
        selPokemon: state.selPokemon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pokemonAddedToList: (payload) => dispatch(actions.pokemonAddedToList(payload)),
        pokemonSelected: (payload) => dispatch(actions.pokemonSelected(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
