/*
ActionTypes
*/
import * as actions from "./actionTypes";

export default function reducer(state = [], action) {
    switch (action.type) {
        case actions.POKEMON_ADDED_TO_LIST:
            return [
                ...state,
                {
                    name: action.payload.name,
                    url: action.payload.url,
                },
            ];
        case actions.POKEMON_SELECTED:
            return state.filter((pokemon) => pokemon.name === action.payload.name);
        default:
            return state;
    }
}
