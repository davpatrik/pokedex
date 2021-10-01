/*
ActionTypes
*/
import * as actions from "./actionTypes";

const initialState = {
    lstPokemon: [],
    selPokemon: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.POKEMONS_ADDED_TO_LIST:
            console.log("POKEMONS_ADDED_TO_LIST", action);
            return {
                ...state,
                lstPokemon: action.payload,
            };
        case actions.POKEMON_ADDED_TO_LIST:
            console.log("POKEMON_ADDED_TO_LIST", action);
            let _lstPokemon = state.lstPokemon;
            //let _founded = _lstPokemon.filter((pokemon) => pokemon.name === action.payload.name);

            let _lstPokemonFiltered = _lstPokemon && _lstPokemon.length > 0 ? _lstPokemon.filter((pokemon) => pokemon.name !== action.payload.name) : [];
            //if (_founded && _founded.length > 0) {
            //  return state;
            //} else {
            //_lstPokemon.push(action.payload);
            _lstPokemonFiltered.push(action.payload);
            return {
                ...state,
                lstPokemon: _lstPokemon,
            };
        //}
        case actions.POKEMON_SELECTED:
            console.log("POKEMON_SELECTED", action);
            return {
                ...state,
                selPokemon: action.payload,
            };
        default:
            return state;
    }
}
