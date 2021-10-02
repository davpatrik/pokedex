/**
 * Own components
 */
import { endPoints } from "../config/EndPoints";

export class GeneralServiceNot {
    async asyncGetService(url) {
        const endPointCompleteUrl = endPoints.pokeApi.apiRestUrl + "/" + endPoints.pokeApi.contextPath + "/" + url;
        //console.log("endPointCompleteUrl");
        //console.log(endPointCompleteUrl);
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": endPoints.pokeApi.contentType,
                    Host: "Postman",
                },
            };

            let response = await fetch(endPointCompleteUrl, requestOptions);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async asyncGetServiceByUrl(endPointCompleteUrl) {
        //const endPointCompleteUrl = endPoints.pokeApi.apiRestUrl + "/" + endPoints.pokeApi.contextPath + "/" + url;
        //console.log("endPointCompleteUrl");
        //console.log(endPointCompleteUrl);
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": endPoints.pokeApi.contentType,
                    Host: "Postman",
                },
            };

            let response = await fetch(endPointCompleteUrl, requestOptions);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new GeneralServiceNot();
