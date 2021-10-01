import React, { Component } from "react";
import { endPoints } from "../config/EndPoints";
//import { AuthContext } from "../data/AuthContext"; //"../data/AuthContext";
//import { useHistory } from "react-router-dom";

export class GeneralService extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //console.log("----this.context.authUser");
        //console.log(this.context);
    }

    async asyncService(payload, port, url) {
        //const endPointCompleteUrl = endPoints.cloudLabStoreCore.apiRestUrl + ":" + port + endPoints.cloudLabStoreCore.contextPath + "/" + endPoints.cloudLabStoreCore.enviroment + url;
        const endPointCompleteUrl = endPoints.pokeApi.apiRestUrl + ":" + endPoints.pokeApi.portPrefix + port + endPoints.pokeApi.contextPath + "/" + url;
        //console.log("endPointCompleteUrl: " + endPointCompleteUrl);
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    // TODO: comment content-type and JSON.stringify
                    "Content-Type": endPoints.pokeApi.contentType,
                    "api-key": endPoints.pokeApi.apiKey,
                    //authorization: this.context && this.context.authUser ? this.context.authUser.apiKey : "", //endPoints.cloudLabStoreCore.apiKey,
                    authorization: window.$apiKey,
                },
                body: JSON.stringify(payload),
            };
            let response = await fetch(endPointCompleteUrl, requestOptions);
            //console.log("RESPONSE");
            //console.log(response);
            let json = null;
            if (!response.ok) {
                //const history = useHistory();
                //history.push("/");
                //window.$loggedIn = false;
                //console.log("no Ok window.$loggedIn: " + window.$loggedIn);
                //json = { success: false, log: response.status };
                json = await response.json();
            } else {
                json = await response.json();
            }
            //console.log("RESPONSE.json: ");
            //console.log(json);
            return json;
        } catch (error) {
            //return error;
            console.error("ERROR ->");
            console.error(error);
            let valid = { success: false, log: error.toString() + " URL: " + url };
            console.error(valid);
            return valid;
        }
    }

    async asyncService2(payload, port, url) {
        //const endPointCompleteUrl = endPoints.cloudLabStoreCore.apiRestUrl + ":" + port + endPoints.cloudLabStoreCore.contextPath + "/" + endPoints.cloudLabStoreCore.enviroment + url;
        const endPointCompleteUrl = endPoints.pokeApi.apiRestUrl + ":" + endPoints.pokeApi.portPrefix + port + endPoints.pokeApi.contextPath + "/" + url;
        //console.log("endPointCompleteUrl: " + endPointCompleteUrl);

        const requestOptions = {
            method: "POST",
            headers: {
                // TODO: comment content-type and JSON.stringify
                "Content-Type": endPoints.pokeApi.contentType,
                "api-key": endPoints.pokeApi.apiKey,
                //authorization: this.context && this.context.authUser ? this.context.authUser.apiKey : "", //endPoints.cloudLabStoreCore.apiKey,
                authorization: window.$apiKey,
            },
            body: JSON.stringify(payload),
        };
        await fetch(endPointCompleteUrl, requestOptions)
            .then((response) => {
                //console.log("responseOk");
                //console.log(response.json);
                return response.json;
            })
            .catch((err) => {
                console.error("ERROR2 ->");
                console.error(err);
                //console.log("responseError");
                let valid = { success: false, log: err.toString() };
                //console.log(valid);
                return valid;
            });
    }

    render() {
        return <div></div>;
    }
}

//GeneralService.contextType = AuthContext;

//export default new GeneralService();
//export default GeneralService;
