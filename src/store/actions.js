import * as actionTypes from "./actionTypes";

export const pokemonsAddedToList = (payload) => ({
    type: actionTypes.POKEMONS_ADDED_TO_LIST,
    payload,
});

export const pokemonAddedToList = (payload) => ({
    type: actionTypes.POKEMON_ADDED_TO_LIST,
    payload,
});

export const pokemonSelected = (payload) => ({
    type: actionTypes.POKEMON_SELECTED,
    payload,
});

/*
export function pokemonAddedToList(payload) {
    return {
        type: actionTypes.POKEMON_ADDED_TO_LIST,
        payload: payload,
    };
}
*/
