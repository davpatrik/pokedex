import * as actionTypes from "./actionTypes";

export const pokemonAddedToList = (payload) => ({
    type: actionTypes.POKEMON_ADDED_TO_LIST,
    payload,
});

export const pokemonSelected = (name) => ({
    type: actionTypes.POKEMON_SELECTED,
    payload: {
        name,
    },
});

/*
export function pokemonAddedToList(payload) {
    return {
        type: actionTypes.POKEMON_ADDED_TO_LIST,
        payload: payload,
    };
}
*/
