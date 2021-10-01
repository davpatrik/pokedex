import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

/*
Store
*/
import { connect } from "react-redux";
import * as actions from "../store/actions";
import store from "../store/store";

/*
Services
*/
import PokemonDataService from "../service/PokemonDataService";
import { PokemonList } from "../components/PokemonList";

export const Crud = (props) => {
    /*
    Variables
    */
    const [lstPokemon, setLstPokemon] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        loadPokemonList();
    }, []);

    const loadPokemonList = () => {
        //lstPokemon && lstPokemon.length > 0 ? setLstPokemon(lstPokemon) : PokemonDataService.list("?offset=0&limit=150").then((response) => setLstPokemon(response.results));
        console.log("props.lstPokemon", props.lstPokemon);
        if (props.lstPokemon) {
            setLstPokemon(props.lstPokemon);
        } else {
            PokemonDataService.list("?offset=0&limit=150").then((response) => {
                setLstPokemon(response.results);
                store.dispatch(actions.pokemonsAddedToList(response));
                //props.pokemonsAddedToList(response);
            });
        }
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

/*
Map state and dispatch
*/
const mapStateToProps = (state) => {
    return {
        lstPokemon: state.lstPokemon,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pokemonsAddedToList: (payload) => dispatch(actions.pokemonsAddedToList(payload)),
        //pokemonAddedToList: (payload) => dispatch(actions.pokemonAddedToList(payload)),
        pokemonSelected: (payload) => dispatch(actions.pokemonSelected(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
