import GeneralService from "./GeneralService";

export class PokemonDataService {
    //async function loginUser(payload) {
    list(urlParams) {
        return GeneralService.asyncGetService("pokemon" + (urlParams ? urlParams : ""));
    }

    queryPokemonData(name) {
        return GeneralService.asyncGetService("pokemon/" + name + "/");
    }

    queryPokemonSpecies(id) {
        return GeneralService.asyncGetService("pokemon-species/" + id + "/");
    }

    queryByUrl(url) {
        return GeneralService.asyncGetServiceByUrl(url);
    }
}

export default new PokemonDataService();
