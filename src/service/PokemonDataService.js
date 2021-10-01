import GeneralServiceNot from "./GeneralServiceNot";

export class PokemonDataService {
    //async function loginUser(payload) {
    list(urlParams) {
        return GeneralServiceNot.asyncGetService("pokemon" + (urlParams ? urlParams : ""));
    }

    queryPokemonData(name) {
        return GeneralServiceNot.asyncGetService("pokemon/" + name + "/");
    }

    queryPokemonSpecies(id) {
        return GeneralServiceNot.asyncGetService("pokemon-species/" + id + "/");
    }

    queryByUrl(url) {
        return GeneralServiceNot.asyncGetServiceByUrl(url);
    }
}

export default new PokemonDataService();
