import React, { useEffect, useContext } from "react";

// Import prime components
import { Button } from "primereact/button";
import { Card } from "primereact/card";

// Import Utils
import { label } from "../util/Internationalization";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const LanguageSelector = (props) => {
    /* 
    Init
    */
    useEffect(() => {}, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /**
     * Return
     */
    return (
        <div className="p-grid" style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
            <div className="card card-w-title">
                {!context.selLanguage ? (
                    <>
                        <div className={"p-col-12 p-md-6"} style={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                            <img src={"assets/layout/images/french.png"} alt={"french"} className="shadow-2" width="180" onClick={() => context.setSelLanguage("fr")} />
                            {label["fr"]["languageSelector"]}
                        </div>
                        <div className={"p-col-12 p-md-6"} style={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                            <img src={"assets/layout/images/english.jpeg"} alt={"french"} className="shadow-2" width="180" onClick={() => context.setSelLanguage("en")} />
                            {label["en"]["languageSelector"]}
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
