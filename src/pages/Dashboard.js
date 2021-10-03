import React, { useEffect, useContext } from "react";

import { LanguageSelector } from "../components/LanguageSelector";
import { label } from "../util/Internationalization";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const Dashboard = (props) => {
    useEffect(() => {}, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /**
     * Return
     */
    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12 p-lg-12">
                <LanguageSelector />
                {context.selLanguage ? (
                    <div className="card card-w-title">
                        <p style={{ width: "100%" }}>{label[context.selLanguage]["welcomeMessage"]}</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
