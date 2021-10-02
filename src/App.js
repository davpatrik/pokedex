import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppConfig } from "./AppConfig";

import { Dashboard } from "./pages/Dashboard";
import { PokedexPage } from "./pages/PokedexPage";
import { EmptyPage } from "./pages/EmptyPage";

import PrimeReact from "primereact/api";

// Style files
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

/*
Store
*/
import { AuthContext } from "../src/data/AuthContext";

const App = () => {
    /*
    Context Api
    */
    const [lstPokemon, setLstPokemon] = useState([]);
    const [lstPokemonMap, setLstPokemonData] = useState(new Map());
    const [selPokemon, setSelPokemon] = useState({});

    /*
    Layout vars
    */
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Pages",
            icon: "pi pi-fw pi-clone",
            items: [{ label: "Pokédex", icon: "pi pi-fw pi-user-edit", to: "/pokedexPage" }],
        },
        {
            label: "Get Started",
            items: [
                {
                    label: "Documentation",
                    icon: "pi pi-fw pi-question",
                    command: () => {
                        window.location = "https://gitlab.com/davpatrik/pokedex/-/blob/main/README.md";
                    },
                },
                {
                    label: "View Source",
                    icon: "pi pi-fw pi-search",
                    command: () => {
                        window.location = "https://gitlab.com/davpatrik/pokedex.git";
                    },
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

    /*
    Context Api methods
    */
    function updatePokemonInList(payload) {
        if (lstPokemon) {
            const newList = lstPokemon.map((pokemonX) => {
                if (pokemonX.name === payload.name) {
                    const updatedPokemon = {
                        ...pokemonX,
                        //isComplete: !pokemonX.isComplete,
                        ...payload,
                    };
                    return updatedPokemon;
                }
                return pokemonX;
            });
            setLstPokemon(newList);
        }
    }

    function getPokemonByName(name) {
        if (lstPokemon) {
            let _pokemonFiltered = lstPokemon.filter((pokemonX) => pokemonX.name === name)[0];
            if (_pokemonFiltered) {
                return _pokemonFiltered;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    function getPokemonByNameFromMap(name) {
        if (lstPokemonMap && lstPokemonMap.has(name)) {
            return lstPokemonMap.get(name);
        } else {
            return null;
        }
    }

    function putPokemonByNameInMap(name, payload) {
        if (!lstPokemonMap.has(name)) {
            lstPokemonMap.set(name, payload);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                lstPokemon: lstPokemon,
                setLstPokemon: setLstPokemon,
                selPokemon: selPokemon,
                setSelPokemon: setSelPokemon,
                updatePokemonInList: updatePokemonInList,
                getPokemonByName: getPokemonByName,
                getPokemonByNameFromMap: getPokemonByNameFromMap,
                putPokemonByNameInMap: putPokemonByNameInMap,
            }}
        >
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/pokedexPage" component={PokedexPage} />
                        <Route path="/empty" component={EmptyPage} />
                    </div>

                    <AppFooter layoutColorMode={layoutColorMode} />
                </div>

                <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                    <div className="layout-mask p-component-overlay"></div>
                </CSSTransition>
            </div>
        </AuthContext.Provider>
    );
};

export default App;
