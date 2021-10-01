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
        case actions.POKEMON_ADDED_TO_LIST:
            return [
                ...state,
                {
                    name: action.payload.name,
                    url: action.payload.url,
                    pokemon: action.payload.pokemon,
                },
            ];
        case actions.POKEMON_SELECTED:
            return state.lstPokemon.filter((pokemon) => pokemon.name === action.payload.name)[0];
        default:
            return state;
    }
}
