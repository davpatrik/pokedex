import React, { useEffect, useState, useRef, useContext } from "react";
// Import prime components
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { label } from "../util/Internationalization";

/*
Store
*/
import { AuthContext } from "../data/AuthContext";

export const PokemonSprites = (props) => {
    /*
    Variables
    */
    const [boConfirmDialogVisible, setBoConfirmDialogVisible] = useState(false);
    const [boViewFullPageDialogVisible, setBoViewFullPageDialogVisible] = useState(false);
    const [lstSprites, setLstSprites] = useState([]);
    const [selSprite, setSelSprite] = useState({});
    const toast = useRef(null);

    /* 
    Init
    */
    useEffect(() => {
        fillSprites();
    }, []);

    /*
    Context  
    */
    const context = useContext(AuthContext);

    /*
    Methods
    */
    const fillSprites = () => {
        if (props.pokemon) {
            let dream_world = {
                id: "dream_world",
                code: "dream_world",
                name: "dream_world",
                description: "Dream_world picture",
                image: props.pokemon.sprites.other.dream_world.front_default,
                price: 0,
                category: "dream_world",
                quantity: 0,
                inventoryStatus: "N/A",
                rating: 5,
                favourite: true,
            };

            let back_default = {
                id: "back_default",
                code: "back_default",
                name: "back_default",
                description: "Back_default picture",
                //image: props.pokemon.sprites.other.official-artwork.front_default,
                image: props.pokemon.sprites.back_default,
                price: 0,
                category: "back_default",
                quantity: 0,
                inventoryStatus: "N/A",
                rating: 5,
            };

            let front_shiny = {
                id: "front_shiny",
                code: "front_shiny",
                name: "front_shiny",
                description: "Front_shiny picture",
                //image: props.pokemon.sprites.other.official-artwork.front_default,
                image: props.pokemon.sprites.front_shiny,
                price: 0,
                category: "front_shiny",
                quantity: 0,
                inventoryStatus: "N/A",
                rating: 5,
            };

            let _lstSprites = [];
            _lstSprites.push(dream_world);
            _lstSprites.push(back_default);
            _lstSprites.push(front_shiny);
            setLstSprites(_lstSprites);
        }
    };

    /*
    Image template
    */
    const spriteTemplate = (sprite) => {
        return (
            <div className="product-item">
                <div className="product-item-content" style={{ textAlign: "center" }}>
                    <div className="p-mb-1">
                        <Button
                            id={"idButtonImage" + sprite.id}
                            style={{ backgroundColor: "transparent", borderColor: "transparent" }}
                            onClick={(ev) => {
                                setSelSprite(sprite);
                                setBoViewFullPageDialogVisible(true);
                            }}
                        >
                            <img src={sprite.image} alt={null} style={{ width: props.width ? props.width : 220, height: props.height ? props.height : 180 }} className="product-image" />
                        </Button>
                    </div>
                    <div>
                        <div className="car-buttons p-mt-5" style={{ textAlign: "center" }}>
                            <Button
                                icon="pi pi-search"
                                className="p-button p-button-rounded p-mr-2 p-button-outlined"
                                title="See large image"
                                onClick={(ev) => {
                                    setSelSprite(sprite);
                                    setBoViewFullPageDialogVisible(true);
                                }}
                            />
                            {props.hideSetDefaultIcon ? (
                                ""
                            ) : (
                                <Button
                                    icon="pi pi-heart"
                                    className={"p-button-danger p-button-rounded p-mr-2" + (!sprite.favourite ? " p-button-outlined" : "")}
                                    title={sprite.favourite ? "This is my favourite" : "Mark as my favourite"}
                                    onClick={(ev) => {
                                        if (!sprite.favourite) {
                                            const _lstUpdated = lstSprites.map((spriteX) => {
                                                const updatedSprite = {
                                                    ...spriteX,
                                                    favourite: spriteX.id === sprite.id,
                                                };
                                                return updatedSprite;
                                            });
                                            setLstSprites(_lstUpdated);
                                            toast.current.show({ severity: "success", summary: label[context.selLanguage]["successful"], detail: label[context.selLanguage]["maskedAsFavourirte"], life: 3000 });
                                        } else {
                                            toast.current.show({ severity: "success", summary: label[context.selLanguage]["successful"], detail: label[context.selLanguage]["favourirteAlready"], life: 3000 });
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /*
    Options
    */
    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: "600px",
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: "480px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    /**
     * Return
     */
    return (
        <Dialog header={props.pokemon.name + " sprites"} visible={lstSprites.length > 0} onHide={() => props.onHide()} style={{ textAlign: "center", paddingTop: "1rem", width: "100%" }}>
            <div className="carousel-demo">
                <Toast ref={toast} />
                <div className="card">
                    <Carousel value={lstSprites} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={spriteTemplate} header={<h5></h5>} />
                </div>
                <ConfirmDialog
                    visible={boConfirmDialogVisible}
                    accept={() => props.handleDelete(selSprite)}
                    onHide={() => setBoConfirmDialogVisible(false)}
                    message={"Seguro desea borrar la imagen?"}
                    header="Confirmation"
                    icon="pi pi-question-circle"
                    acceptLabel="Si"
                    rejectLabel="No"
                    baseZIndex={1000}
                />
                <Dialog header={selSprite.description} visible={boViewFullPageDialogVisible} onHide={() => setBoViewFullPageDialogVisible(false)} breakpoints={{ "1960px": "75vw" }} style={{ width: "80vw", textAlign: "center" }} baseZIndex={1000}>
                    <img src={selSprite.image} alt={null} style={{ width: props.width ? props.width : 620, height: props.height ? props.height : 480 }} className="product-image" />
                </Dialog>
            </div>
        </Dialog>
    );
};
